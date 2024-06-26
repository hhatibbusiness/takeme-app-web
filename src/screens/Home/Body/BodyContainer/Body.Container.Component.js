import React, {useEffect, useRef} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";
import ProductList from "./ProductList/ProductList";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts, fetchCategories} from "../../../../store/actions/categories.action";
import Failure from "../../../Product/Provider/ProviderProducts/Failure/Failure";
import {useTranslation} from "react-i18next";
import SliderComponent from "./ProductList/Slider/Slider";


const BodyContainerComponent = ({loadingCategories, coverLoaded, setCoverLoaded, currentProduct, setCurrentProduct, categories, id}) => {
    const bodyContainerRef = useRef();
    const spacerRef = useRef();
    const {t} = useTranslation();
    const containerRef = useRef();

    useEffect(() => {
        if(bodyContainerRef?.current && spacerRef?.current && containerRef.current) {
            const observerOptions = {
                root: null, // use the viewport as the root
                rootMargin: '-70px',
                threshold: 0,
            };
            const container = containerRef?.current;
            const stickyElement = bodyContainerRef?.current;
            const spacer = spacerRef?.current;

            container.style.height = `${container.getBoundingClientRect().height}px`

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        console.log('intersected!')
                        stickyElement.style.position = 'fixed';
                        stickyElement.style.top = '70px';
                        stickyElement.style.marginTop = '0px';
                    } else {
                        stickyElement.style.position = 'relative';
                        stickyElement.style.top = 'auto';
                        stickyElement.style.marginTop = '-7px';
                    }
                });
            }, observerOptions);

            observer.observe(spacer);

            return () => {
                observer.unobserve(spacer);
            }
        }
    }, [bodyContainerRef, spacerRef, containerRef, coverLoaded]);

    return (
        <div className={'BodyContainer'}>
            <Cover loaded={coverLoaded} setLoaded={setCoverLoaded} />
            {
                coverLoaded ? (
                    <>
                        <div ref={containerRef} className="BodyContainer__container">
                            <div ref={spacerRef} className="spacer"></div>
                            { coverLoaded && <div ref={bodyContainerRef} className="BodyContainer__wrapper">
                                <Categories loadingCategories={loadingCategories} categories={categories} curId={id} home />
                                <SliderComponent />
                            </div> }
                        </div>
                        {
                            (categories?.length > 0 && coverLoaded) ? (
                                !loadingCategories && (
                                    <ProductList currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />
                                )
                            ) : (
                                <Failure text={t('there\'s not products')} />
                            )
                        }
                    </>
                ) : (
                    <SpinnerComponent />
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories,
    loadingCategoryProducts: state.categories.loadingCategoryProducts,
    id: state.categories.curId,
    value: state.categories.value,
    page: state.categories.page,
    categories: state.categories.categories,
    lan: state.categories.lan
});

export default connect(mapStateToProps, {fetchCategoryProducts, fetchCategories}) (React.memo(BodyContainerComponent));