import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from "../../../db/promotion.json";
import { AssetFormJson } from "../../../components/FormJSON/Assets/assets";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import tokenService from "../../../services/token.service";

const Asset = () => {
  const [template, setTemplate] = useState(AssetFormJson);
  const [editData, seteditData] = useState(null);
  const [data, setData] = useState([]);
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };

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

  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { allPurchaseOrders } = res.data.createEmployeeFormSelection;

      const AssetOpts = allPurchaseOrders?.map((e) => {
        return {
          label: `${e.productName}`,
          value: e._id,
        };
      });
      const finalForm = AssetFormJson.Fields.map((field) => {
        if (field.name === "assetName") {
          field.options = AssetOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: AssetFormJson.title,
        Fields: finalForm,
      });
      if(!loadSelect){
        setloadSelect(true)
      }
      console.log(template);
    });
  }, [loadSelect]);

  //create assets
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        let newFormValue = { ...formValue };
        console.log(newFormValue);
        axiosInstance
          .post("/api/assets", newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchAssets();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        formValue._id = editData._id;

        axiosInstance
          .patch("/api/assets/" + editData._id, formValue)
          .then((res) => {
            setFormValue(null);
            fetchAssets();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      }
    }
  }, [formValue, editData]);
  useEffect(() => {
    seteditData(clickedRow);
    return () => {
      seteditData(null);
    };
  }, [clickedRow, submitted]);

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

  const columns = [
    {
      dataField: "assetId",
      text: "Asset  Id",
      sort: true,
    },
    {
      dataField: "assetName.productName",
      text: "Asset name",
      sort: true,
    },
    {
      dataField: "serialNumber",
      text: "Serial Number",
      sort: true,
    },
    {
      dataField: "assetType",
      text: "Asset Type",
      sort: true,
    },
    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (val, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#FormModal"
              onClick={() => editRow(row)}
            >
              <i className="fa fa-pencil m-r-5"></i> Edit
            </a>
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Assets</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Assets</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            {loadSelect && 
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#FormModal"
              >
                <i className="fa fa-plus"></i> Add Assets
            
            </a>
            
            }
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      {loadSelect && 
        <FormModal2
          title="Create Assets"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />
      
      
      }
      <ConfirmModal
        title="Assets"
        selectedRow={selectedRow}
        deleteFunction={deleteAssets}
      />
    </>
  );
};

export default Asset;
