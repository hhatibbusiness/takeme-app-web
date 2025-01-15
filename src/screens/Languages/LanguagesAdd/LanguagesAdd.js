import React, { useEffect, useState } from 'react';
import './LanguagesAdd.css';
import Input from '../../../components/InputAdmin/Input';
import TextArea from '../../../components/TextArea/TextArea';
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import { useLanguagesContext } from '../../../context/languages.context';
import { useNavigate, useParams } from 'react-router-dom';
import { formValidator } from '../../../utilty/formValidator';
import {useNavbarContext} from "../../../context/navbar.context";

const LanguagesAdd = ({setBackBtn, setAdmin}) => {
    const { languages, addLanguage, editLanguage } = useLanguagesContext();
    const { changeSearchActive } = useNavbarContext();
    const [paddingTop, setPaddingTop] = useState(0);

    const [lanName, setLanName] = useState({
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
        setBackBtn(true);
        setAdmin(true);
        changeSearchActive(false);
        return () => {
            setBackBtn(false);
            setAdmin(false);
            changeSearchActive(true);
        }
    }, []);


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
    const [notes, setNotes] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 250,
                valid: false,
                message: 'اكبر عدد من الحروف 250 حرف'

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
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });

    useEffect(() => {
        if (params.lanId) {
            const language = languages?.languages?.filter(l => l.id == params.lanId)[0];

            if (language) {
                lanNameChangeHandler(language?.name);
                engNameChangeHandler(language?.englishName);
                codeChangeHandler(language?.code);
                notesChangeHandler(language?.comments);
            }

            // setLanName({
            //     ...lanName,
            //     value: language?.name
            // });
            // setEngName({
            //     ...engName,
            //     value: language?.englishName
            // });
            // setCode({
            //     ...code,
            //     value: language?.code
            // });
            // setNotes({
            //     ...notes,
            //     value: language?.comments
            // });
            setValid(true);
        } else if (params.editId) {
            const language = languages.languages.filter(l => l.id == params.editId)[0];
            if (language) {
                lanNameChangeHandler(language?.name);
                engNameChangeHandler(language?.englishName);
                codeChangeHandler(language?.code);
                notesChangeHandler(language?.comments);
            }

            setValid(true);

            // setLanName({
            //     ...lanName,
            //     value: language?.name
            // });
            // setEngName({
            //     ...engName,
            //     value: language?.englishName
            // });
            // setCode({
            //     ...code,
            //     value: language?.code
            // });
            // setNotes({
            //     ...notes,
            //     value: language?.comments
            // });

        }
    }, [languages.languages]);

    const lanNameChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(lanName.rules, value, setLanName, lanName);
        setLanName({
            ...lanName,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...lanName.rules,
                required: {
                    ...lanName.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...lanName.rules.maxLength,
                    valid: value?.length <= lanName.rules.maxLength.value
                }
            }
        });
        console.log(lanName, engName, code, notes, valid);

        setValid(inputIsValid && engName.valid && code.valid && notes.valid);
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
                    valid: value?.length <= engName.rules.maxLength.value
                }
            }

        });
        console.log(lanName, engName, code, notes, valid);

        setValid(lanName.valid && inputIsValid && code.valid && notes.valid);
    }

    const notesChangeHandler = value => {
        setSubmitted(false);

        const inputIsValid = formValidator(notes.rules, value || '', setNotes, notes);
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
                    valid: value?.length <= notes?.rules?.maxLength?.value
                }
            }
        });
        console.log(lanName, engName, code, notes, valid);

        setValid(inputIsValid && engName.valid && code.valid && lanName.valid);
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
                    valid: value?.length <= code.rules.maxLength.value
                }
            }

        });
        console.log(lanName, engName, code, notes, valid);

        setValid(inputIsValid && engName.valid && lanName.valid && notes.valid);
    }

    const addLanuageHanlder = async () => {

        console.log(lanName, engName, code, notes, valid)

        setSubmitted(true);

        if (!valid) return;

        let res;

        if (params.editId) {
            const data = {
                id: params.editId,
                name: lanName.value,
                englishName: engName.value,
                code: code.value,
                comments: notes.value,
                lan: 'ar_SA'
            };
    
            res = await editLanguage(data);
        } else {
            const data = {
                name: lanName.value,
                englishName: engName.value,
                code: code.value,
                comments: notes.value,
                lan: 'ar_SA'
            };

            const language = languages.languages.filter(l => l.id == params.lanId)[0];

            // if (language?.name == lanName.value || language?.englishName == engName.value || language?.code == code.value) {
            //     const alertData = {
            //         alertType: 'danger',
            //         msg: 'هذة اللغة موجودة بالفعل'
            //     }
            //     return addAlert(alertData);
            // }
    
            res = await addLanguage(data);
        }

        if (res?.status == 200 && !params.lanId && !params.editId) {
            setCode({
                ...code,
                value: ''
            });
            setLanName({
                ...lanName,
                value: ''
            });
            setEngName({
                ...engName,
                value: ''
            });
            setNotes({
                ...notes,
                value: ''
            });
        }
        if (res?.status == 200) {
            navigate('/languages');
        }
        setSubmitted(false);
    }
    
    return (
        <div id={'LanguagesAdd'} className='LanguagesAdd' style={{paddingTop: `${paddingTop}px`}}>
            <div className='LanguagesAdd__container'>
                <Input id={'languageName'} touched={lanName.touched} valid={lanName.valid} rules={lanName.rules} submitted={submitted} required={lanName.rules.required} value={lanName.value} setValue={value => lanNameChangeHandler(value)} placeholder={'اسم اللغة'} />
                <Input id={'languageEngName'}  touched={engName.touched} valid={engName.valid} rules={engName.rules} submitted={submitted} required={engName.rules.required} value={engName.value} setValue={value => engNameChangeHandler(value)} placeholder={'اسم اللغة بالانكليزي'} />
                <Input id={'languageCode'} touched={code.touched} valid={code.valid} rules={code.rules} submitted={submitted}  required={true} value={code.value} setValue={value => codeChangeHandler(value)} placeholder={'كود اللغة (مثال (Eng))'} />
                <TextArea id={'languageNotes'} touched={notes.touched} valid={notes.valid} rules={notes.rules} value={notes.value} setValue={value => notesChangeHandler(value)} placeholder={'ملاحظات'} />
                <div className='LanguagesAdd__btns--container'>
                    <SaveButton
                        saving={params.editId ? languages.editing : languages.adding}
                        saveClickHanlder={addLanuageHanlder}
                        id={"LanguagesAdd__save"}
                    />
                    <CancelButton handleCancelClick={e => {
                        navigate(-1);
                    }} />
                </div>
            </div>
        </div>
    );
}

export default LanguagesAdd;