import React from 'react'
import TaskTable from '../../../components/Tables/EmployeeTables/Tasks/TasksTable'

const OperationTasksView = () => {
    return <div>
        <div className="col-auto float-right ml-auto">
            <a
                href="/dashboard/operations/operation-team-task-management/1/daily-tasks"
                className="btn add-btn m-r-5"
            >
                Start Daily Task
            </a>
        </div>
        <TaskTable /></div>
}

export default OperationTasksView
