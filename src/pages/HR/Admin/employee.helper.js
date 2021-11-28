export default class EmployeeHelperService{
    constructor(shifts,
        designations,
        branches,
        departments,
        projects,
        acceptedJobOffers,
        employees){
        this.shifts = shifts
        this.designations = designations
        this.branches = branches
        this.departments = departments
        this.projects = projects
        this.acceptedJobOffers = acceptedJobOffers
        this.employees = employees

    }
    mapRecords(){
        // console.log(this.employeeTypes)
          const appOpts = this.acceptedJobOffers?.map((e) => {
              return {
                label:
                  e.job_applicant_id.first_name +
                  " " +
                  e.job_applicant_id.last_name +
                  " " +
                  e.job_applicant_id.middle_name,
                value:
                  e.job_applicant_id.first_name +
                  "-" +
                  e.job_applicant_id.last_name +
                  "-" +
                  e?.job_applicant_id.middle_name,
              };
            })
        const reportstoOpts = this.employees?.map((e) => {
            return {
              label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
              value: e._id,
            };
          });
          // console.log(reportstoOpts)
          const shiftsopts = this.shifts?.map((e) => {
            return {
              label: e.shift_name,
              value: e._id,
            };
          });
          const campaingOpts = this.projects?.map((e) => {
            return {
              label: e.project_name,
              value: e._id,
            };
          });
          const branchOpts = this.branches?.map((e) => {
            return {
              label: e.branch,
              value: e._id,
            };
          });
          const deptopts = this.departments?.map((e) => {
            return {
              label: e.department,
              value: e._id,
            };
          });
          const designationOpts = this.designations?.map((e) => {
            return {
              label: e.designation,
              value: e._id,
            };
          });
          return{
            reportstoOpts,shiftsopts, campaingOpts, branchOpts, deptopts, designationOpts, appOpts

          }
    }

    finalForm(employeeFormJson, service, mode){
        return employeeFormJson.Fields.map((field) => {
            if (field.name === "designation") {
              field.options = service.designationOpts;
              return field;
            } else if (field.name === "default_shift") {
              field.options = service.shiftsopts;
              return field;
            } else if (field.name === "applicant") {
              if(mode == 'add'){
                field.options = service.appOpts;
              }else{
                field.options = service.reportstoOpts
                console.log('REPORT', field)
              }
              return field;
            } else if (field.name === "department") {
              field.options = service.deptopts;
              return field;
            } else if (field.name === "branch") {
              field.options = service.branchOpts;
              return field;
            } else if (field.name === "projectId") {
              field.options = service.campaingOpts;
              return field;
            } else if (field.name === "reports_to") {
              field.options = service.reportstoOpts;
              return field;
            }
            return field;
          });
    }


}

