import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";

const defaultValues = {
  customer: "",
  ref: "",
  invoice_date: "",
  due_date: "",
  paid: "",
  total_amount: "",
};

export const InvoiceForm = ({ fetchInvoice }) => {
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const { showAlert } = useAppContext();
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues,
  });

  const [productItems, setProductItems] = useState([
    {
      productId: "",
      rate: "",
      price: "",
      tax: "",
      units: "",
    },
  ]);

  const handleChange = (editorState, index) => {
    const values = [...productItems];
    values[index].productId = editorState._id;
    values[index].rate = editorState.rate;

    values[index].price = editorState.price;

    values[index].tax = editorState.tax;

    values[index].units = editorState.units;
    console.log(values);
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
      units: "",
    });
    setProductItems(values);
  };
  useEffect(() => {
    axiosInstance
      .get("/api/client")
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
  const onSubmit = (data) => {
    let productIds = productItems.map((prod) => prod.productId);
    let balance = 0;
    if (data.paid < data.total_amount) {
      balance = data.total_amount - data.paid;
    } else {
      balance = 0;
    }

    let newData = {
      ...data,
      balance,
      productItems: productIds,
    };
    setLoading(true);
    axiosInstance
      .post("/api/invoice", newData)
      .then((res) => {
        console.log(res);
        fetchInvoice();
        showAlert(true, res.data.message, "alert alert-success");
        reset();
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
                      <label htmlFor="customer">Customer</label>
                      <Select
                        options={formOptions}
                        defaultValue={defaultValues.customer}
                        name="customer"
                        onChange={(state) =>
                          onEditorStateChange(state.value, "customer")
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
                      <label htmlFor="invoice_date">Invoice Date</label>
                      <input
                        name="invoice_date"
                        defaultValue={defaultValues.invoice_date}
                        className="form-control "
                        type="date"
                        {...register("invoice_date")}
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="paid">Paid</label>
                      <input
                        name="paid"
                        defaultValue={defaultValues.paid}
                        className="form-control "
                        type="number"
                        {...register("paid", { valueAsNumber: true })}
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
                        {...register("total_amount", { valueAsNumber: true })}
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
                        <th className="col-2">Price</th>
                        <th className="col-1">Tax %</th>
                        <th className="col-2">Units</th>
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
                                // name="productId"
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
                                defaultValue={product?.units}
                                disabled
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
