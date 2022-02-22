import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../../Context/AppContext";
import axiosInstance from "../../../../services/api";
import Select from "react-select";
import { Link } from "react-router-dom";
import $ from "jquery";
import "../../campaign.css";

const AddTeam = ({ campaign_info }) => {
  const [loading, setLoading] = useState(false);
  const { showAlert, allEmployees } = useAppContext();

  const { handleSubmit, reset } = useForm();
  const [empForm, setEmpForm] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);

  useEffect(() => {
    const defaultOptions = campaign_info?.team_leads?.map((e) => {
      return {
        label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
        value: e._id,
      };
    });
    setTeamLeads(defaultOptions);
  }, [campaign_info?.team_leads]);

  useEffect(() => {
    const emploOptions = allEmployees.map((e) => {
      return {
        label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
        value: e._id,
      };
    });
    setEmpForm(emploOptions);
  }, [allEmployees]);

  const onEditorStateChange = (editorState, name) => {
    setTeamLeads((prev) => [...prev, editorState]);
  };

  const removeFromList = (id) => {
    let newData = teamLeads.filter((team) => team.value !== id);
    setTeamLeads(newData);
  };

  const onSubmit = () => {
    let team_leads = teamLeads.map((e) => e.value);
    let newData = {
      team_leads,
    };

    setLoading(true);
    axiosInstance
      .patch(`/api/project/add-team-lead/${campaign_info?._id}`, newData)
      .then((res) => {
        console.log("actual response", res.data);
        showAlert(true, "Team leads added.", "alert alert-success");
        reset();
        $("#FormModal").modal("toggle");
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, "alert alert-danger");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="FormModalLead"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Add Team Leads
              </h5>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="col-4">Employees</th>
                          <th className="col-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {teamLeads &&
                          teamLeads.map((emp, index) => (
                            <tr key={index}>
                              <td>
                                <h2>{emp.label}</h2>
                              </td>
                              <td>
                                <Link
                                  className=" ml-2  text-center pos-relative"
                                  onClick={() => removeFromList(emp.value)}
                                >
                                  <i
                                    className="las la-minus"
                                    style={{ fontSize: "21px" }}
                                  ></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="employee">Employee</label>
                      <Select
                        options={empForm}
                        name="team_leads"
                        onChange={(state) =>
                          onEditorStateChange(state, "team_leads")
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeam;
