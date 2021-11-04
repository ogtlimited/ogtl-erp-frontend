import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import $ from "jquery";
import { useAppContext } from "../../Context/AppContext";
import axiosInstance from "../../services/api";

export const NotificationForm = ({ fetchNotifications, editData }) => {
  console.log("edit data", editData);
  const [loading, setLoading] = useState(false);
  const [modelOpts, setModelOpts] = useState([]);
  const [employeeOpts, setEmployeeOpts] = useState([]);

  const defaultValues = {
    document_name: editData?.document_name || "",
    subject: editData?.subject || "",
    send_alert_on: editData?.send_alert_on || "",
    sender: editData?.sender || "",
    disabled: editData?.disabled || "",
    receiver_role: [],
    message: editData?.message || "",
  };

  const { showAlert, combineRequest } = useAppContext();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });

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

  const onSubmit = (data) => {
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
        reset(defaultValues);
        $("#FormModal").modal("toggle");
      })
      .catch((error) => {
        showAlert(true, error.response.data.message, "alert alert-danger");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log("Default valuies", defaultValues);
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="document_name">Document Name</label>
                      <Select
                        options={modelOpts}
                        defaultValue={defaultValues.document_name}
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
                        defaultValue={defaultValues.subject}
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
                        defaultValue={defaultValues.send_alert_on}
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
                        defaultValue={defaultValues.sender}
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
                        defaultValue={defaultValues.disabled}
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
                        defaultValue={defaultValues.receiver_role}
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
                        defaultValue={defaultValues.message}
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
