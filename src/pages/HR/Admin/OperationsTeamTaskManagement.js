/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import TaskManagementConfigTable from "../../../components/Tables/EmployeeTables/Tasks/TaskManagementConfigTable";
import { useNavigate } from "react-router-dom";

const OperationTeamTaskManagement = () => {
    const router = useNavigate()
    return (
        <div>

            <div className="col-auto float-right ml-auto">
                <div
                    onClick={() => router('/dashboard/operations/operation-team-task-management/create')}
                    className="btn add-btn m-r-5"
                >
                    Add Task Config
                </div>
            </div>
            <TaskManagementConfigTable />
        </div>
    );
};

export default OperationTeamTaskManagement;
