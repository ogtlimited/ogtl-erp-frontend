import React, { createContext,useEffect, useState } from "react";
// import axios from "axios";
import { createBrowserHistory } from 'history';

export default createBrowserHistory();
const baseURL = "http://localhost:3000/api"
const AppContext = createContext();
const AppProvider = (props) => {
    
    useEffect(() => {
       
       
    }, [])

    

    return <AppContext.Provider
        value= {{ }}
>{props.children}</AppContext.Provider>
}

function useAppContext() {
    const context = React.useContext(AppContext)
    if(context === undefined){
        throw new Error("useAppContext must be within an AppProvider")
    }
    return context
}

export {AppProvider, useAppContext}