import React, { createContext,useEffect, useState } from "react";
// import axios from "axios";
import { createBrowserHistory } from 'history';

export default createBrowserHistory();
const baseURL = "http://localhost:3000/api"
export const AppContext = createContext();
export const AppProvider = (props) => {
    
    useEffect(() => {
       
       
    }, [])

    

    return <AppContext.Provider
        value= {{ }}
>{props.children}</AppContext.Provider>
}