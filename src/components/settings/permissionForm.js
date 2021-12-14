import React from "react";
import { Formik, ErrorMessage, Field, getIn } from 'formik';
const initialValues = {
    account :{
        read: false,
        write: false,
        update: false,
        delete: false,
    },
    campaign :{
        read: false,
        write: false,
        update: false,
        delete: false,
    },
    facility :{
        read: false,
        write: false,
        update: false,
        delete: false,
    },
    hr :{
        read: false,
        write: false,
        update: false,
        delete: false,
    },
    it :{
        read: false,
        write: false,
        update: false,
        delete: false,
    }
}
const PermissionForm = ({role}) => {

  return (
    <>
      <div class="col-sm-8 col-md-8 col-lg-8 col-xl-9">
        <h6 class="card-title m-b-20">Module Access {role && 'For ' + role.designation}</h6>
      
        <div class="table-responsive">
          <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 500);
          }}
          >
             {props => {
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
                        <Field name="account.read" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="account.write" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="account.update" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="account.delete" type="checkbox"  />
                      </td>
                    </tr>
                    <tr>
                      <td>Campaign / Project</td>
                      <td class="text-center">
                        <Field name="campaign.read" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="campaign.write" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="campaign.update" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="campaign.delete" type="checkbox"  />
                      </td>
                    
                    </tr>
                    <tr>
                      <td>Facility</td>
                      <td class="text-center">
                        <Field name="facility.read" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="facility.write" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="facility.update" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="facility.delete" type="checkbox"  />
                      </td>
                      
                    </tr>
                    <tr>
                      <td>HR</td>
                      <td class="text-center">
                        <Field name="hr.read" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="hr.write" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="hr.update" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="hr.delete" type="checkbox"  />
                      </td>
                    </tr>
                    <tr>
                      <td>IT</td>
                      <td class="text-center">
                        <Field name="it.read" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="it.write" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="it.update" type="checkbox"  />
                      </td>
                      <td class="text-center">
                        <Field name="it.delete" type="checkbox"  />
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
                <button type="submit" className="btn btn-primary mb-3">Submit</button>
               
                </form>
            )
             }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PermissionForm;
