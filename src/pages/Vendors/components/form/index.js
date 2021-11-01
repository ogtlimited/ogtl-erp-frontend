import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useAppContext } from "../../../../Context/AppContext";
import axiosInstance from "../../../../services/api";
import $ from "jquery";

const defaultValues = {
  vendor: "",
  units: "",
  bill_date: "",
  due_date: "",
  total_amount: "",
};

export const BillForm = ({ fetchBills }) => {
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [unit, setunit] = useState(1);
  const { showAlert } = useAppContext();
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues,
  });

  const [productItems, setProductItems] = useState([
    {
      productId: "",
      rate: "",
      price: "",
      tax: "",
      total: "",
      units: "",
    },
  ]);
  // const getUnits = watch("units");
  // console.log("unittttttssssssssssssss", getUnits);

  const handleChange = (editorState, index) => {
    console.log(editorState, index)
    // return
    const values = [...productItems];
    values[index].productId = editorState._id;
    values[index].rate = editorState.rate;

    values[index].price = editorState.price;

    values[index].tax = editorState.tax;

    let cost = editorState.rate * editorState.price * editorState.units;
    let tax = (editorState.tax / 100) * cost;
    let total = cost + tax;
    values[index].total = total;
    console.log("edit", editorState, cost);
    setProductItems(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...productItems];

    if (values.length > 1) {
      values.splice(index, 1);
      setProductItems(values);
    }
  };
  const handleAddFields = () => {
    const values = [...productItems];
    values.push({
      productId: "",
      rate: "",
      price: "",
      tax: "",
      total: "",
      units: "",
    });
    setProductItems(values);
  };
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

  useEffect(() => {
    axiosInstance
      .get("/api/product-service")
      .then((res) => {
        console.log(res.data.data);
        const prodOpt = res.data.data.map((e) => {
          return {
            label: e.product,
            value: e,
          };
        });

        setProductOptions(prodOpt);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onEditorStateChange = (editorState, name) => {
    setValue(name, editorState);
  };

  //calculate the total amount
  useEffect(() => {
    const result = productItems.reduce((sum, { total }) => sum + total, 0);
    setValue("total_amount", result);
  }, [productItems, setValue]);

  const onSubmit = (data) => {
    let productIds = productItems.map((prod) => prod.productId);
    let balance = 0;
    let newData = {
      ...data,
      balance,
      productItems: productIds,
    };
    setLoading(true);
    axiosInstance
      .post("/api/bills", newData)
      .then((res) => {
        fetchBills();
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
                      <label htmlFor="total_amount">Total Amount</label>

                      <input
                        name="total_amount"
                        defaultValue={defaultValues.total_amount}
                        className="form-control "
                        type="number"
                        disabled
                        {...register("total_amount", { valueAsNumber: true })}
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
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th className="col-4">Product/Service</th>

                        <th className="col-1">Rate</th>
                        <th className="col-1">Price</th>
                        <th className="col-1">Tax %</th>
                        <th className="col-1">Units</th>
                        <th className="col-2">Total</th>
                        <th className="col-1">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productItems &&
                        productItems.map((product, index) => (
                          <tr>
                            <th scope="row">
                              <Select
                                options={productOptions}
                                // defaultValue={defaultValues.productItems}
                                // name="product"
                                // {...register("product")}

                                onChange={(state) =>
                                  handleChange(state.value, index)
                                }
                              />
                            </th>
                            <input
                              name="productId"
                              className="form-control"
                              type="text"
                              defaultValue={product?._id}
                              disabled
                              hidden
                            />
                            <td>
                              <input
                                name="rate"
                                className="form-control"
                                type="text"
                                defaultValue={product?.rate}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                name="price"
                                className="form-control"
                                type="text"
                                defaultValue={product?.price}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                name="tax"
                                className="form-control"
                                type="text"
                                defaultValue={product?.tax}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                name="units"
                                className="form-control"
                                type="text"
                                onChange={(e) => {
                                  let newValue = {
                                    ...product,
                                    units: parseInt(e.target.value)
                                  }
                                  handleChange(newValue, index)
                                }}
                                // {...register("units")}
                                // defaultValue={product.units}
                              />
                            </td>
                            <td>
                              <input
                                name="total"
                                className="form-control"
                                type="text"
                                disabled
                                defaultValue={product.total}
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
