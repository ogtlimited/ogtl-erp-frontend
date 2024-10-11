import React, { useState } from 'react'
import TaskTable from '../../../components/Tables/EmployeeTables/Tasks/TasksTable'
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';

const OperationTasksView = () => {
    const {
        showAlert,
        ErrorHandler,
        user,
    } = useAppContext();

    const [loading, setLoading] = useState(false);

    const startDailyTask = async () => {

        try {
            setLoading(true);
            const response = await axiosInstance.post(`/api/v1/employee_task_sheet`)

            if (response.status === 200) {
                window.location.href = `/dashboard/operations/operation-team-task-management/${user?.ogid}/daily-tasks`;
            }

        }
        catch (error) {
            console.error("Error submitting configuration", error);
            showAlert(true, error?.response?.data?.errors, "alert alert-warning");
        }
        setLoading(false);
    }


    return <div>
        <div className="col-auto float-right ml-auto">
            <button

                className="btn add-btn m-r-5"
                onClick={startDailyTask}
            >
                Start Daily Task
            </button>
        </div>
        <TaskTable /></div>
}

export default OperationTasksView
