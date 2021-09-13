import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import LeavesTable from '../../../components/Tables/EmployeeTables/Leaves/LeaveTable'
import data from '../../../db/promotion.json'
import { AssetFormJson } from '../../../components/FormJSON/Assets/assets'
import FormModal from "../../../components/Modal/Modal";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";

const Asset = () => {
    const [template, setTemplate] = useState(AssetFormJson)
    const [editData, seteditData] = useState({});
    const [data, setData] = useState([]);
    const { combineRequest, showAlert } = useAppContext();
    const [formValue, setFormValue] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(()=>{
      setTemplate(AssetFormJson)
      
  })
    
    const fetchAssets = () => {
      axiosInstance
        .get("/api/assets")
        .then((res) => {
          console.log(res.data);
          setData(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      fetchAssets();
    }, []);


    //create assets
    useEffect(() => {
      console.log(submitted);
      if (submitted === true) {
        axiosInstance
          .post("/api/assets", formValue)
          .then((res) => {
            setSubmitted(false);
            fetchAssets();
            setData((prevData) => [...data, res.data.data]);
  
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error.response.data);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      }
      console.log(formValue);
    }, [submitted, formValue]);


    //delete asset
  const deleteAssets = (row) => {
    axiosInstance
      .delete(`/api/assets/${row._id}`)
      .then((res) => {
        console.log(res);
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  //update Assets
  const updateAssets = (row) => {
    axiosInstance
      .patch(`/api/assets/${row._id}`, row)
      .then((res) => {
        console.log(res);
        setData((prevData) => [...data, res.data.data]);
        fetchAssets();
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };


    
    


const columns = [
      {
        dataField: "assetId",
        text: "Asset Id",
        sort: true,
     
        
      },
        {
          dataField: "assetName",
          text: "Asset name",
          sort: true,
       
    
          
        },
        {
          dataField: "assigned_to",
          text: "Assigned to",
          sort: true,
        
        },
        {
          dataField: "manufacturer",
          text: "Manufacturer",
          sort: true,
        
          
        },
        {
          dataField: "supplier",
          text: "Supplier",
          sort: true,
       
        },
        {
          dataField: "model",
          text: "Model",
          sort: true,
       
          
        },
        {
            dataField: "serialNumber",
            text: "Serial Number",
            sort: true,
          
            
          },
          {
            dataField: "condition",
            text: "Condition",
            sort: true,
        
            
          },
          {
            dataField: "warranty",
            text: "Warranty",
            sort: true,
         
            
          },
          {
            dataField: "value",
            text: "Value",
            sort: true,
          
            
          },
          {
            dataField: "description",
            text: "Description",
            sort: true,
            formatter: (value, row) => <h2>{ReactHtmlParser(row?.description)}</h2>,
          
            
          },
        {
          dataField: "",
          text: "Action",
          sort: true,
          headerStyle: { minWidth: "150px" },
          formatter: (val, row) =>(
            <div className="dropdown dropdown-action text-right"><a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item" onClick={() => console.log(row)} href="#" data-toggle="modal"
                    data-target="#edit_employee">
                      <i className="fa fa-pencil m-r-5"></i> Edit</a>
                    <Link className="dropdown-item" onClick={() => deleteAssets(row)}
                    ><i className="fa fa-trash m-r-5"></i> Delete</Link></div>
            </div>
          )
        
        },
      ];
    return (
        <>
          <div className="page-header">
<div className="row align-items-center">
<div className="col">
<h3 className="page-title">Assets</h3>
<ul className="breadcrumb">
<li className="breadcrumb-item"><Link to="">Dashboard</Link></li>
<li className="breadcrumb-item active">Asset</li>
</ul>
</div>
<div className="col-auto float-right ml-auto">
<a href="#" className="btn add-btn" data-toggle="modal" data-target="#FormModal"><i className="fa fa-plus"></i> Add Asset</a>
</div>
</div>
</div> 
<div className="row">
<div className="col-sm-12">
    <LeavesTable
        data={data}
        columns={columns}
    />
</div> 
</div> 
<FormModal editData={editData} template={template}  setsubmitted={setSubmitted} setformValue={setFormValue}/>
        </>
    )




}

export default Asset;