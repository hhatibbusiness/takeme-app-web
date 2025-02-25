import React, { useEffect, useState } from 'react';
import Input from '../../../components/InputAdmin/Input';
import { formValidator } from '../../../utilty/formValidator';
import './CountriesAdd.css';
import { useNavigate, useParams } from 'react-router-dom';
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import TextArea from '../../../components/TextArea/TextArea';
import { useNavbarContext } from '../../../context/navbar.context';
import {connect} from "react-redux";
import {editCountry, addCountry} from "../../../store/actions/countries.actions";

const CountriesAdd = ({setAdmin, setBackBtn, locale, countries, editCountry, addCountry}) => {
    const { changeSearchActive } = useNavbarContext();
    const [paddingTop, setPaddingTop] = useState(0);

    useEffect(() => {
        changeSearchActive(false);
        setBackBtn(true);
        setAdmin(true);
        return () => {
            changeSearchActive(true);
            setBackBtn(false);
            setAdmin(false);
        }
    }, []);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height+20);
        }
    });

    const [conName, setConName] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 50,
                valid: false,
                message: 'اكبر عدد من الحروف 50 حرف'
            },
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            }
        },
        touched: false,
        valid: false
    });
    const [code, setCode] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 5,
                valid: false,
                message: 'اكبر عدد من الحروف 5 حرف'
            },
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            }
        },
        touched: false,
        valid: false
    });
    const [notes, setNotes] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 250,
                valid: false,
                message: 'اكبر عدد من الحروف 250 حرف'
            },
            required: {
                value: false,
                valid: true,
                message: "هذا الحقل مطلوب"

            }
        },
        touched: false,
        valid: false
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.lanId || params.editId) {
            const countryId = params.lanId || params.editId;
            const country = countries?.countries?.find(c => c.id === Number(countryId));
            
            if (country) {
                conNameChangeHandler(country.translations?.fields[0]?.value || '');
                codeChangeHandler(country.countryCode || '');
                notesChangeHandler(country.comments || '');
                setValid(true);
            }
        }
    }, [params.lanId, params.editId, countries.countries]);

    const [valid, setValid] = useState(false);

    const [submitted, setSubmitted] = useState(false);

    const conNameChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(conName.rules, value, setConName, conName);
        setConName({
            ...conName,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...conName.rules,
                required: {
                    ...conName.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...conName.rules.maxLength,
                    valid: value.length <= conName.rules.maxLength.value
                }
            }
        });

        setValid(inputIsValid && code.valid);
    }

    const codeChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(code.rules, value, setCode, code);
        setCode({
            ...code,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...code.rules,
                required: {
                    ...code.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...code.rules.maxLength,
                    valid: value.length <= code.rules.maxLength.value
                }
            }
        });

        setValid(inputIsValid && conName.valid && notes.valid);
    }

    const notesChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(notes.rules, value, setNotes, notes);
        setNotes({
            ...notes,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...notes.rules,
                required: {
                    ...notes.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...notes.rules.maxLength,
                    valid: value.length <= notes.rules.maxLength.value
                }
            }
        });

        setValid(inputIsValid && conName.valid && code.valid);
    }

    const addLocaleHandler = async () => {
        setSubmitted(true);
        if (!valid) return;

        let res;

        if (params.editId) {
            const data = {
                id: params.editId,
                localeId: locale?.id,
                countryCode: code.value,
                comments: notes.value,
                translations: {
                    localeId: locale.id,
                    fields: [
                        {
                            key: "name",
                            value: conName.value
                        }
                    ]
                },
                lan: 'ar_SA',
            };
    
            res = await editCountry(data);
        } else {
            const data = {
                localeId: 1,
                countryCode: code.value,
                comments: notes.value,
                translations: {
                    localeId: locale.id,
                    fields: [ { 
                        key: "name",
                        value: conName.value
                    } ]
                },
                lan: locale.locale,
            };
    
            res = await addCountry(data);
        }

        if (res?.status == 200 && !params.lanId && !params.editId) {
            setCode({
                ...code,
                value: ''
            });
            setConName({
                ...conName,
                value: ''
            });
            setNotes({
                ...notes,
                value: ''
            });
        }
        if (res?.status == 200) {
            navigate('/countries');
        }
        setSubmitted(false);
    }


    return (
        <div id={"CountriesAdd"} className='LocalesAdd' style={{paddingTop: `${paddingTop + 20}px`}}>
            <div className='LocalesAdd__contianer'>
                <Input
                    touched={conName.touched}
                    valid={conName.valid}
                    rules={conName.rules}
                    submitted={submitted}
                    required={conName.rules.required}
                    value={conName.value}
                    setValue={value => conNameChangeHandler(value)}
                    placeholder={'اسم الدولة'}
                    id={'Country__name'}
                    key={1}
                />
                <Input
                    touched={code.touched}
                    valid={code.valid}
                    rules={code.rules}
                    submitted={submitted}
                    required={code.rules.required}
                    value={code.value}
                    setValue={value => codeChangeHandler(value)}
                    placeholder={'كود البلد'}
                    id={'Country__code'}
                    key={2}
                />
                <TextArea
                    touched={notes.touched}
                    valid={notes.valid}
                    rules={notes.rules}
                    submitted={submitted}
                    required={notes.rules.required.value}
                    value={notes.value}
                    setValue={value => notesChangeHandler(value)}
                    placeholder={'ملاحظات'}
                    id={'Country__notes'}
                />
                <div className='LocalesAdd__btns--container'>
                    <SaveButton
                        saving={params.editId ? countries.editing : countries.adding}
                        saveClickHanlder={addLocaleHandler}
                        id={'Country__save'}
                    />
                    <CancelButton
                        handleCancelClick={ e => {
                            navigate(-1);
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale,
    countries: state.countries
})

export default connect(mapStateToProps, {editCountry, addCountry}) (CountriesAdd);
