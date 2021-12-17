import React, { useState, useEffect } from "react";
import { RoleFormJson } from "../FormJSON/Apps/role";
import FormModal2 from "../Modal/FormModal2";
import HelperService from "../../services/helper";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import ConfirmModal from "../Modal/ConfirmModal";

const DesignationList = ({
  setrole,
  allDesignation,
  fetchDesignation,
  setallRoles,
}) => {
  const [formValue, setFormValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [template, setTemplate] = useState(RoleFormJson);
  const [selectedRow, setSelectedRow] = useState(null);

  const [editData, seteditData] = useState({});
  const { showAlert } = useAppContext();

  const [activeId, setActiveId] = useState();

  useEffect(() => {
    if (allDesignation.length) {
      setActiveId(allDesignation[0]._id);
    }
  }, [allDesignation]);

  useEffect(() => {
    if (submitted) {
      axiosInstance
        .post("/api/role", formValue)
        .then((res) => {
          setSubmitted(false);
          setallRoles((prevData) => [...prevData, res.data.data]);
          fetchDesignation();

          showAlert(true, res.data?.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          setSubmitted(false);

          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
  }, [formValue]);

  const deleteRole = (id) => {
    axiosInstance
      .delete(`/api/role/${id}`)
      .then((res) => {
        setallRoles((prevData) => prevData.filter((pdata) => pdata._id !== id));
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  return (
    <>
      <div class="col-sm-4 col-md-4 col-lg-4 col-xl-3">
        <a
          href="#"
          class="btn btn-primary btn-block"
          data-toggle="modal"
          data-target="#FormModal"
        >
          <i class="fa fa-plus"></i> Add Roles
        </a>
        <div class="roles-menu">
          <ul>
            {allDesignation &&
              allDesignation.map((d) => (
                <li
                  onClick={() => {
                    setActiveId(d._id);
                    setrole(d);
                  }}
                  class={activeId === d._id ? "active" : ""}
                >
                  <a href="javascript:void(0);">
                    {d.title}
                    <span class="role-action">
                      <span
                        class="action-circle large"
                        data-toggle="modal"
                        data-target="#edit_role"
                      >
                        <i class="las la-pencil-alt"></i>
                      </span>
                      <span
                        class="action-circle large delete-btn"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => setSelectedRow(d._id)}
                      >
                        <i class="las la-trash-alt"></i>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <FormModal2
        title="Add Role"
        editData={editData}
        setformValue={setFormValue}
        template={HelperService.formArrayToObject(template.Fields)}
        setsubmitted={setSubmitted}
      />
      <ConfirmModal
        title="Role"
        selectedRow={selectedRow}
        deleteFunction={deleteRole}
      />
    </>
  );
};

export default DesignationList;
