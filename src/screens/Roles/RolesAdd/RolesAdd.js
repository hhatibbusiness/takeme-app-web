import React, { useEffect, useState } from 'react';
import './RolesAdd.css';
import Input from '../../../components/InputAdmin/Input';
import TextArea from '../../../components/TextArea/TextArea';
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import { useLanguagesContext } from '../../../context/languages.context';
import { useNavigate, useParams } from 'react-router-dom';
import { formValidator } from '../../../utilty/formValidator';
import {useNavbarContext} from "../../../context/navbar.context";
import {connect} from "react-redux";
import {addLanguage, editLanguage} from "../../../store/actions/languages.actions";
import {addRole} from "../../../store/actions/roles.actions";

const LanguagesAdd = ({addRole, setAdmin, roles, editLanguage, locale}) => {
    const { changeSearchActive } = useNavbarContext();
    const [paddingTop, setPaddingTop] = useState(0);

    const [roleName, setRoleName] = useState({
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
        setAdmin(true);
        changeSearchActive(false);
        return () => {
            setAdmin(false);
            changeSearchActive(true);
        }
    }, []);

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
            const role = roles?.roles?.filter(l => l.id == params.lanId)[0];

            if (role) {
                roleNameChangeHandler(role?.name);
                notesChangeHandler(role?.comments);
            }

            setValid(true);
        } else if (params.editId) {
            const role = roles.languages.filter(l => l.id == params.editId)[0];
            if (role) {
                roleNameChangeHandler(role?.name);
                notesChangeHandler(role?.comments);
            }

            setValid(true);
        }
    }, [roles.roles]);

    const roleNameChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(roleName.rules, value, setRoleName, roleName);
        setRoleName({
            ...roleName,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...roleName.rules,
                required: {
                    ...roleName.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...roleName.rules.maxLength,
                    valid: value?.length <= roleName.rules.maxLength.value
                }
            }
        });

        setValid(inputIsValid && notes.valid);
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

        setValid(inputIsValid && roleName.valid);
    }

    const addLanuageHanlder = async () => {


        setSubmitted(true);

        if (!valid) return;

        let res;

        if (params.editId) {
            const data = {
                id: params.editId,
                name: roleName.value,
                comments: notes.value,
                lan: 'ar_SA'
            };

            res = await editLanguage(data);
        } else {
            const data = {
                roleName: roleName.value,
                roleDescription: notes.value,
                locale: locale.locale
            };

            // const role = roles?.roles?.filter(l => l.id == params.lanId)[0];

            // if (language?.name == roleName.value || language?.englishName == engName.value || language?.code == code.value) {
            //     const alertData = {
            //         alertType: 'danger',
            //         msg: 'هذة اللغة موجودة بالفعل'
            //     }
            //     return addAlert(alertData);
            // }

            res = await addRole(data);

        }

        if (res?.status == 200 && !params.lanId && !params.editId) {
            setRoleName({
                ...roleName,
                value: ''
            });
            setNotes({
                ...notes,
                value: ''
            });
        }
        if (res?.status == 200) {
            navigate('/roles');
        }
        setSubmitted(false);
    }

    return (
        <div id={'LanguagesAdd'} className='LanguagesAdd' style={{paddingTop: `${paddingTop + 20}px`}}>
            <div className='LanguagesAdd__container'>
                <Input
                    id={'languageName'}
                    touched={roleName.touched}
                    valid={roleName.valid}
                    rules={roleName.rules}
                    submitted={submitted}
                    required={roleName.rules.required}
                    value={roleName.value}
                    setValue={value => roleNameChangeHandler(value)}
                    placeholder={'اسم Role'}
                    key={1}
                />
                <TextArea
                    id={'languageNotes'}
                    touched={notes.touched}
                    valid={notes.valid}
                    rules={notes.rules}
                    value={notes.value}
                    setValue={value => notesChangeHandler(value)}
                    placeholder={'ملاحظات'}
                />
                <div className='LanguagesAdd__btns--container'>
                    <SaveButton
                        saving={params.editId ? roles.editing : roles.adding}
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

const mapStateToProps = state => ({
    roles: state.roles,
    locale: state.categories.selectedLocale
})

export default connect(mapStateToProps, {addRole, editLanguage}) (LanguagesAdd);