import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axiosInstance from "../../../../services/api";
import { FieldArray } from "./field-array";

const defaultValues = {
  vendor: "",
  ref: "",
  bill_date: "",
  due_date: "",
  total_amount: "",
  paid: "",
  productItems: [],
};

export const BillForm = () => {
  const [formOptions, setFormOptions] = useState([]);
  const { register, handleSubmit, reset, control, setValue } = useForm({
    defaultValues,
  });

  useEffect(() => {
    axiosInstance
      .get("/api/vendor")
      .then((res) => {
        const formOp = res.data.data.map((e) => {
          return {
            label: e.company,
            value: e._id,
          };
        });
        setFormOptions(formOp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onEditorStateChange = (editorState, name) => {
    setValue(name, editorState);
  };
  const onSubmit = (data) => {
    console.log(data);
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
                Bills
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
                      <label htmlFor="vendor">Vendor</label>
                      <Select
                        options={formOptions}
                        defaultValue={defaultValues.vendor}
                        name="vendor"
                        onChange={(state) =>
                          onEditorStateChange(state.value, "vendor")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="ref">Ref</label>
                      <input
                        name="ref"
                        defaultValue={defaultValues.ref}
                        className="form-control "
                        type="text"
                        {...register("ref")}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bill_date">Bill Date</label>
                      <input
                        name="bill_date"
                        defaultValue={defaultValues.bill_date}
                        className="form-control "
                        type="date"
                        {...register("bill_date")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="total_amount">Total Amount</label>
                      <input
                        name="total_amount"
                        defaultValue={defaultValues.total_amount}
                        className="form-control "
                        type="number"
                        {...register("total_amount")}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="paid">Paid</label>
                      <input
                        name="paid"
                        defaultValue={defaultValues.paid}
                        className="form-control "
                        type="number"
                        {...register("paid")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="due_date">Due Date</label>
                      <input
                        name="due_date"
                        defaultValue={defaultValues.due_date}
                        className="form-control "
                        type="date"
                        {...register("due_date")}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Product Name</th>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Price</th>
                          <th>Units</th>
                          <th>Tax</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <FieldArray {...{ control, register, defaultValues }} />
                    </table>
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
                      Save
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
