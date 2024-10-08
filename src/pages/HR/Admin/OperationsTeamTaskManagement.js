/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import TaskManagementConfigTable from "../../../components/Tables/EmployeeTables/Tasks/TaskManagementConfigTable";

const OperationTeamTaskManagement = () => {
    // Function to toggle task status (active/inactive)
    return (
        <div>

            <div className="col-auto float-right ml-auto">
                <a
                    href="/dashboard/operations/operation-team-task-management/create"
                    className="btn add-btn m-r-5"
                >
                    Add Task Config
                </a>
            </div>
            <TaskManagementConfigTable />
        </div>
    );
};

export default OperationTeamTaskManagement;
