import React from 'react';
import './DropDownList.css';
import {connect} from "react-redux";
import SpinnerComponent from "../Spinner/Spinner.Component";
import DropDownListItem from "./DropDownListItem/DropDownListItem";

const DropDownList = ({searchResults, loadingSearchResults, term, setInputFocus, inputRef}) => {
    return (
        <>
            <div className={'DropDownList'}>
                {
                    loadingSearchResults ? (
                        <SpinnerComponent />
                    ) : (
                        <div className={'DropDownList__items'}>
                            {
                                searchResults?.map((result, i) => (
                                    <DropDownListItem inputRef={inputRef} setInputFocus={setInputFocus} term={term} result={result} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default connect(mapStateToProps) (DropDownList);