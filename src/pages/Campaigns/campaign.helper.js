export default class CampaignHelperService {
  constructor(
    clientS,
    employees,
  ) {
    this.clientS = clientS;
    this.employees = employees;
  }
  mapRecords() {
    const clientsOpts = this.clientS?.map((e) => {
      return {
        label: e.company,
        value: e._id,
      };
    });
    
    const supervisorOpts = this.employees?.map((e) => {
      return {
        label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
        value: e._id,
      };
    });

    const qualityAnalystOpts = this.employees?.map((e) => {
      return {
        label: `${e.first_name} ${e.middle_name} ${e.last_name}`,
        value: e._id,
      };
    });

    return {
      clientsOpts,
      supervisorOpts,
      qualityAnalystOpts,
    };
  }

  finalForm(campaignFormJson, service, mode) {
    return campaignFormJson.Fields.map((field) => {
      if (field.name === "client_id") {
        field.options = service.clientsOpts;
        return field;
      } else if (field.name === "manager") {
        field.options = service.supervisorOpts;
        return field;
      } else if (field.name === "quality_analyst") {
        field.options = service.qualityAnalystOpts;
        return field;
      }
      return field;
    });
  }
}
