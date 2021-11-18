import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeavesTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import data from "../../../db/promotion.json";
import { AssetAssignmentForm } from "../../../components/FormJSON/Assets/asset-assignment";
import axiosInstance from "../../../services/api";
import { useAppContext } from "../../../Context/AppContext";
import ReactHtmlParser from "react-html-parser";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import FormModal2 from "../../../components/Modal/FormModal2";
import HelperService from "../../../services/helper";
import tokenService from "../../../services/token.service";

const AssetAssignment = () => {
  const [template, setTemplate] = useState(AssetAssignmentForm);
  const [editData, seteditData] = useState(null);
  const [data, setData] = useState([]);
  const { combineRequest, showAlert, setformUpdate } = useAppContext();
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [clickedRow, setclickedRow] = useState(null);
  const [loadSelect, setloadSelect] = useState(false);
  const user = tokenService.getUser();

  const editRow = (row) => {
    setformUpdate(row);
    setclickedRow(row);
  };

  const fetchAssetAssignments = () => {
    axiosInstance
      .get("/api/asset-assignment")
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAssetAssignments();
  }, []);

  useEffect(() => {
    combineRequest().then((res) => {
      console.log(res);
      const { employees, allAssets } = res.data.createEmployeeFormSelection;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e._id,
        };
      });
      const AssetOpts = allAssets?.map((e) => {
        return {
          label: e.assetName.productName,
          value: e._id,
        };
      });
      const finalForm = AssetAssignmentForm.Fields.map((field) => {
        if (field.name === "assigned_to") {
          field.options = employeeOpts;
          return field;
        } else if (field.name === "assetId") {
          field.options = AssetOpts;
          return field;
        }
        return field;
      });
      setTemplate({
        title: AssetAssignmentForm.title,
        Fields: finalForm,
      });
      if(!loadSelect){
        setloadSelect(true);
      }
      console.log(template);
    });
  }, [loadSelect]);

  //create assets
  useEffect(() => {
    if (formValue) {
      if (!editData) {
        let newFormValue = { ...formValue, assigned_by: user._id };
        console.log(newFormValue);
        axiosInstance
          .post("/api/asset-assignment", newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchAssetAssignments();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      } else {
        formValue._id = editData._id;
        let newFormValue = {
          ...formValue,
          assetId: formValue?.assetId?._id,
          assigned_to: formValue?.assigned_to?._id,
          assigned_by: user._id,
        };

        axiosInstance
          .patch("/api/asset-assignment/" + editData._id, newFormValue)
          .then((res) => {
            setFormValue(null);
            fetchAssetAssignments();
            showAlert(true, res.data.message, "alert alert-success");
          })
          .catch((error) => {
            console.log(error);
            setFormValue(null);
            showAlert(true, error.response.data.message, "alert alert-danger");
          });
      }
    }
  }, [formValue, editData, user._id]);
  useEffect(() => {
    seteditData(clickedRow);
    return () => {
      seteditData(null);
    };
  }, [clickedRow, submitted]);

  //delete asset
  const deleteAssets = (row) => {
    axiosInstance
      .delete(`/api/asset-assignment/${row._id}`)
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
        fetchAssetAssignments();
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "assetName.productName",
      text: "Asset name",
      sort: true,
      formatter: (value, row) => <h2>{row?.assetId?.assetName}</h2>,
    },
    {
      dataField: "assigned_to",
      text: "Assigned to",
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.assigned_to?.first_name} {row?.assigned_to?.last_name}
        </h2>
      ),
    },
    {
      dataField: "assigned_by",
      text: "Assigned By",
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.assigned_by?.first_name} {row?.assigned_by?.last_name}
        </h2>
      ),
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
            <Link
              className="dropdown-item"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </Link>
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
            <h3 className="page-title">Asset Assignment</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Asset Assignment</li>
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
                <i className="fa fa-plus"></i> Add Asset Assignment
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
      {
        loadSelect &&
        <FormModal2
          title="Create Asset Assignment"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(template.Fields)}
          setsubmitted={setSubmitted}
        />

      }
      <ConfirmModal
        title="Asset Assignment"
        selectedRow={selectedRow}
        deleteFunction={deleteAssets}
      />
    </>
  );
};

export default AssetAssignment;
