import React, { useState, useEffect } from 'react'
import JobWidget from './JobWidget'
import RecruitmentPageHeader from './PageHeader'
import jobs from './job.json'
import { useParams } from 'react-router-dom';
import RightWidget from './RightWidget';
import config from '../../config.json'
import axios from 'axios'

import FormModal from '../../components/Modal/Modal';
import { jobAApplicationFormJSON } from '../../components/FormJSON/HR/recruitment/JobApplicant';
import JobModal from '../../components/Forms/JobModal';
import AlertSvg from '../../layouts/AlertSvg';

const Jobview = () => {
    const [template, settemplate] = useState(jobAApplicationFormJSON);
    const [submitted, setsubmitted] = useState(false);
    const [formValue, setformValue] = useState(null);
    const [showAlert, setshowAlert] = useState(false)
    let { id } = useParams();
    const [state, setstate] = useState({})
    const fetchJobOpening = () =>{

        axios.get(config.ApiUrl + '/api/jobOpening/' + id).then(res =>{
            console.log(res.data)
            setstate(res.data.data)
        })
    }
    useEffect(() => {
        fetchJobOpening()
    }, [])
    useEffect(() => {
        console.log(submitted);
        
        if (submitted === true) {
            console.log(formValue)
            return
          axios
            .post("/api/warningLetter", formValue)
            .then((res) => {
              setsubmitted(false);
            //   setData((prevData) => [...data, res.data.data]);
              
            //   showAlert(true, res.data.message, "alert alert-success");
            })
            .catch((error) => {
              console.log(error);
            //   showAlert(true, error.response.data.message, "alert alert-danger");
            });
        }
        console.log(formValue);
      }, [submitted, formValue]);
    return (
        <>
            <RecruitmentPageHeader />

            <div  class="row">
            <AlertSvg />
                
                <div  class="col-md-8">
                    <JobWidget state={state} />
                </div>
                <div  class="col-md-4">
                    <RightWidget state={state} />
                </div>
            </div>

            <JobModal
             
        />
        </>
    )
}

export default Jobview
