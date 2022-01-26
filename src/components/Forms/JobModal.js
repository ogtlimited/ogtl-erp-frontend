import React, {useState} from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import config from '../../config.json'
import { useParams } from 'react-router-dom';
import success from '../../assets/img/success.svg'
const JobModal = () => {
    const [id, setid] = useState(useParams())
    const FILE_SIZE = 160 * 10240;
    const [showProgress, setshowProgress] = useState(false)
    const [submitted, setsubmitted] = useState(false)
    const [progress, setprogress] = useState(10)
    const [fileName, setfileName] = useState('')
    const [afterSuccess, setafterSuccess] = useState(false)
    const [header, setheader] = useState('Add Your Details')
    const handleUpload = (e, setFieldValue) =>{
        console.log(id)
        setprogress(65)
        setshowProgress(true)
        let formdata = new FormData();
        let file = e.target.files[0]
        console.log(file)
        setfileName(file.name)
       
        formdata.append("job_id", id.id);
        formdata.append("document", file);
        axios.post(config.ApiUrl +'/api/job-document',formdata ).then(res =>{
            console.log(res)
            let path = res.data.data.file_path
            setFieldValue("resume_attachment", path)
            setprogress(100)

        })
    }
    const handleSubmit = (e, field) =>{
        console.log(field)
        // setprogress(65)
        setsubmitted(true)
        let obj = {
            ...field,
            job_opening_id: id.id
        }
        axios.post(config.ApiUrl +'/api/jobApplicant',obj ).then(res =>{
            console.log(res)
            setsubmitted(false)
            setafterSuccess(true)
            setheader('Your Application has been submitted sucessfully')
            setTimeout(() => {
                setafterSuccess(false)
                document.getElementById("closeBtn").click()
            }, 4000);

        })
    }

    const SUPPORTED_FORMATS = [
      "application/pdf",
      "application/msword",
    ];
    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                middle_name: '',
                email_address: '',
                resume_attachment: '',
                cover_letter: '',
                video_attachment: '',
                application_source: '',
                job_opening_id: id.id
            }}
            validationSchema={Yup.object().shape({
                first_name: Yup.string()
                    .required('First Name is required'),
                last_name: Yup.string()
                    .required('Last Name is required'),
                email_address: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                resume_attachment:  Yup
                .mixed()
                .required("A file is required")
                // .test(
                //   "fileSize",
                //   "File too large",
                //   value => value && value.size <= FILE_SIZE
                // )
                // .test(
                //   "fileFormat",
                //   "Unsupported Format",
                //   value => value && SUPPORTED_FORMATS.includes(value.type)
                // )
            })}
            onSubmit={fields => {
                handleSubmit(null, fields)
                console.log('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
            }}
            render={({ errors, status, touched, setFieldValue }) => (
                <div
                class="modal custom-modal fade show"
                id="apply_job"
                role="dialog"
                aria-modal="true"
              
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">{header}</h5>
                      <button
                        id="closeBtn"
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div class="modal-body">
                        { !afterSuccess ?
                      <Form>
                        <div class="form-group row">
                        <div class="col-md-6">
                        <label htmlFor="first_name">First Name</label>
                        <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                       
                        </div>
                        <div class="col-md-6">
                        <label htmlFor="last_name">Last Name</label>
                        <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                       
                        </div>

                        </div>
                        <div class="form-group row">
                        <div class="col-md-6">
                            <label>Middle Name</label>
                            <Field name="middle_name" type="text" className='form-control'  />
                        </div>
                        <div class="col-md-6">
                        <label htmlFor="email_address">Email</label>
                            <Field name="email_address" type="text" className={'form-control' + (errors.email_address && touched.email_address ? ' is-invalid' : '')} />
                            <ErrorMessage name="email_address" component="div" className="invalid-feedback" />
                       
                        </div>

                        </div>
 
                        <div class="form-group">
                          <label>Cover Letter</label>
                          <Field component="textarea" rows="4" name="cover_letter" class="form-control"></Field>
                        </div>
                        <div class="form-group">
                          <label>Upload your CV</label>
                          <div class="custom-file">
                            <Field type="file" name="resume_attachment" value={undefined} onChange={(e) => handleUpload(e, setFieldValue) } class={"custom-file-input" +  (errors.resume_attachment && touched.resume_attachment ? ' is-invalid' : '')} id="resume_attachment" />
                            <label class="custom-file-label" for="resume_attachment">
                              {fileName.length ? fileName : 'Choose file'}
                            
                            </label>
                            {showProgress && 
                                        <div class="progress mt-1" style={{height: "3px"}}>
            <div class="progress-bar" role="progressbar" style={{width: progress + "%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
                            
                            }
                            <ErrorMessage name="resume_attachment" component="div" className="invalid-feedback" />
                       
                          </div>
                        </div>
                        <div class="submit-section">
                          <button type="submit" class="btn btn-primary submit-btn">
                              {/* Submit */}
                              {submitted ? <div class="spinner-grow" role="status"></div> : 'Submit' }
                              
                        </button>
                        </div>
                      </Form>
                      : <div className="d-flex row justify-content-center p-5 m-5"> <img style={{width: '100px', alignSelf: 'center'}} src={success} /></div>}
                    </div>
                  </div>
                </div>
              </div>
            )}
        />
    )
};

export default JobModal;
