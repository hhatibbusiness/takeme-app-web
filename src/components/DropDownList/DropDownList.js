import React, {useEffect} from 'react';
import './DropDownList.css';
import {connect} from "react-redux";
import SpinnerComponent from "../Spinner/Spinner.Component";
import DropDownListItem from "./DropDownListItem/DropDownListItem";

const DropDownList = ({searchResults, loadingSearchResults, term, setInputFocus, inputRef}) => {
    useEffect(() => {
        // console.log(searchResults);
    }, [searchResults]);
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

const mapStateToProps = state => ({
    // searchResults: state.search.results,
    // loadingSearchResults: state.search.loadingSearchResults,
    // term: state.search.term
})

export default connect(mapStateToProps) (DropDownList);