import React, { createContext,useEffect, useState } from "react";
import { createBrowserHistory } from 'history';
import axiosInstance from "../services/api";
import tokenService from "../services/token.service";

export default createBrowserHistory();
const baseURL = "http://localhost:3000"
const AppContext = createContext();
const AppProvider = (props) => {
    const [allEmployees, setallEmployees] = useState([])
    const [showAlertMsg, setshowAlertMsg] = useState({
        state: false,
        msg: '',
        class: ''
    })
    useEffect(() => {console.log('alert message')}, [showAlertMsg])
    useEffect(() => {
       const token =  tokenService.getToken()
       if(token && allEmployees.length < 1){
           fetchEmployee()

       }
    }, [allEmployees])

    const fetchEmployee = (employee) =>{
        axiosInstance.get('/employees').then(e =>{
            setallEmployees(e.data.employees)
        })
    }
    const showAlert = (state, msg, className) =>{
       setshowAlertMsg({
           state: state,
           msg: msg,
           class: className
       })
       setTimeout(() => {
        setshowAlertMsg({
            state: '',
            msg: '',
            class: ''
        })
       }, 5000);
    }
    const fetchTypesShift = () =>{
        return axiosInstance.get('/shiftType')
    }
    const combineRequest = ()=>{
        return axiosInstance.get('/combine-employee-form')
    }

    return <AppContext.Provider
        value= {{ fetchTypesShift, 
        combineRequest,
        setallEmployees,allEmployees,
        showAlert, showAlertMsg,
         fetchEmployee}}
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