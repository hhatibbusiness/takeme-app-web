import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/InputAdmin/Input';
import { formValidator } from '../../../utilty/formValidator';
import './LocalesAdd.css';
import { useNavigate, useParams } from 'react-router-dom';
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import TextArea from '../../../components/TextArea/TextArea';
import PopupInput from '../../../components/PopupInput/PopupInput';
import { useSelectContext } from '../../../context/single.select.context';
import { useNavbarContext } from '../../../context/navbar.context';
import SelectPopup from '../../../components/SelectPopup/SelectPopup';
import { changeSelectedLanguage, editLocale, addLocale, fetchLocaleById, searchLanguagesLocales } from '../../../store/actions/locales.actions';


const LocalesAdd = ({ setBackBtn, setAdmin, locales, changeSelectedLanguage, editLocale, addLocale, fetchLocaleById, searchLanguagesLocales }) => {
    const { select, openPopup, closePopup, changeProps } = useSelectContext();
    const { changeSearchActive } = useNavbarContext();
    const [paddingTop, setPaddingTop] = useState(0);
    const [selectSearchKey, setSelectSearchKey] = useState('');
    const [valid, setValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const params = useParams();
    const navigate = useNavigate();


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
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });

    const [locName, setLocName] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 20,
                valid: false,
                message: 'اكبر عدد من الحروف 20 حرف'
            },
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            },
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
            },
        },
        touched: false,
        valid: false
    });

    const [languageId, setLanguageId] = useState({
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
            },
        },
        touched: false,
        valid: false

    })

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

            },
        },
        touched: false,
        valid: false
    });

    const [engName, setEngName] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 20,
                valid: false,
                message: 'اكبر عدد من الحروف 20 حرف'

            },
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"

            },
        },
        touched: false,
        valid: false
    });

    useEffect(() => {
        if (params.lanId) {
            const data = {
                lan: 'ar',
                localeId: params.lanId
            }
            fetchLocaleById(data);
            
        } else if (params.editId) {
            const data = {
                lan: 'ar',
                localeId: params.editId
            }
            fetchLocaleById(data);

        }
    }, [])

    useEffect(() => {
        if (params.lanId) {
            // const locale = locales?.locales?.filter(l => l.id == params.lanId)[0];
            
            if (locales.locale) {
                locNameChangeHandler(locales?.locale?.name || '');
                codeChangeHandler(locales?.locale?.code || '');
                notesChangeHandler(locales?.locale?.comments || '');
                engNameChangeHandler(locales?.locale?.englishName || '')
            }
            setValid(true);
        } else if (params.editId) {
            // const locale = locales.locales.filter(l => l.id == params.editId)[0];
            if (locales.locale) {
                locNameChangeHandler(locales?.locale?.name || '');
                codeChangeHandler(locales?.locale?.code || '');
                notesChangeHandler(locales?.locale?.comments || '');
                engNameChangeHandler(locales?.locale?.englishName || '')
            }

            setValid(true);
        }
    }, [locales.locale]);


    const locNameChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(locName.rules, value, setLocName, locName);
        setLocName({
            ...locName,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...locName.rules,
                required: {
                    ...locName.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...locName.rules.maxLength,
                    valid: value.length <= locName.rules.maxLength.value
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

        setValid(inputIsValid && locName.valid && notes.valid);
    }

    const engNameChangeHandler = value => {
        setSubmitted(false);

        const inputIsValid = formValidator(engName.rules, value, setEngName, engName);
        setEngName({
            ...engName,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...engName.rules,
                required: {
                    ...engName.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...engName.rules.maxLength,
                    valid: value.length <= engName.rules.maxLength.value
                }
            }

        });

        setValid(locName.valid && inputIsValid && code.valid && notes.valid);
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

        setValid(inputIsValid && locName.valid && code.valid);
    }

    const addLocaleHandler = async () => {

        setSubmitted(true);

        if (!valid) return;

        let res;

        if (params.editId) {
            const data = {
                id: params.editId,
                name: locName.value,
                code: code.value,
                comments: notes.value,
                lan: 'ar_SA',
                englishName: engName.value,
                languageId: locales?.selectedLanguage?.id,
                locale: `${locales?.selectedLanguage.code}_${code.value}`,
            };

            console.log(data);
    
            res = await editLocale(data);
        } else {
            const data = {
                name: locName.value,
                englishName: engName.value,
                code: code.value,
                comments: notes.value,
                lan: 'ar_SA',
                locale: `${locales?.selectedLanguage.code}_${code.value}`,
                languageId: locales?.selectedLanguage?.id
            };
    
            res = await addLocale(data);
        }

        if (res?.status == 200 && !params.lanId && !params.editId) {
            setCode({
                ...code,
                value: ''
            });
            setLocName({
                ...locName,
                value: ''
            });
            setNotes({
                ...notes,
                value: ''
            });
        }
        if (res?.status == 200) {
            navigate(-1);
        }
        setSubmitted(false);

    }

    const inputClickHandler = () => {
        openPopup();
    }

    const selectPopupProps = {
        itemsFun: searchLanguagesLocales,
        page: locales.languagesPage,
        more: locales.moreLanguages,
        items: locales.languages,
        paginationData: {
            lan: 'ar',
            page: locales.languagesPage,
            sortType: locales.sortType,
            searchKey: selectSearchKey
        },
        searchData: {
            lan: 'ar',
            page: 0,
            sortType: locales.sortType,
            searchKey: selectSearchKey
        },
        displayName: 'englishName',
        searchKey: selectSearchKey,
        setSearchKey: setSelectSearchKey,
        isSearching: true,
        searching: locales.fetchingLanguages,
        dots: false,
        window: false,
        selectedItem: locales.selectedLanguage,
        itemClickFun,
        single: true
    }

    function itemClickFun(language) {
        changeSelectedLanguage(language);
    }

    return (
        <div className='LocalesAdd' style={{paddingTop: `${paddingTop}px`}}>
            <div className='LocalesAdd__contianer'>
                <Input touched={locName.touched} valid={locName.valid} rules={locName.rules} submitted={submitted} required={locName.rules.required} value={locName.value} setValue={value => locNameChangeHandler(value)} placeholder={'اسم اللهجة'} />
                <Input touched={engName.touched} valid={engName.valid} rules={engName.rules} submitted={submitted} required={engName.rules.required} value={engName.value} setValue={value => engNameChangeHandler(value)} placeholder={'اسم اللهجة بالانجليزية'} />
                <Input touched={code.touched} valid={code.valid} rules={code.rules} submitted={submitted} required={code.rules.required} value={code.value} setValue={value => codeChangeHandler(value)} placeholder={'كود اللهجة'} />
                <PopupInput
                    data={{
                        lan: 'ar',
                        sortType: locales.sortType,
                        page: 0,
                        searchKey: ''
                    }}
                    searchItems={searchLanguagesLocales}
                    items={locales.languages}
                    placeholder={'اختار اللغة'}
                    inputClickHandler={inputClickHandler}
                    selectedItem={locales.selectedLanguage}
                    displayName="englishName"
                />
                <TextArea touched={notes.touched} valid={notes.valid} rules={notes.rules} submitted={submitted} required={notes.rules.required.value} value={notes.value} setValue={value => notesChangeHandler(value)} placeholder={'ملاحظات'} />
                <div className='LocalesAdd__btns--container'>
                    <SaveButton saving={params.editId ? locales.editing : locales.adding} saveClickHanlder={addLocaleHandler} />
                    <CancelButton handleCancelClick={e => {
                        navigate(-1);
                    }} />
                </div>

            </div>
            {
                select.open && <SelectPopup {...selectPopupProps} />
            }
        </div>
    )
}

const mapStateToProps = state => ({
    locales: state.locales
});

export default connect(mapStateToProps, { changeSelectedLanguage, editLocale, addLocale, fetchLocaleById, searchLanguagesLocales })(LocalesAdd);