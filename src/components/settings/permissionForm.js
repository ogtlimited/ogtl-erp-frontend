import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage, Field, getIn } from "formik";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
const initialValues = {
  account: {
    read: false,
    create: false,
    update: false,
    delete: false,
  },
  projects: {
    read: false,
    create: false,
    update: false,
    delete: false,
  },
  facility: {
    read: false,
    create: false,
    update: false,
    delete: false,
  },
  hr: {
    read: false,
    create: false,
    update: false,
    delete: false,
  },
  it: {
    read: false,
    create: false,
    update: false,
    delete: false,
  },
  title: ""
};
const PermissionForm = ({ role, setupdated }) => {
  const { showAlert } = useAppContext();
  const [defaultValues, setDefaultValues] = useState(initialValues);
  useEffect(() => {
    if (Object.keys(role).length > 0) {
      setDefaultValues(role)
    }
  }, [defaultValues, role]);

  return (
    <>
      <div class="col-sm-8 col-md-8 col-lg-8 col-xl-9">
        <h6 class="card-title m-b-20">
          Module Access {role && "For " + role.title}
          
        </h6>
        <div class="table-responsive">
          <Formik
            initialValues={defaultValues}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                axiosInstance
                  .put(`/api/role/${role._id}`, values)
                  .then((res) => {
                    // console.log(res);
                    // setupdated(true)
                    showAlert(true, res.data?.message, "alert alert-success");
                  })
                  .catch((error) => {
                    console.log(error)
                    showAlert(
                      true,
                      error?.response?.data?.message,
                      "alert alert-danger"
                    );
                  });
                setSubmitting(false);
              }, 500);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <form className="card px-4 pt-4" onSubmit={handleSubmit}>
                  <table class="table table-striped custom-table card-body">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th class="text-center">Read</th>
                        <th class="text-center">Write</th>
                        <th class="text-center">Create</th>
                        <th class="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Accounts</td>
                        <td class="text-center">
                          <Field name="account.read" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="account.create" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="account.update" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="account.delete" type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Campaign / Project</td>
                        <td class="text-center">
                          <Field name="projects.read" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="projects.create" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="projects.update" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="projects.delete" type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Facility</td>
                        <td class="text-center">
                          <Field name="facility.read" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="facility.create" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="facility.update" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="facility.delete" type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>HR</td>
                        <td class="text-center">
                          <Field name="hr.read" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="hr.create" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="hr.update" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="hr.delete" type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>IT</td>
                        <td class="text-center">
                          <Field name="it.read" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="it.create" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="it.update" type="checkbox" />
                        </td>
                        <td class="text-center">
                          <Field name="it.delete" type="checkbox" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit" className="btn btn-primary mb-3">
                    Submit
                  </button>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PermissionForm;
