import React, { useEffect, useState } from 'react';
import Input from '../../../components/InputAdmin/Input';
import { formValidator } from '../../../utilty/formValidator';
import './BusinessPlansAdd.css';
import { useNavigate, useParams } from 'react-router-dom';
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import { useNavbarContext } from '../../../context/navbar.context';
import {connect} from "react-redux";
import {editBusinessPlan, addBusinessPlan} from "../../../store/actions/businessPlans.actions";

const BusinessPlansAdd = ({setAdmin, locale, businessPlans, editBusinessPlan, addBusinessPlan}) => {
    const { changeSearchActive } = useNavbarContext();
    const [paddingTop, setPaddingTop] = useState(0);
    const params = useParams();
    const navigate = useNavigate();
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

    const [storeSizeLimit, setStoreSizeLimit] = useState({
        value: '',
        rules: {
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            },
            isNumeric: {
                value: true,
                valid: false,
                message: "يجب أن يكون رقم"
            }
        },
        touched: false,
        valid: false
    });

    const [itemsLimit, setItemsLimit] = useState({
        value: '',
        rules: {
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            },
            isNumeric: {
                value: true,
                valid: false,
                message: "يجب أن يكون رقم"
            }
        },
        touched: false,
        valid: false
    });

    const [imagesPerItemLimit, setImagesPerItemLimit] = useState({
        value: '',
        rules: {
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            },
            isNumeric: {
                value: true,
                valid: false,
                message: "يجب أن يكون رقم"
            }
        },
        touched: false,
        valid: false
    });

    const [storiesLimit, setStoriesLimit] = useState({
        value: '',
        rules: {
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            },
            isNumeric: {
                value: true,
                valid: false,
                message: "يجب أن يكون رقم"
            }
        },
        touched: false,
        valid: false
    });

    useEffect(() => {
        if (params.planId || params.editId) {
            const planId = params.planId || params.editId;
            const plan = businessPlans?.businessPlans?.find(p => p.id === Number(planId));
            
            if (plan) {
                nameChangeHandler(plan.name || '');
                storeSizeLimitChangeHandler(plan.storeSizeLimitInMB?.toString() || '');
                itemsLimitChangeHandler(plan.storeItemsNumberLimit?.toString() || '');
                imagesPerItemLimitChangeHandler(plan.storeItemImagesNumberLimit?.toString() || '');
                storiesLimitChangeHandler(plan.storeStoriesNumberLimit?.toString() || '');
            }
        }
    }, [params.planId, params.editId, businessPlans.businessPlans]);

    const nameChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(name.rules, value, setName, name);
        setName({
            ...name,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...name.rules,
                required: {
                    ...name.rules.required,
                    valid: value !== ''
                },
                maxLength: {
                    ...name.rules.maxLength,
                    valid: value.length <= name.rules.maxLength.value
                }
            }
        });

        setValid(inputIsValid && storeSizeLimit.valid && itemsLimit.valid && 
                imagesPerItemLimit.valid && storiesLimit.valid);
    }

    const storeSizeLimitChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(storeSizeLimit.rules, value, setStoreSizeLimit, storeSizeLimit);
        setStoreSizeLimit({
            ...storeSizeLimit,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...storeSizeLimit.rules,
                required: {
                    ...storeSizeLimit.rules.required,
                    valid: value !== ''
                },
                isNumeric: {
                    ...storeSizeLimit.rules.isNumeric,
                    valid: !isNaN(value)
                }
            }
        });

        setValid(inputIsValid && name.valid && itemsLimit.valid && 
                imagesPerItemLimit.valid && storiesLimit.valid);
    }

    const itemsLimitChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(itemsLimit.rules, value, setItemsLimit, itemsLimit);
        setItemsLimit({
            ...itemsLimit,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...itemsLimit.rules,
                required: {
                    ...itemsLimit.rules.required,
                    valid: value !== ''
                },
                isNumeric: {
                    ...itemsLimit.rules.isNumeric,
                    valid: !isNaN(value)
                }
            }
        });

        setValid(inputIsValid && name.valid && storeSizeLimit.valid && 
                imagesPerItemLimit.valid && storiesLimit.valid);
    }

    const imagesPerItemLimitChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(imagesPerItemLimit.rules, value, setImagesPerItemLimit, imagesPerItemLimit);
        setImagesPerItemLimit({
            ...imagesPerItemLimit,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...imagesPerItemLimit.rules,
                required: {
                    ...imagesPerItemLimit.rules.required,
                    valid: value !== ''
                },
                isNumeric: {
                    ...imagesPerItemLimit.rules.isNumeric,
                    valid: !isNaN(value)
                }
            }
        });

        setValid(inputIsValid && name.valid && storeSizeLimit.valid && 
                itemsLimit.valid && storiesLimit.valid);
    }

    const storiesLimitChangeHandler = value => {
        setSubmitted(false);
        const inputIsValid = formValidator(storiesLimit.rules, value, setStoriesLimit, storiesLimit);
        setStoriesLimit({
            ...storiesLimit,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...storiesLimit.rules,
                required: {
                    ...storiesLimit.rules.required,
                    valid: value !== ''
                },
                isNumeric: {
                    ...storiesLimit.rules.isNumeric,
                    valid: !isNaN(value)
                }
            }
        });

        setValid(inputIsValid && name.valid && storeSizeLimit.valid && 
                itemsLimit.valid && imagesPerItemLimit.valid);
    }

    const addBusinessPlanHandler = async () => {
        setSubmitted(true);
        if (!valid) return;

        let res;

        const planData = {
            name: name.value,
            storeSizeLimitInMB: parseInt(storeSizeLimit.value),
            storeItemsNumberLimit: parseInt(itemsLimit.value),
            storeItemImagesNumberLimit: parseInt(imagesPerItemLimit.value),
            storeStoriesNumberLimit: parseInt(storiesLimit.value)
        };

        if (params.editId) {
            planData.id = parseInt(params.editId);
            res = await editBusinessPlan({
                ...planData,
                lan: 'ar_SA'
            });
        } else {
            res = await addBusinessPlan({
                ...planData,
                lan: locale?.locale || 'ar_SA'
            });
        }

        if (res?.status === 200 && !params.planId && !params.editId) {
            setName({ ...name, value: '' });
            setStoreSizeLimit({ ...storeSizeLimit, value: '' });
            setItemsLimit({ ...itemsLimit, value: '' });
            setImagesPerItemLimit({ ...imagesPerItemLimit, value: '' });
            setStoriesLimit({ ...storiesLimit, value: '' });
        }

        if (res?.status === 200) {
            navigate('/business-plans');
        }

        setSubmitted(false);
    }

    return (
        <div id={"BusinessPlansAdd"} className='BusinessPlansAdd' style={{paddingTop: `${paddingTop + 20}px`}}>
            <div className='BusinessPlansAdd__container'>
                <Input
                    touched={name.touched}
                    valid={name.valid}
                    rules={name.rules}
                    submitted={submitted}
                    required={name.rules.required}
                    value={name.value}
                    setValue={value => nameChangeHandler(value)}
                    placeholder={'اسم الخطة'}
                    id={'BusinessPlan__name'}
                />
                <Input
                    touched={storeSizeLimit.touched}
                    valid={storeSizeLimit.valid}
                    rules={storeSizeLimit.rules}
                    submitted={submitted}
                    required={storeSizeLimit.rules.required}
                    value={storeSizeLimit.value}
                    setValue={value => storeSizeLimitChangeHandler(value)}
                    placeholder={'حد حجم المتجر (ميجابايت)'}
                    id={'BusinessPlan__storeSize'}
                />
                <Input
                    touched={itemsLimit.touched}
                    valid={itemsLimit.valid}
                    rules={itemsLimit.rules}
                    submitted={submitted}
                    required={itemsLimit.rules.required}
                    value={itemsLimit.value}
                    setValue={value => itemsLimitChangeHandler(value)}
                    placeholder={'حد عدد العناصر'}
                    id={'BusinessPlan__items'}
                />
                <Input
                    touched={imagesPerItemLimit.touched}
                    valid={imagesPerItemLimit.valid}
                    rules={imagesPerItemLimit.rules}
                    submitted={submitted}
                    required={imagesPerItemLimit.rules.required}
                    value={imagesPerItemLimit.value}
                    setValue={value => imagesPerItemLimitChangeHandler(value)}
                    placeholder={'حد عدد الصور لكل عنصر'}
                    id={'BusinessPlan__imagesPerItem'}
                />
                <Input
                    touched={storiesLimit.touched}
                    valid={storiesLimit.valid}
                    rules={storiesLimit.rules}
                    submitted={submitted}
                    required={storiesLimit.rules.required}
                    value={storiesLimit.value}
                    setValue={value => storiesLimitChangeHandler(value)}
                    placeholder={'حد عدد القصص'}
                    id={'BusinessPlan__stories'}
                />
                <div className='BusinessPlansAdd__btns--container'>
                    <SaveButton
                        saving={params.editId ? businessPlans.editing : businessPlans.adding}
                        saveClickHandler={addBusinessPlanHandler}
                        id={'BusinessPlan__save'}
                    />
                    <CancelButton
                        handleCancelClick={() => navigate(-1)}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale,
    businessPlans: state.businessPlans
})

export default connect(mapStateToProps, {editBusinessPlan, addBusinessPlan})(BusinessPlansAdd);
