import React, { useEffect, useState } from 'react';
import Input from '../../../components/InputAdmin/Input';
import { formValidator } from '../../../utilty/formValidator';
import './SubscriptionPlansAdd.css';
import { useNavigate, useParams } from 'react-router-dom';
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import { useNavbarContext } from '../../../context/navbar.context';
import {connect} from "react-redux";
import {editSubscriptionPlan, addSubscriptionPlan} from "../../../store/actions/subscriptionPlans.actions";

const SubscriptionPlansAdd = ({setAdmin, subscriptionPlans, editSubscriptionPlan, addSubscriptionPlan}) => {
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

    const [storesNumberLimit, setStoresNumberLimit] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 8,
                valid: false,
                message: 'اكبر عدد من الارقام 8'
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

    const [storeSizeLimitInMB, setStoreSizeLimitInMB] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 8,
                valid: false,
                message: 'اكبر عدد من الارقام 8'
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

    const [storeItemsNumberLimit, setStoreItemsNumberLimit] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 8,
                valid: false,
                message: 'اكبر عدد من الارقام 8'
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

    const [storeItemImagesNumberLimit, setStoreItemImagesNumberLimit] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 8,
                valid: false,
                message: 'اكبر عدد من الارقام 8'
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

    const [storeStoriesNumberLimit, setStoreStoriesNumberLimit] = useState({
        value: '',
        rules: {
            maxLength: {
                value: 8,
                valid: false,
                message: 'اكبر عدد من الارقام 8'
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
        if (params.planId || params.editId) {
            const planId = params.planId || params.editId;
            const plan = subscriptionPlans?.plans?.find(p => p.id === Number(planId));
            
            if (plan) {
                nameChangeHandler(plan.name || '');
                storesNumberLimitChangeHandler(String(plan.storesNumberLimit) || '');
                storeSizeLimitInMBChangeHandler(String(plan.storeSizeLimit) || '');
                storeItemsNumberLimitChangeHandler(String(plan.storeItemsNumberLimit) || '');
                storeItemImagesNumberLimitChangeHandler(String(plan.storeItemImagesNumberLimit) || '');
                storeStoriesNumberLimitChangeHandler(String(plan.storeStoriesNumberLimit) || '');
                setValid(true);
            }
        }
    }, [params.planId, params.editId, subscriptionPlans.plans]);


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
        setValid(valid && storesNumberLimit.valid && storeSizeLimitInMB.valid && 
                storeItemsNumberLimit.valid && storeItemImagesNumberLimit.valid && 
                storeStoriesNumberLimit.valid);
    }


    const storesNumberLimitChangeHandler = value => {
        const valid = formValidator(storesNumberLimit.rules, value);
        setStoresNumberLimit({
            ...storesNumberLimit,
            touched: true,
            valid: valid,
            value: value,
            rules: {
                ...storesNumberLimit.rules,
                required: {
                    ...storesNumberLimit.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...storesNumberLimit.rules.maxLength,
                    valid: value.length <= storesNumberLimit.rules.maxLength.value
                }
            }
        });
        setValid(name.valid && valid && storeSizeLimitInMB.valid && 
                storeItemsNumberLimit.valid && storeItemImagesNumberLimit.valid && 
                storeStoriesNumberLimit.valid);
    }

    const storeSizeLimitInMBChangeHandler = value => {
        const valid = formValidator(storeSizeLimitInMB.rules, value);
        setStoreSizeLimitInMB({
            ...storeSizeLimitInMB,
            touched: true,
            valid: valid,
            value: value,
            rules: {
                ...storeSizeLimitInMB.rules,
                required: {
                    ...storeSizeLimitInMB.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...storeSizeLimitInMB.rules.maxLength,
                    valid: value.length <= storeSizeLimitInMB.rules.maxLength.value
                }
            }
        });
        setValid(name.valid && storesNumberLimit.valid && valid && 
                storeItemsNumberLimit.valid && storeItemImagesNumberLimit.valid && 
                storeStoriesNumberLimit.valid);
    }

    const storeItemsNumberLimitChangeHandler = value => {
        const valid = formValidator(storeItemsNumberLimit.rules, value);
        setStoreItemsNumberLimit({
            ...storeItemsNumberLimit,
            touched: true,
            valid: valid,
            value: value,
            rules: {
                ...storeItemsNumberLimit.rules,
                required: {
                    ...storeItemsNumberLimit.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...storeItemsNumberLimit.rules.maxLength,
                    valid: value.length <= storeItemsNumberLimit.rules.maxLength.value
                }
            }
        });
        setValid(name.valid && storesNumberLimit.valid && storeSizeLimitInMB.valid && 
                valid && storeItemImagesNumberLimit.valid && storeStoriesNumberLimit.valid);
    }

    const storeItemImagesNumberLimitChangeHandler = value => {
        const valid = formValidator(storeItemImagesNumberLimit.rules, value);
        setStoreItemImagesNumberLimit({
            ...storeItemImagesNumberLimit,
            touched: true,
            valid: valid,
            value: value,
            rules: {
                ...storeItemImagesNumberLimit.rules,
                required: {
                    ...storeItemImagesNumberLimit.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...storeItemImagesNumberLimit.rules.maxLength,
                    valid: value.length <= storeItemImagesNumberLimit.rules.maxLength.value
                }
            }
        });
        setValid(name.valid && storesNumberLimit.valid && storeSizeLimitInMB.valid && 
                storeItemsNumberLimit.valid && valid && storeStoriesNumberLimit.valid);
    }

    const storeStoriesNumberLimitChangeHandler = value => {
        const valid = formValidator(storeStoriesNumberLimit.rules, value);
        setStoreStoriesNumberLimit({
            ...storeStoriesNumberLimit,
            touched: true,
            valid: valid,
            value: value,
            rules: {
                ...storeStoriesNumberLimit.rules,
                required: {
                    ...storeStoriesNumberLimit.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...storeStoriesNumberLimit.rules.maxLength,
                    valid: value.length <= storeStoriesNumberLimit.rules.maxLength.value
                }
            }
        });
        setValid(name.valid && storesNumberLimit.valid && storeSizeLimitInMB.valid && 
                storeItemsNumberLimit.valid && storeItemImagesNumberLimit.valid && valid);
    }


    const addSubscriptionPlanHandler = async () => {
        setSubmitted(true);
        if (!valid) return;

        const data = {
            lan: 'ar_SA',
            name: name.value,
            storesNumberLimit: Number(storesNumberLimit.value),
            storeSizeLimit: Number(storeSizeLimitInMB.value),
            storeItemsNumberLimit: Number(storeItemsNumberLimit.value),
            storeItemImagesNumberLimit: Number(storeItemImagesNumberLimit.value),
            storeStoriesNumberLimit: Number(storeStoriesNumberLimit.value)
        };

        let res;

        if (params.editId) {
            data.id = params.editId;
            res = await editSubscriptionPlan(data);
        } else {
            data.id = null;
            res = await addSubscriptionPlan(data);
        }

        if (res?.status) {
            navigate('/subscription-plans');
        }
        setSubmitted(false);
    }

    return (
        <div id={"SubscriptionPlansAdd"} className='SubscriptionPlansAdd' style={{paddingTop: `${paddingTop + 20}px`}}>
            <div className='SubscriptionPlansAdd__container'>
                <Input
                    touched={name.touched}
                    valid={name.valid}
                    rules={name.rules}
                    submitted={submitted}
                    required={name.rules.required}
                    value={name.value}
                    setValue={value => nameChangeHandler(value)}
                    placeholder={'اسم الخطة'}
                    id={'Plan__name'}
                />
                <Input
                    touched={storesNumberLimit.touched}
                    valid={storesNumberLimit.valid}
                    rules={storesNumberLimit.rules}
                    submitted={submitted}
                    required={storesNumberLimit.rules.required}
                    value={storesNumberLimit.value}
                    setValue={value => storesNumberLimitChangeHandler(value)}
                    placeholder={'أقصى عدد للمتاجر'}
                    type="number"
                    id={'Plan__stores_limit'}
                /> 
                <Input
                    touched={storeSizeLimitInMB.touched}
                    valid={storeSizeLimitInMB.valid}
                    rules={storeSizeLimitInMB.rules}
                    submitted={submitted}
                    required={storeSizeLimitInMB.rules.required}
                    value={storeSizeLimitInMB.value}
                    setValue={value => storeSizeLimitInMBChangeHandler(value)}
                    placeholder={'أقصى حجم للمتجر MB'}
                    type="number"
                    id={'Plan__store_size'}
                />
                <Input
                    touched={storeItemsNumberLimit.touched}
                    valid={storeItemsNumberLimit.valid}
                    rules={storeItemsNumberLimit.rules}
                    submitted={submitted}
                    required={storeItemsNumberLimit.rules.required}
                    value={storeItemsNumberLimit.value}
                    setValue={value => storeItemsNumberLimitChangeHandler(value)}
                    placeholder={'أقصى عدد العناصر بالمتجر'}
                    type="number"
                    id={'Plan__items_limit'}
                />
                <Input
                    touched={storeItemImagesNumberLimit.touched}
                    valid={storeItemImagesNumberLimit.valid}
                    rules={storeItemImagesNumberLimit.rules}
                    submitted={submitted}
                    required={storeItemImagesNumberLimit.rules.required}
                    value={storeItemImagesNumberLimit.value}
                    setValue={value => storeItemImagesNumberLimitChangeHandler(value)}
                    placeholder={'أقصى عدد للصور بكل عنصر'}
                    type="number"
                    id={'Plan__images_limit'}
                />
                <Input
                    touched={storeStoriesNumberLimit.touched}
                    valid={storeStoriesNumberLimit.valid}
                    rules={storeStoriesNumberLimit.rules}
                    submitted={submitted}
                    required={storeStoriesNumberLimit.rules.required}
                    value={storeStoriesNumberLimit.value}
                    setValue={value => storeStoriesNumberLimitChangeHandler(value)}
                    placeholder={'أقصى عدد للستوريز بالمتجر'}
                    type="number"
                    id={'Plan__stories_limit'}
                />
                <div className='SubscriptionPlansAdd__btns--container'>
                    <SaveButton
                        saving={params.editId ? subscriptionPlans.editing : subscriptionPlans.adding}
                        saveClickHanlder={addSubscriptionPlanHandler}
                        id={'Plan__save'}
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
    subscriptionPlans: state.subscriptionPlans
});

export default connect(mapStateToProps, {editSubscriptionPlan, addSubscriptionPlan})(SubscriptionPlansAdd);
