/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";

export const DepartmentSupervisorFormModal = ({
  mode,
  data,
  fetchAllDepartmentSupervisors,
}) => {
  const { selectLeaders, selectDepartments, showAlert, goToTop } =
    useAppContext();
  const { id } = useParams();
  const { title } = useParams();
  const [office, setOffice] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOffice(data);
  }, [data]);

  const cancelEvent = () => {
    setOffice(data);
  };

  const handleCreateDepartmentSupervisor = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/departments_supervisors.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            department_id: +id,
            supervisor_id: office.supervisor_id,
          },
        }
      );

      goToTop();
      showAlert(
        true,
        `${office?.supervisor_title} successfully added to ${title?.toUpperCase()} Department as a Supervisor`,
        "alert alert-success"
      );
      fetchAllDepartmentSupervisors();
      $("#DepartmentSupervisorFormModal").modal("toggle");

      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DepartmentSupervisorFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="DepartmentSupervisorFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Supervisor
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleCreateDepartmentSupervisor}>
                <div className="row">
                  {mode === "Edit" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="department_id">
                          Department
                        </label>
                        <Select
                          name="department_id"
                          options={selectDepartments}
                          value={{
                            label: office?.department_title,
                            value: office?.department_id,
                          }}
                          onChange={(e) =>
                            setOffice({
                              ...office,
                              department_id: e?.value,
                              department_title: e?.label,
                            })
                          }
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="department_id">
                          Department
                        </label>
                        <input
                          name="department_id"
                          type="text"
                          className="form-control"
                          value={title?.toUpperCase()}
                          readOnly
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="supervisor_id">Supervisor</label>
                      <Select
                        name="supervisor_id"
                        options={selectLeaders}
                        value={{
                          label: office?.supervisor_title,
                          value: office?.supervisor_id,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            supervisor_id: e?.value,
                            supervisor_title: e?.label,
                          })
                        }
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  {mode === "Add" && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={cancelEvent}
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
