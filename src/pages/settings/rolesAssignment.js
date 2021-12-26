/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useAppContext } from "../../Context/AppContext";
import FormModal2 from "../../components/Modal/FormModal2";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import HelperService from "../../services/helper";

import { roleAssignmentFormJson } from "../../components/FormJSON/settings/roleAssignment";

const RoleAssignment = () => {
  const [formValue, setFormValue] = useState(null);
  const [editData, seteditData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [template, settemplate] = useState({});
  const [roleOpts, setRoleOpts] = useState(null);
  const [unfiltered, setunfiltered] = useState([]);
  const [loadSelect, setloadSelect] = useState(false);

  const { showAlert, createRoleAssignment } = useAppContext();

  const create = () => {
    let initialValues = {};
    for (let i in template) {
      initialValues[i] = "";
      // console.log(i);
    }
    setFormValue(initialValues);
    seteditData(initialValues);
  };

  useEffect(() => {
    createRoleAssignment()
      .then((res) => {
        const { employees, roles } = res.data.createRoleAssignment;
        const employeeOpts = employees?.map((e) => {
          return {
            label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
            value: e?._id,
          };
        });
        const roleOpts = roles?.map((e) => {
          return {
            label: e.title,
            value: e?._id,
          };
        });
        setRoleOpts(employeeOpts);
        const finalForm = roleAssignmentFormJson.Fields.map((field) => {
          if (field.name === "_id") {
            field.options = employeeOpts;
            return field;
          } else if (field.name === "role") {
            field.options = roleOpts;
            return field;
          }
          return field;
        });
        settemplate({
          title: roleAssignmentFormJson.title,
          Fields: finalForm,
        });
        if (!loadSelect) {
          setloadSelect(true);
        }
        setData(employees);
        setunfiltered(employees);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [createRoleAssignment, loadSelect]);

  const handleClick = (i) => {
    if (i?.value === "All" || i === null) {
      setData(unfiltered);
    } else {
      const filt = unfiltered.filter((e) => i.label.includes(e.first_name));

      setData(filt);
    }
  };
  useEffect(() => {
    if (formValue) {
      axiosInstance
        .put("/employees/update-role/" + formValue._id, formValue)
        .then((res) => {
          setFormValue(null);
          console.log(res.data);
          showAlert(true, res?.data?.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          setFormValue(null);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue]);

  const columns = [
    {
      dataField: "employee",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "410px" },
      formatter: (value, row) => (
        <h2>
          {console.log("row", row)}
          {row?.first_name} {row?.middle_name} {row?.last_name}
        </h2>
      ),
    },

    {
      dataField: "role",
      text: "Role",
      sort: true,
      headerStyle: { minWidth: "350px" },
      formatter: (value, row) => <h2>{row?.role?.title || "Not Available"}</h2>,
    },
  ];
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Role Assignment List</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/">Employees</Link>
              </li>
              <li className="breadcrumb-item active">Role Assignment</li>
            </ul>
          </div>
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
              // onClick={() => create()}
            >
              Add Role
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-3 mb-2">
            <Select
              defaultValue={[]}
              onChange={handleClick}
              options={roleOpts}
              placeholder="Filter Employees"
              isClearable={true}
              style={{ display: "inline-block" }}
              // formatGroupLabel={formatGroupLabel}
            />
          </div>

          <LeavesTable data={data} columns={columns} />
        </div>
      </div>

      {loadSelect && (
        <FormModal2
          title="Add Role"
          editData={editData}
          setformValue={setFormValue}
          template={HelperService.formArrayToObject(
            roleAssignmentFormJson.Fields
          )}
          setsubmitted={setSubmitted}
        />
      )}
    </>
  );
};

export default RoleAssignment;
