export default class EmployeeHelperService {
  constructor(
    shifts,
    designations,
    branches,
    departments,
    projects,
    acceptedJobOffers,
    employees,
    employeestatus,
  ) {
    this.shifts = shifts;
    this.designations = designations;
    this.branches = branches;
    this.departments = departments;
    this.projects = projects;
    this.acceptedJobOffers = acceptedJobOffers;
    this.employees = employees;
    this.employeestatus = employeestatus;
  }
  mapRecords() {
    const appOpts =
      this.acceptedJobOffers.length > 0
        ? this.acceptedJobOffers?.map((e) => {
            return {
              label:
                e?.job_applicant_id.first_name +
                " " +
                e?.job_applicant_id.last_name +
                " " +
                e?.job_applicant_id.middle_name,
              value:
                e?.job_applicant_id.first_name +
                "-" +
                e?.job_applicant_id.last_name +
                "-" +
                e?.job_applicant_id.middle_name,
            };
          })
        : [];
    const reportstoOpts = this.employees?.map((e) => {
      return {
        label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
        value: e._id,
      };
    });

    const shiftsopts = this.shifts?.map((e) => {
      return {
        officeType:
          e.departmentId === null && e.campaignId === null
            ? null
            : e.departmentId === null && e.campaignId !== null
            ? 'campaign'
            : e.departmentId !== null && e.campaignId === null
            ? 'department'
            : null,
        officeId:
        e.departmentId === null && e.campaignId === null
          ? null
          : e.departmentId === null && e.campaignId !== null
          ? e.campaignId
          : e.departmentId !== null && e.campaignId === null
          ? e.departmentId
          : null,
        campaignId: e.campaignId,
        departmentId: e.departmentId,
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
    const employeestatusOpts = this.employeestatus?.map((e) => {
      return {
        label: e.status,
        value: e._id,
      };
    });

    return {
      reportstoOpts,
      shiftsopts,
      campaingOpts,
      branchOpts,
      deptopts,
      designationOpts,
      appOpts,
      employeestatusOpts
    };
  }

  finalForm(employeeFormJson, service, mode) {
    return employeeFormJson.Fields.map((field) => {
      if (field.name === "designation") {
        field.options = service.designationOpts;
        return field;
      } else if (field.name === "default_shift") {
        field.options = service.shiftsopts;
        return field;
      } else if (field.name === "applicant") {
        if (mode === "add") {
          field.options = service.appOpts;
        } else {
          field.options = service.reportstoOpts;
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
      } else if (field.name === "employment_type") {
        field.options = service.empTypeopts;
      } else if (field.name === "reports_to") {
        field.options = service.reportstoOpts;
        return field;
      } else if (field.name === "status") {
        field.options = service.employeestatusOpts;
        return field;
      }
      return field;
    });
  }
}
