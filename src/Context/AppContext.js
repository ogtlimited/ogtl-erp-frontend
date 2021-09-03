import React, { createContext,useEffect, useState } from "react";
import { createBrowserHistory } from 'history';
import axiosInstance from "../services/api";
import tokenService from "../services/token.service";

export default createBrowserHistory();
const baseURL = "http://localhost:3000"
const AppContext = createContext();
const AppProvider = (props) => {
    const [allEmployees, setallEmployees] = useState([])
    useEffect(() => {
       const token =  tokenService.getToken()
       console.log(token);
       if(token){
           fetchEmployee()

       }
    }, [])

    const fetchEmployee = (employee) =>{
        axiosInstance.get('/employees').then(e =>{
            console.log(e)
            // setallEmployees(e.data.employees)
        })
    }
    const fetchTypesShift = () =>{
        return axiosInstance.get('/shiftType')
    }
    const combineRequest = ()=>{
        return axiosInstance.get('/combine-employee-form')
    }

    return <AppContext.Provider
        value= {{ fetchTypesShift, combineRequest,setallEmployees, fetchEmployee}}
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