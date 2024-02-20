import React, {useEffect, useRef, useState} from 'react';
import Cover from "./Cover/Cover";
import './Body.Container.Styles.scss';
import {connect} from "react-redux";
import Categories from "./CategoriesBar/Categories";
import ProductList from "./ProductList/ProductList";
import SpinnerComponent from "../../../../components/Spinner/Spinner.Component";
import {fetchCategoryProducts, fetchCategories} from "../../../../store/actions/categories.action";
import Failure from "../../../Product/Provider/ProviderProducts/Failure/Failure";
import {useTranslation} from "react-i18next";
import KeepAlive from "react-activation";
import SliderComponent from "./ProductList/Slider/Slider";
import body from "../Body";

const BodyContainerComponent = ({loadingCategories, page, lan, categories, id, fetchCategoryProducts, value, fetchCategories}) => {
    const bodyContainerRef = useRef();
    const spacerRef = useRef();
    const {t} = useTranslation();
    const containerRef = useRef();

    const observerOptions = {
        root: null, // use the viewport as the root
        rootMargin: '200px',
        threshold: 0,
    };

    useEffect(() => {
        // console.log('Hello there!');
        // console.log(bodyContainerRef, spacerRef)
        if(bodyContainerRef?.current && spacerRef?.current && containerRef.current) {
            const observerOptions = {
                root: null, // use the viewport as the root
                rootMargin: '-70px',
                threshold: 0,
            };
            const container = containerRef?.current;
            const stickyElement = bodyContainerRef?.current;
            const spacer = spacerRef?.current;

            // console.log(stickyElement, spacer);




            container.style.height = `${container.getBoundingClientRect().height}px`

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        stickyElement.style.position = 'fixed';
                        stickyElement.style.top = '70px';
                    } else {
                        stickyElement.style.position = 'relative';
                        stickyElement.style.top = 'auto';
                    }
                });
            }, observerOptions);

            observer.observe(spacer);

            return () => {
                observer.unobserve(spacer);
            }


        }
    }, [bodyContainerRef, spacerRef, containerRef]);
    return (
        <div className={'BodyContainer'}>
            {/*<KeepAlive cacheKey={'cover'}>*/}
                <Cover />
            {/*</KeepAlive>*/}
            <div ref={containerRef} className="BodyContainer__container">
                <div ref={spacerRef} className="spacer"></div>
                <div ref={bodyContainerRef} className="BodyContainer__wrapper">
                    <Categories loadingCategories={loadingCategories} categories={categories} curId={id} home />
                    <SliderComponent />
                </div>
            </div>
            {
                categories?.length > 0 ? (
                    !loadingCategories ? (
                        <ProductList />
                    ) : (
                        <SpinnerComponent />
                    )

                ) : (
                    <Failure text={t('there\'s not products')} />
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

export default connect(mapStateToProps, {fetchCategoryProducts, fetchCategories}) (BodyContainerComponent);