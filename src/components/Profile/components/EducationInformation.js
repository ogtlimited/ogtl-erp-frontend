import React, { useReducer, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import tokenService from "../../../services/token.service";

const initialState = {
  educationalBackgrounds: [],
};

const educationalBackgroundsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        educationalBackgrounds: [
          action.educationalBackground,
          ...state.educationalBackgrounds,
        ],
      };
    case "REMOVE":
      return {
        ...state,
        educationalBackgrounds: state.educationalBackground.filter(
          (_, index) => index !== action.index
        ),
      };
    case "UPDATE":
      var educationalBackgroundCopy = [...state.educationalBackgrounds];
      educationalBackgroundCopy[action.index] = action.educationalBackground;
      return {
        ...state,
        educationalBackgrounds: educationalBackgroundCopy,
      };
    default:
      return {
        ...state,
        educationalBackgrounds: action.educationalBackgrounds,
      };
  }
};

const EducationInformation = ({
  education,
  handleChange,
  submitted,
  formValue,
  setFormValue,
}) => {
  const { id } = useParams();
  const user = tokenService.getUser();
  const [educationalBackgroundsState, educationalBackgroundsDispatch] =
    useReducer(educationalBackgroundsReducer, initialState);
  const { showAlert } = useAppContext();

  useEffect(() => {
    educationalBackgroundsDispatch({ educationalBackgrounds: education });
  }, [education]);

  useEffect(() => {
    if (submitted === true) {
      let newFormValue = {
        employee_id: id,
        ...formValue,
      };
      axiosInstance
        .post("/Education", newFormValue)
        .then((res) => {
          educationalBackgroundsDispatch({
            type: "ADD",
            educationalBackground: res?.data?.data,
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
    <>
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <h3 className="card-title">
            Education Information
            {id === user._id && (
              <Link
                className="edit-icon"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => handleChange("EmployeeEducation")}
              >
                <i className="fa fa-pencil"></i>
              </Link>
            )}
          </h3>
          <div className="experience-box">
            <ul className="experience-list">
              {educationalBackgroundsState?.educationalBackgrounds?.length >
              0 ? (
                educationalBackgroundsState?.educationalBackgrounds?.map(
                  (edu) => (
                    <li key={edu?._id}>
                      <div className="experience-user">
                        <div className="before-circle"></div>
                      </div>
                      <div className="experience-content">
                        <div className="timeline-content">
                          <a href="#/" className="name">
                            {edu?.school}
                          </a>
                          <div>{edu?.qualification}</div>
                          <span className="time">{edu?.year_of_passing}</span>
                        </div>
                      </div>
                    </li>
                  )
                )
              ) : (
                <div className="text-muted">Not Available</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationInformation;
