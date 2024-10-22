import React, { useCallback, useEffect, useState } from 'react'
import TaskTable from '../../../components/Tables/EmployeeTables/Tasks/TasksTable'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../services/api';

const OperationTasksViewUser = () => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [isTask, setIsTask] = useState(false);

    const { id } = useParams();

    const employeeOgid = id;

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/v1/employees/${employeeOgid}/employee_tasks.json`);
            const fetchedData = response?.data || [];

            // Process the fetched data to fit into the table structure
            const processedTasks = fetchedData.map((task, index) => ({
                id: index + 1, // Assign an index as task ID
                task_date: task.task_date,
                total_tasks: task.total_tasks,
                completed_tasks: task.completed_tasks,
                status: task.completed_tasks === task.total_tasks ? "Completed" : "Pending",
            }));

            setTasks(processedTasks);
            setTotalPages(Math.ceil(fetchedData.length / sizePerPage));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks", error);
            setLoading(false);
        }
    }, [employeeOgid, sizePerPage]);

    useEffect(() => {
        if (employeeOgid) {
            fetchTasks();
        }

    }, [fetchTasks, employeeOgid]);
    return <div>
        <div className="row">
            <div className="col text-center">
                {/* <h3 className="page-title">John Doe</h3> */}
            </div>
        </div>

        <TaskTable loading={loading} tasks={tasks} sizePerPage={sizePerPage} totalPages={totalPages} page={page} setPage={setPage} setSizePerPage={setSizePerPage} fetchData={fetchTasks} ogId={employeeOgid} /></div>
}

export default OperationTasksViewUser
