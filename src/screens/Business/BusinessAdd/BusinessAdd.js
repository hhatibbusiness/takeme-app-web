import React, { useEffect, useState } from 'react';
import Input from '../../../components/InputAdmin/Input';
import { formValidator } from '../../../utilty/formValidator';
import './BusinessAdd.css';
import { useNavigate, useParams } from 'react-router-dom';
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import { useNavbarContext } from '../../../context/navbar.context';
import {connect} from "react-redux";
import {editBusiness, addBusiness} from "../../../store/actions/business.actions";
import PopupInput from "../../../components/PopupInput/PopupInput";
import ProfileImage from '../../../components/ProfileImage/prfileImage';


const BusinessAdd = ({setAdmin, business, editBusiness, addBusiness}) => {
    const { changeSearchActive } = useNavbarContext();
    const params = useParams();
    const navigate = useNavigate();
    const [paddingTop, setPaddingTop] = useState(0);
    const [valid, setValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        changeSearchActive(false);
        setAdmin(true);
        return () => {
            changeSearchActive(true);
            setAdmin(false);
        }
    }, []);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height+20);
        }
    });

    const [name, setName] = useState({
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
            }
        },
        touched: false,
        valid: false
    });

    const [type, setType] = useState({
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
            }
        },
        touched: false,
        valid: false
    });

    useEffect(() => {
        if (params.businessId || params.editId) {
            const businessId = params.businessId || params.editId;
            const currentBusiness = business?.businesses?.find(b => b.id === Number(businessId));
            
            if (currentBusiness) {
                nameChangeHandler(currentBusiness.name || '');
                typeChangeHandler(currentBusiness.type || '');
                setValid(true);
            }
        }
    }, [params.businessId, params.editId, business.businesses]);

    const nameChangeHandler = value => {
        const valid = formValidator(name.rules, value);
        setName({
            ...name,
            touched: true,
            valid: valid,
            value: value,
            rules: {
                ...name.rules,
                required: {
                    ...name.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...name.rules.maxLength,
                    valid: value.length <= name.rules.maxLength.value
                }
            }
        });
        setValid(valid && type.valid);
    }

    const typeChangeHandler = value => {
        const valid = formValidator(type.rules, value);
        setType({
            ...type,
            touched: true,
            valid: valid,
            value: value,
            rules: {
                ...type.rules,
                required: {
                    ...type.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...type.rules.maxLength,
                    valid: value.length <= type.rules.maxLength.value
                }
            }
        });
        setValid(name.valid && valid);
    }

    const addBusinessHandler = async () => {
        setSubmitted(true);
        if (!valid) return;

        const data = {
            lan: 'ar_SA',
            name: name.value,
            type: type.value
        };

        let res;

        if (params.editId) {
            data.id = params.editId;
            res = await editBusiness(data);
        } else {
            data.id = null;
            res = await addBusiness(data);
        }

        if (res?.status === 200) {
            navigate('/business');
        }
        setSubmitted(false);
    }

    return (
        <div id={"BusinessAdd"} className='BusinessAdd' style={{paddingTop: `${paddingTop + 20}px`}}>
            <div className='BusinessAdd__container'>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '-15px auto' }}>
                    <ProfileImage
                        ImagePath={null}
                        trusted={true}
                    />
                </div>
                <Input
                    touched={name.touched}
                    valid={name.valid}
                    rules={name.rules}
                    submitted={submitted}
                    required={name.rules.required}
                    value={name.value}
                    setValue={value => nameChangeHandler(value)}
                    placeholder={'اسم العمل {المسجل بالدولة}'}
                    id={'Business__name'}
                />
                <Input
                    touched={type.touched}
                    valid={type.valid}
                    rules={type.rules}
                    submitted={submitted}
                    required={type.rules.required}
                    value={type.value}
                    setValue={value => typeChangeHandler(value)}
                    placeholder={'رقم العمل {المسجل بالدولة}'}
                    id={'Business__type'}
                />
                <PopupInput 
                    selectedItem={{}}
                    displayName={'name'}
                    placeholder={'نوع العمل'}
                    inputClickHandler={() => {}}
                    setOpen={() => {}}
                    submitted={submitted}
                    valid={valid}
                />
                <PopupInput 
                    selectedItem={{}}
                    displayName={'name'}
                    placeholder={'دولة العمل'}
                    inputClickHandler={() => {}}
                    setOpen={() => {}}
                    submitted={submitted}
                    valid={valid}
                />

                <div className='BusinessAdd__btns--container'>
                    <SaveButton
                        saving={params.editId ? business.editing : business.adding}
                        saveClickHanlder={addBusinessHandler}
                        id={'Business__save'}
                    />
                    <CancelButton
                        handleCancelClick={() => navigate(-1)}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    business: state.business
});

export default connect(mapStateToProps, {editBusiness, addBusiness})(BusinessAdd);
