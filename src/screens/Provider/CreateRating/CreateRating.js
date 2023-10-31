import React, {useEffect, useRef, useState} from 'react';
import './CreateRating.css';
import {connect} from "react-redux";
import {addProviderRating} from "../../../store/actions/ratings.actions";
import {useNavigate} from "react-router-dom";
import {closePopup} from "../../../store/actions/ui.actions";

const CreateRating = ({addingRating, isAuthenticated, closePopup, addProviderRating, currentProduct, lan, user}) => {
    // const [ratingComment, setRatingComment] = useState('');
    const [array, setArray] = useState([]);
    const [ratingNumber, setRatingNumber] = useState(null);
    const [ratingScore, setRatingScore] = useState(0);
    const inputRef = useRef();
    const commentRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
    }, []);

    const publish = async e => {
        if(!isAuthenticated) {
            closePopup();
            return navigate('/login')
        };
        const ratingComment = inputRef?.current?.innerText;
        const comments = commentRef?.current?.innerText;
        const data = {
            locale: lan,
            customerId: user.id,
            providerId: currentProduct.providerId,
            ratingScore,
            ratingComment,
            comments
        };
        const res = await addProviderRating(data);
        if(res.status == 200 && res.data.status == true) {
            const ratingCommentRef = inputRef?.current;
            if(ratingCommentRef) ratingCommentRef.innerText = '';
            const commentsRefCurrent = commentRef?.current;
            if(commentsRefCurrent) commentsRefCurrent.innerText = '';
            setRatingScore(0);
            setRatingNumber(null);
        }
    }

    // useEffect(() => {
    //     const inputElem = inputRef?.current;
    //     if(inputElem) inputElem.innerText = ratingComment;
    // }, [ratingComment]);

    useEffect(() => {
        const inputElem = inputRef?.current;
        // if(inputElem) setRatingComment(inputElem.innerText);
    }, [inputRef?.current?.innerText]);

    return (
        <div className={'CreateRating'}>
            <div className="GroupPosts__form">
                <div className="w-input-text-group">
                    <div ref={inputRef} id="w-input-text" contentEditable></div>
                    <div className="w-placeholder">
                        اضافة تعليق
                    </div>
                </div>
                <div className="w-input-text-group">
                    <div className={'CreateRating__comments'} ref={commentRef} id="w-input-text" contentEditable></div>
                    <div className="w-placeholder">
                        اضافة تعليق شامل
                    </div>
                </div>
                <div className="w-input-text-group">
                    <div className="CreateRating__stars">
                        {
                            array?.map((s, i) => (
                                <i onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setRatingScore(i + 1);
                                }} onMouseLeave={e => setRatingNumber(null)} onMouseEnter={e => {
                                    setRatingNumber(i);
                                }} style={{color: `${(i < ratingScore || (ratingNumber !== null && i <= ratingNumber)) ? 'gold' : 'gray'}`}} className="fa-solid fa-star CreateRating__star"></i>
                            ))
                        }
                    </div>
                </div>
                <div className="GroupPosts__btns">
                    <div onClick={publish} className="GroupPosts__btn GroupPosts__publish">
                        {
                            addingRating ? (
                                <span><i className="fa-solid fa-circle-notch"></i></span>
                            ) : (
                                <span>نشر</span>
                            )
                        }
                    </div>
                    <div onClick={e => {
                        const inputElem = inputRef?.current;
                        const commentElem = commentRef?.current;
                        if(!inputElem || !commentElem) return;
                        inputElem.innerText = '';
                        commentElem.innerText = '';
                        setRatingScore(0);
                        setRatingNumber(null);
                    }} className="GroupPosts__btn GroupPosts__cancel">
                        الغاء
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    addingRating: state.ratings.addingRating,
    lan: state.categories.lan,
    user: state.login.data,
    isAuthenticated: state.login.isAuthenticated,
})

export default connect(mapStateToProps, {addProviderRating, closePopup}) (CreateRating);