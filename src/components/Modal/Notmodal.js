import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

export const NotForm = ({ fetchNotifications, editData }) => {
  const [loading, setLoading] = useState(false);
  const [modelOpts, setModelOpts] = useState([]);
  const [employeeOpts, setEmployeeOpts] = useState([]);
  //   const [formValue, setFormValue] = useState(null);
  const isAddMode = !editData?._id;

  const { showAlert, combineRequest } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
  } = useForm();

  useEffect(() => {
    axiosInstance
      .get("/api/notification/models/all")
      .then((res) => {
        const modelOpts = res.data.data.map((e) => {
          return {
            label: e,
            value: e,
          };
        });

        setModelOpts(modelOpts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    combineRequest().then((res) => {
      const { employees } = res.data.createEmployeeFormSelection;
      const employeeOpts = employees?.map((e) => {
        return {
          label: `${e.first_name} ${e.last_name}`,
          value: e.company_email,
        };
      });
      setEmployeeOpts(employeeOpts);
    });
  }, []);

  const onEditorStateChange = (editorState, name) => {
    setValue(name, editorState);
  };

  function onSubmit(data) {
    return isAddMode ? createNot(data) : updateNot(editData?._id, data);
  }
  const createNot = (data) => {
    let receiver_role = data.receiver_role.map((dt) => dt.value);
    let newData = {
      receiver_role,
      document_name: data.document_name,
      subject: data.subject,
      send_alert_on: data.send_alert_on,
      sender: data.sender,
      disabled: data.disabled === "true" ? true : false,
      message: data.message,
    };
    setLoading(true);
    axiosInstance
      .post("/api/notification", newData)
      .then((res) => {
        fetchNotifications();
        showAlert(true, res.data.message, "alert alert-success");
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
  const updateNot = (id, data) => {
    let receiver_role = data.receiver_role.map((dt) => dt.value);
    let newData = {
      receiver_role,
      document_name: data.document_name,
      subject: data.subject,
      send_alert_on: data.send_alert_on,
      sender: data.sender,
      disabled: data.disabled === "true" ? true : false,
      message: data.message,
    };
    setLoading(true);
    axiosInstance
      .put(`/api/notification/${id}`, newData)
      .then((res) => {
        fetchNotifications();
        showAlert(true, res.data.message, "alert alert-success");
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

  useEffect(() => {
    const fields = [
      "document_name",
      "subject",
      "send_alert_on",
      "sender",
      "disabled",
      "receiver_role",
      "message",
    ];
    if (!isAddMode) {
      // get user and set form fields

      fields.forEach((field) => setValue(field, editData[field]));
      //   setFormValue(editData);
    } else {
      fields.forEach((field) => setValue(field, ""));
      //   setFormValue(null);
    }
  }, [editData, isAddMode]);

  return (
    <>
      <div
        className="modal fade"
        id="FormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Notifications
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
              <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="document_name">Document Name</label>
                      <Select
                        options={modelOpts}
                        name="document_name"
                        onChange={(state) =>
                          onEditorStateChange(state.value, "document_name")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        name="subject"
                        className="form-control "
                        type="text"
                        {...register("subject")}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="send_alert_on">Send Alert On</label>
                      <select
                        name="send_alert_on"
                        {...register("send_alert_on")}
                        className="form-control "
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        <option value="SAVE">SAVE</option>
                        <option value="UPDATE">UPDATE</option>
                        <option value="DELETE">DELETE</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="sender">Sender</label>
                      <select
                        name="sender"
                        {...register("sender")}
                        className="form-control "
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        <option value="hr@outsourceglobal.com">
                          hr@outsourceglobal.com
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="disabled">Status</label>
                      <select
                        name="disabled"
                        {...register("disabled")}
                        className="form-control "
                      >
                        <option value="" disabled>
                          Choose
                        </option>
                        <option value={true}>Disabled</option>
                        <option value={false}>Enabled</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="receiver_role">Recipients</label>
                      <Select
                        options={employeeOpts}
                        name="receiver_role"
                        isMulti
                        onChange={(state) =>
                          onEditorStateChange(state, "receiver_role")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        name="message"
                        className="form-control "
                        {...register("message")}
                      ></textarea>
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
