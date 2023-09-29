/** @format */

import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";
import { useParams } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";

export const DepartmentCampaignFormModal = ({
  mode,
  data,
  fetchAllDepartmentCampaigns,
}) => {
  const { selectCampaigns, selectDepartments, showAlert, goToTop } =
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

  const handleDepartmentCampaignAction = async (e) => {
    if (mode === "Add") {
      return handleCreateDepartmentCampaign(e);
    } else {
      return handleEditDepartmentCampaign(e);
    }
  };

  const handleCreateDepartmentCampaign = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.post(
        `/api/v1/departments_campaigns.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            operation_department_id: +id,
            operation_campaign_id: office.operation_campaign_id,
          },
        }
      );

      goToTop();
      showAlert(
        true,
        `${office?.campaign_title} Campaign successfully added to ${title} Department`,
        "alert alert-success"
      );
      fetchAllDepartmentCampaigns();
      $("#DepartmentCampaignFormModal").modal("toggle");

      setOffice(data);
      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DepartmentCampaignFormModal").modal("toggle");

      setLoading(false);
    }
  };

  const handleEditDepartmentCampaign = async (e) => {
    e.preventDefault();

    setLoading(true);
    const id = office.id;
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.patch(
        `/api/v1/departments/${id}.json`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
          payload: {
            title: office.title,
            leave_approval_level: +office.leave_approval_level,
          },
        }
      );

      goToTop();
      showAlert(true, `Department successfully updated`, "alert alert-success");
      fetchAllDepartmentCampaigns();
      $("#DepartmentFormModal").modal("toggle");

      setLoading(false);
    } catch (error) {
      const errorMsg = error?.response?.data?.errors;
      goToTop();
      showAlert(true, `${errorMsg}`, "alert alert-warning");
      $("#DepartmentFormModal").modal("toggle");

      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="DepartmentCampaignFormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                {mode} Campaign
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
              <form onSubmit={handleDepartmentCampaignAction}>
                <div className="row">
                  {mode === "Edit" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="operation_department_id">
                          Department
                        </label>
                        <Select
                          name="operation_department_id"
                          options={selectDepartments}
                          value={{
                            label: office?.department_title,
                            value: office?.operation_department_id,
                          }}
                          onChange={(e) =>
                            setOffice({
                              ...office,
                              operation_department_id: e?.value,
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
                        <label htmlFor="operation_department_id">
                          Department
                        </label>
                        <input
                          name="operation_department_id"
                          type="text"
                          className="form-control"
                          value={title}
                          readOnly
                        />
                      </div>
                    </div>
                  )}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="operation_campaign_id">Campaign</label>
                      <Select
                        name="operation_campaign_id"
                        options={selectCampaigns}
                        value={{
                          label: office?.campaign_title,
                          value: office?.operation_campaign_id,
                        }}
                        onChange={(e) =>
                          setOffice({
                            ...office,
                            operation_campaign_id: e?.value,
                            campaign_title: e?.label,
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
