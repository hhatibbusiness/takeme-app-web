import React, {useEffect} from 'react';
import './Product.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {fetchProductDetails, fetchProductTypeDetails} from "../../store/actions/product.actions";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";

const Product = ({fetchProductDetails, page, lan, providers, fetchProductTypeDetails, productType}) => {
    const params = useParams();
    useEffect (() => {
        fetchProductTypeDetails(params.id, lan);
        fetchProductDetails(params.id, page, lan);
    }, [params.id]);
    return (
        <div className={'ProductScreen'}>
            <Navbar backBtn={true} midText={productType.title}/>
        </div>
    );
};

const mapStateToProps = state => ({
    providers: state.product.providers,
    page: state.product.page,
    lan: state.categories.lan,
    productType: state.product.product
});

export default connect(mapStateToProps, {fetchProductDetails, fetchProductTypeDetails}) (Product);