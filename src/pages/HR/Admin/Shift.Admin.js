/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import FormModal from "../../../components/Modal/Modal";
import {shiftTypeFormJson} from "../../../components/FormJSON/HR/shift/ShiftType";
import {useAppContext} from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";

const ShiftAdmin = () => {
    const [formValue, setFormValue] = useState({})

    const [submitted, setSubmitted] = useState(false)
    const [data,setData] = useState([])

    const {fetchTypesShift,showAlert}  = useAppContext()

    useEffect(()=>{
        fetchTypesShift().then(res =>{
            console.log("Shift types response",res)
            setData(res.data.data)
        }).catch(error =>{
            console.log(error)
        })
    },[])

    //create shift
    useEffect(() => {
        console.log(submitted)
        if(submitted === true){
            axiosInstance.post('/api/shiftType', formValue).then(res =>{
                setSubmitted(false);
                setData(prevData => [...data, res.data.data])
                fetchTypesShift()
                showAlert(true,res.data.message,'alert alert-success')
            }).catch(error =>{
                console.log(error)
                showAlert(true,error.response.data.message,'alert alert-danger')
            })
        }
        console.log(formValue)
    }, [submitted,formValue])

    //delete shift
    const deleteShift = (row) =>{
        axiosInstance.delete(`/api/shiftType/${row._id}`).then(res =>{
            console.log(res)
            fetchTypesShift()
            setData(prevData => prevData.filter(pdata => pdata._id !== row._id))
            showAlert(true,res.data.message,'alert alert-success')
        }).catch(error =>{
            console.log(error)
            showAlert(true,error.response.data.message,'alert alert-danger')
        })
    }

    //update shift
    const updateShift = (row) =>{
        axiosInstance.patch(`/api/shiftType/${row._id}`,row).then(res =>{
            console.log(res)
            setData(prevData => [...data, res.data.data])
            fetchTypesShift()
            showAlert(true,res.data.message,'alert alert-success')
        }).catch(error =>{
            console.log(error)
            showAlert(true,error.response.data.message,'alert alert-danger')
        })
    }



    const columns = [
        {
          dataField: "shift_name",
          text: "Shift Name",
          sort: true,
          headerStyle: { minWidth: "350px" },
         
        },

        {
          dataField: "start_time",
          text: "Start time",
          sort: true,
          headerStyle: { minWidth: "200px" },
          
        },
        {
            dataField: "end_time",
            text: "End time",
            sort: true,
            headerStyle: { minWidth: "200px" },
          },

        {
            dataField: "",
            text: "Action",
            sort: true,
            headerStyle: {minWidth: "70px", textAlign:"left"},
            formatter: (value, row) => (
                <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                                    aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" onClick={() => updateShift(row)} href="#" data-toggle="modal"
                                                                      data-target="#FormModal"><i className="fa fa-pencil m-r-5"></i> Edit</a>
                        <Link className="dropdown-item" onClick={() => deleteShift(row)} ><i className="fa fa-trash m-r-5"></i> Delete</Link>
                     </div>
                </div>
            )    ,
        },

      ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Shift List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Shift List</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add Shifts
            </a>
          </div>
        </div>
      </div>
      <div className="row">
          <div className="col-12">
              <LeavesTable
                data={data}
                columns={columns}
              />
          </div>
      </div>
        <FormModal setformValue={setFormValue} template={shiftTypeFormJson} setsubmitted={setSubmitted} />
    </>
  );
};

export default ShiftAdmin;
