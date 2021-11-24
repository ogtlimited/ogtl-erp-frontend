import React, { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import tokenService from "../../../services/token.service";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import { canView } from "../../../services/canView";

const initialState = {
  histories: [],
};

const historiesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        histories: [action.history, ...state.histories],
      };
    case "REMOVE":
      return {
        ...state,
        histories: state.history.filter((_, index) => index !== action.index),
      };
    case "UPDATE":
      var historyCopy = [...state.histories];
      historyCopy[action.index] = action.history;
      return {
        ...state,
        histories: historyCopy,
      };
    default:
      return {
        ...state,
        histories: action.histories,
      };
  }
};

const History = ({
  handleChange,
  history,
  submitted,
  formValue,
  setFormValue,
}) => {
  const { id } = useParams();
  const user = tokenService.getUser();
  const [historyState, historyDispatch] = useReducer(
    historiesReducer,
    initialState
  );

  const { showAlert } = useAppContext();

  useEffect(() => {
    historyDispatch({ histories: history });
  }, [history]);

  useEffect(() => {
    if (submitted === true) {
      let newFormValue = {
        employee_id: id,
        ...formValue,
      };
      axiosInstance
        .post("/History", newFormValue)
        .then((res) => {
          historyDispatch({
            type: "ADD",
            history: res?.data?.data,
          });
          setFormValue(null);
          showAlert(true, res.data.message, "alert alert-success");
        })
        .catch((error) => {
          console.log(error);
          showAlert(true, error?.response?.data?.message, "alert alert-danger");
        });
    }
  }, [submitted, formValue, id]);

  return (
    <div className="card profile-box flex-fill">
      <div className="card-body">
        <h3 className="card-title">
          History
          {canView(user, "HR") && (
            <Link
              className="edit-icon"
              onClick={() => handleChange("History")}
              data-toggle="modal"
              data-target="#FormModal"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          )}
        </h3>
        <div className="table-responsive">
          <table className="table table-nowrap">
            <thead>
              <tr>
                <th>Branch</th>
                <th>Designation</th>
                <th>From Date</th>
                <th>To Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {historyState?.histories?.map((hist) => (
                <tr key={hist?._id}>
                  <td>{hist?.branch_id?.branch}</td>
                  <td>{hist?.designation_id?.designation}</td>
                  <td>
                    {hist?.from_date &&
                      moment(hist?.from_date).format("MMM Do, YYYY")}
                  </td>
                  <td>
                    {hist?.to_date &&
                      moment(hist?.to_date).format("MMM Do, YYYY")}
                  </td>
                  <td className="text-right">
                    {hist && (
                      <div className="dropdown dropdown-action">
                        <Link
                          aria-expanded="false"
                          data-toggle="dropdown"
                          className="action-icon dropdown-toggle"
                        >
                          <i
                            className="fa fa-ellipsis-v"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                          <Link className="dropdown-item">
                            <i className="fa fa-pencil m-r-5"></i>
                            Edit
                          </Link>
                          <Link className="dropdown-item">
                            <i className="fa fa-trash-o m-r-5"></i>
                            Delete
                          </Link>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
