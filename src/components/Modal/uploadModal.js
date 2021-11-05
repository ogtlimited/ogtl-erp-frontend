import React, {useState, useEffect} from 'react'
import axiosInstance from "../../services/api";
import Papa from "papaparse";
import helper from "../../services/helper";
import { object } from 'yup/lib/locale';
const UploadModal = ({fetchEmployee, settoggleModal, setuploading, setUploadSuccess }) => {
    let buttonRef = React.createRef()
    const [uploadState, setuploadState] = useState('Upload New Employees')
    const [fileName, setfileName] = useState('')
    const [invalid, setinvalid] = useState(false)
    const [data, setData] = useState([])
    const [path, setpath] = useState('/employees/bulk-upload')
    const updateState = (path, msg) =>{
        setpath(path)
        setuploadState(msg)
        setfileName('')
        setinvalid(false)
    }
    const onFileUpload = (e) =>{
        const files = e.target.files;
        console.log(files);
        if (files) {
          console.log(files[0]);
          setfileName(files[0]?.name)
          Papa.parse(files[0], {
            complete: function(results) {
              const jsonData = helper.arrayToJSONObject(results.data)
              console.log(path)
              console.log(Object.values(jsonData[0]).includes(undefined))
              if(Object.values(jsonData[jsonData.length-1]).includes(undefined)){
                setData(jsonData.slice(0,jsonData.length -1))
                // setinvalid(true)
              }else{
                setinvalid(false)
                setData(jsonData)
              }
              console.log("Finished:", results.data);
            }}
          )
        }
      }
    useEffect(() => {
       console.log(uploadState)
    }, [uploadState])

    const uploadData = () =>{
        console.log(data)
        setuploading(true)
        axiosInstance.post(path, data).then(res =>{
          console.log(res)
          settoggleModal(false)
          setuploading(false)
          buttonRef.click()
          fetchEmployee()
        }).catch(err => {
            console.log(err)
            buttonRef.click()
            settoggleModal(false)
        })
    }
    return (
        <div class="modal fade show" id="uploadModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        style={{display: 'block'}}
        aria-hidden="true" >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">{uploadState}</h5>
                <button ref={input => buttonRef = input} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <div class="row">
  <div class="col-4">
    <div class="nav flex-column nav-pills mt-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a onClick={()=> updateState("/employees/bulk-upload", "Upload New employees")} class="nav-link active mb-3" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">New User</a>
      <a onClick={()=> updateState("/EmergencyContact/bulk-upload", "Upload Emergency Contact")} class="nav-link mb-3" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-profile" aria-selected="false">Emergency Contacts</a>
      <a onClick={()=> updateState("/ContactDetails/bulk-upload", "Upload Contact Details")} class="nav-link mb-3" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-messages" aria-selected="false">Contact Details</a>
      <a onClick={()=> updateState("/PersonalDetails/bulk-upload", "Upload Personal Details")} class="nav-link mb-3" id="v-pills-personal-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-personal" aria-selected="false">Personal Details</a>
      <a onClick={()=> updateState("/SalaryDetails/bulk-upload", "Upload Salary Details")} class="nav-link mb-3" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-settings" aria-selected="false">Salary Details</a>
    </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="v-pills-tabContent">
      <label class="tab-pane fade upload-csv show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
      <input
        type="file"
        style={{display: 'none'}}
        accept=".csv,.xlsx,.xls"
        onChange={(e) => onFileUpload(e)}
      />
      <i style={{fontSize: '20px'}} className="fa fa-cloud-upload pr-4"></i>
          Click to  {uploadState}
          <p className="pt-3">{fileName}</p> 
          {invalid ? <small className="pt-3 text-danger">This file contains invalid fields</small>  : null}
        
      </label>
      {/* <label class="tab-pane fade upload-csv" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          Emergency Contact
      </label>
      <label class="tab-pane fade upload-csv" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
          Contact Details
      </label>
      <label class="tab-pane fade upload-csv" id="v-pills-personal" role="tabpanel" aria-labelledby="v-pills-personal-tab">
          Personal Details
      </label>
      <label class="tab-pane fade upload-csv" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
          Salary Details
      </label> */}
    </div>
  </div>
</div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick={() => uploadData()} type="button" class="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default UploadModal
