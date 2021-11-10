import React, { useReducer, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import tokenService from "../../../services/token.service";

const initialState = {
  emergencyContacts: [],
};

const emergencyContactReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        emergencyContacts: [
          action.emergencyContact,
          ...state.emergencyContacts,
        ],
      };
    case "REMOVE":
      return {
        ...state,
        emergencyContacts: state.emergencyContact.filter(
          (_, index) => index !== action.index
        ),
      };
    case "UPDATE":
      var emergencyContactCopy = [...state.emergencyContacts];
      emergencyContactCopy[action.index] = action.emergencyContact;
      return {
        ...state,
        emergencyContacts: emergencyContactCopy,
      };
    default:
      return {
        ...state,
        emergencyContacts: action.emergencyContacts,
      };
  }
};

const EmergencyContact = ({
  emergencyContact,
  submitted,
  handleChange,
  formValue,
  setFormValue,
}) => {
  const { id } = useParams();
  const user = tokenService.getUser();
  const [emergencyContactState, emergencyContactDispatch] = useReducer(
    emergencyContactReducer,
    initialState
  );

  const { showAlert } = useAppContext();

  useEffect(() => {
    emergencyContactDispatch({ emergencyContacts: emergencyContact });
  }, [emergencyContact]);

  useEffect(() => {
    if (submitted === true) {
      let newFormValue = {
        employee_id: id,
        ...formValue,
      };
      axiosInstance
        .post("/EmergencyContact", newFormValue)
        .then((res) => {
          emergencyContactDispatch({
            type: "ADD",
            emergencyContact: res?.data?.data,
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
            Emergency Contact{" "}
            {id === user._id && (
              <Link
                className="edit-icon"
                data-toggle="modal"
                data-target="#FormModal"
                onClick={() => handleChange("EmergencyContact")}
              >
                <i className="fa fa-pencil"></i>
              </Link>
            )}
          </h3>
          {emergencyContactState?.emergencyContacts?.length > 0 ? (
            emergencyContactState?.emergencyContacts?.map((contact) => (
              <>
                <ul className="personal-info" key={contact?._id}>
                  <li>
                    <div className="title">Name</div>
                    <div className="text">
                      {contact?.emergency_contact_name || "Not Available"}
                    </div>
                  </li>
                  <li>
                    <div className="title">Relationship</div>
                    <div className="text">
                      {contact?.relation || "Not Available"}
                    </div>
                  </li>
                  <li>
                    <div className="title">Phone </div>
                    <div className="text">
                      {contact?.emergency_phone || "Not Available"}
                    </div>
                  </li>
                </ul>
                <hr />
              </>
            ))
          ) : (
            <div className="text-muted">Not Available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmergencyContact;
