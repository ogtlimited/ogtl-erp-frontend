import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../../Context/AppContext";
import axiosInstance from "../../../../services/api";
import Select from "react-select";
import $ from "jquery";

import { Link } from "react-router-dom";

const AddMembers = ({ campaign_info }) => {
  const [loading, setLoading] = useState(false);
  const { showAlert, allEmployees } = useAppContext();

  const { handleSubmit, reset } = useForm();
  const [empForm, setEmpForm] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const defaultOptions = campaign_info?.team_members?.map((e) => {
      return {
        label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
        value: e._id,
      };
    });
    setTeamMembers(defaultOptions);
  }, [campaign_info?.team_members]);

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
    setTeamMembers((prev) => [...prev, editorState]);
  };

  const removeFromList = (id) => {
    let newData = teamMembers.filter((team) => team.value !== id);
    setTeamMembers(newData);
  };

  const onSubmit = () => {
    let team_members = teamMembers.map((e) => e.value);
    let newData = {
      team_members,
    };

    setLoading(true);
    axiosInstance
      .patch(`/api/project/add-team-member/${campaign_info?._id}`, newData)
      .then((res) => {
        console.log("actual response", res.data);
        showAlert(true, "Team members added.", "alert alert-success");
        reset();
        $("#FormModalMembers").modal("toggle");
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
        id="FormModalMembers"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Add Team Members
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
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th className="col-4">Employees</th>
                        <th className="col-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers &&
                        teamMembers.map((emp, index) => (
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="employee">Employee</label>
                      <Select
                        options={empForm}
                        name="team_members"
                        onChange={(state) =>
                          onEditorStateChange(state, "team_members")
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
                          class="spinner-border spinner-border-sm"
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

export default AddMembers;
