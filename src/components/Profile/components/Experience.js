import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import tokenService from "../../../services/token.service";

const initialState = {
  experiences: [],
};

const experiencesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        experiences: [action.experience, ...state.experiences],
      };
    case "REMOVE":
      return {
        ...state,
        experiences: state.experience.filter(
          (_, index) => index !== action.index
        ),
      };
    case "UPDATE":
      var experienceCopy = [...state.experiences];
      experienceCopy[action.index] = action.experience;
      return {
        ...state,
        experiences: experienceCopy,
      };
    default:
      return {
        ...state,
        experiences: action.experiences,
      };
  }
};

const Experience = ({
  handleChange,
  workExperience,
  submitted,
  formValue,
  setFormValue,
}) => {
  const { id } = useParams();
  const user = tokenService.getUser();
  const [experiencesState, experiencesDispatch] = useReducer(
    experiencesReducer,
    initialState
  );

  const { showAlert } = useAppContext();

  useEffect(() => {
    experiencesDispatch({ experiences: workExperience });
  }, [workExperience]);

  useEffect(() => {
    if (submitted === true) {
      let newFormValue = {
        employee_id: id,
        ...formValue,
      };

      axiosInstance
        .post("/WorkExperience", newFormValue)
        .then((res) => {
          experiencesDispatch({
            type: "ADD",
            experience: res?.data?.data,
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
          Experience{" "}
          {id === user._id && (
            <Link
              className="edit-icon"
              data-toggle="modal"
              onClick={() => handleChange("WorkExperience")}
              data-target="#FormModal"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          )}
        </h3>
        <div className="experience-box">
          <ul className="experience-list">
            {experiencesState?.experiences?.length > 0 ? (
              experiencesState?.experiences?.map((work) => (
                <li key={work?._id}>
                  <div className="experience-user">
                    <div className="before-circle"></div>
                  </div>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <a href="#/" className="name">
                        {work?.designation}
                      </a>
                      <span className="time">{work?.company}</span>
                      <span className="time">{work?.address}</span>
                      <span className="time">{work?.salary}</span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-muted">Not Available</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
