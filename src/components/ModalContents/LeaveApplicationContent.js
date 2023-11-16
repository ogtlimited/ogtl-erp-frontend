import React from "react";

const LeaveApplicationContent = ({ leaveContent = {} }) => {
  const filteredApplication = {
    ...leaveContent,
    id: undefined,
    manager_id: undefined,
    start_date: undefined,
    first_name: undefined,
    last_name: undefined,
    end_date: undefined,
    updated_at: undefined,
    created_at: undefined,
    acted_on: undefined,
    hr_stage: undefined,
    status_action: undefined,
    leave: undefined,
    user: undefined,
    proofs: undefined,
    rejection_reason:
      leaveContent?.status === "rejected"
        ? leaveContent?.rejection_reason
        : undefined,
    reason_for_cancellation:
      leaveContent?.status === "cancelled" &&
      leaveContent?.reason_for_cancellation
        ? leaveContent?.reason_for_cancellation
        : undefined,
    reasons_for_update: leaveContent?.reasons_for_update
      ? leaveContent?.reasons_for_update
      : undefined,
  };

  const orderedKeys = [
    "date_applied",
    "ogid",
    "full_name",
    "office",
    "status",
    "from_date",
    "to_date",
    "requested_leave_days",
    "leave_type",
    "reason",
    "reasons_for_update",
    "reason_for_cancellation",
    "rejection_reason",
  ];

  return (
    <div className="row d-flex justify-content-center">
      {orderedKeys.map((key, index) => {
        const value = filteredApplication[key];
        if (typeof value !== "undefined") {
          return (
            <React.Fragment key={index}>
              <div className="col-md-6 mt-3">
                <p className="job-field">
                  {key
                    .split("_")
                    .join(" ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </p>
              </div>
              <div className="col-md-6 mt-3">
                <p className="">
                  {key === "reason" ||
                  key === "rejection_reason" ||
                  key === "reason_for_cancellation" ||
                  key === "reasons_for_update"
                    ? value
                    : typeof value === "string"
                    ? value.replace(/\b\w/g, (char) => char.toUpperCase())
                    : value === null
                    ? "Not Provided"
                    : typeof value === "number"
                    ? value
                    : typeof value === "boolean" && value === true
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </React.Fragment>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default LeaveApplicationContent;
