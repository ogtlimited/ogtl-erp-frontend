import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import $ from "jquery";

const defaultValues = {
  title: "",
  startDate: "",
  endDate: "",
  type: "",
  flagAlert: 0,
};

export const BudgetForm = ({ fetchInvoice }) => {
  const [loading, setLoading] = useState(false);
  const [expenseOptions, setExpenseOptions] = useState([]);
  const { showAlert } = useAppContext();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });

  const [expenseHeads, setExpenseHeads] = useState([
    {
      title: "",
      amount: "",
      departmentId: "",
      flagAlert: "",
    },
  ]);

  const typeOpts = [
    { label: "quarterly", value: "quarterly" },
    { label: "monthly", value: "monthly" },
    { label: "yearly", value: "yearly" },
  ];

  const handleChange = (editorState, index) => {
    const values = [...expenseHeads];
    values[index].title = editorState.title;
    values[index].amount = editorState.amount;
    values[index].departmentId = editorState.departmentId;
    values[index].flagAlert = editorState.flagAlert;

    console.log(values);
    setExpenseHeads(values);
  };
  const handleRemoveFields = (index) => {
    const values = [...expenseHeads];

    if (values.length > 1) {
      values.splice(index, 1);
      setExpenseHeads(values);
    }
  };
  const handleAddFields = () => {
    const values = [...expenseHeads];
    values.push({
      title: "",
      flagAlert: "",
      departmentId: "",
      amount: "",
    });
    setExpenseHeads(values);
  };

  useEffect(() => {
    axiosInstance
      .get("/api/expense-head-draft")
      .then((res) => {
        console.log(res.data.data);
        const prodOpt = res.data.data.map((e) => {
          return {
            label: e.title,
            value: e,
          };
        });

        setExpenseOptions(prodOpt);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onEditorStateChange = (editorState, name) => {
    setValue(name, editorState);
  };

  const onSubmit = (data) => {
    // const title = expenseHeads.map((prod) => prod.title);

    // const amount = expenseHeads.map((prod) => prod.amount);
    // const flagAlert = expenseHeads.map((prod) => prod.flagAlert);
    // const departmentId = expenseHeads.map((prod) => prod.departmentId);
    console.log("expenseeee", expenseHeads);
    let newData = {
      ...data,
      expenseHeads,
      //   expenseHeads: [title, amount, flagAlert, departmentId],
    };
    console.log("letsseee", expenseHeads);
    setLoading(true);
    axiosInstance
      .post("/api/budget", newData)
      .then((res) => {
        console.log(res);
        fetchInvoice();
        showAlert(true, res.data.message, "alert alert-success");
        reset();
        $("#FormModal").modal("toggle");
      })
      .catch((error) => {
        console.log(error);
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
        id="FormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="FormModalLabel">
                Invoices
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
                      <label htmlFor="title">Title</label>
                      <input
                        name="title"
                        defaultValue={defaultValues.title}
                        className="form-control "
                        type="text"
                        {...register("title")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        name="startDate"
                        defaultValue={defaultValues.startDate}
                        className="form-control "
                        type="date"
                        {...register("startDate")}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="endDate">Due Date</label>
                      <input
                        name="endDate"
                        defaultValue={defaultValues.endDate}
                        className="form-control "
                        type="date"
                        {...register("endDate")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="type">Type</label>
                      <Select
                        options={typeOpts}
                        onChange={(state) =>
                          onEditorStateChange(state.value, "type")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="flagAlert">Flag Alert</label>
                      <input
                        name="flagAlert"
                        defaultValue={defaultValues.flagAlert}
                        className="form-control "
                        type="number"
                        {...register("flagAlert", { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th className="col-4">Expense Heads</th>
                        <th className="col-1">Department</th>
                        <th className="col-1">Amount</th>
                        <th className="col-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenseHeads &&
                        expenseHeads.map((product, index) => (
                          <tr>
                            <th scope="row">
                              <Select
                                options={expenseOptions}
                                // defaultValue={defaultValues.expenseHeads}
                                // name="productId"
                                onChange={(state) =>
                                  handleChange(state.value, index)
                                }
                              />
                            </th>

                            <td>
                              <input
                                name="department"
                                className="form-control"
                                type="text"
                                defaultValue={product?.departmentId?.department}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                name="amount"
                                className="form-control"
                                type="text"
                                onChange={(e) => {
                                  let newValue = {
                                    ...product,
                                    title: product.title,
                                    amount: parseInt(e.target.value),
                                  };
                                  handleChange(newValue, index);
                                }}
                              />
                            </td>

                            <td>
                              <Link
                                className="edit-icon ml-2  text-center pos-relative"
                                style={{
                                  paddingLeft: "2px",
                                  left: "-16px",
                                  top: "10px",
                                }}
                                onClick={() => handleRemoveFields(index)}
                              >
                                <i
                                  class="las la-minus"
                                  style={{ fontSize: "21px" }}
                                ></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                    <tfoot className="d-flex">
                      <Link
                        className="edit-icon ml-2 mt-3  text-center pos-relative"
                        style={{ paddingLeft: "2px" }}
                        onClick={handleAddFields}
                      >
                        <i class="las la-plus" style={{ fontSize: "21px" }}></i>
                      </Link>
                    </tfoot>
                  </table>
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
