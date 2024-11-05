import React, {useEffect, createContext, useContext, useState} from 'react';
import {useParams} from "react-router-dom";

const RouterParamsContext = createContext();

export const RouterParamsProvider = ({children}) => {
    const params = useParams(); // Get params from router
    const [routeParams, setRouteParams] = useState({});

    useEffect(() => {
        setRouteParams(prevParams => {
            // Shallow compare to avoid unnecessary updates
            if (JSON.stringify(prevParams) !== JSON.stringify(params)) {
                return params; // Update only if params have changed
            }
            return prevParams; // Don't trigger re-render if params are the same
        });
    }, [params]);

    return (
        <RouterParamsContext.Provider value={routeParams}>
            {children}
        </RouterParamsContext.Provider>
    );
};

export const useRouterParams = () => useContext(RouterParamsContext);