import React, { useCallback, useEffect, useState } from 'react'
import TaskTable from '../../../components/Tables/EmployeeTables/Tasks/TasksTable'
import axiosInstance from '../../../services/api';
import { useAppContext } from '../../../Context/AppContext';
import moment from 'moment';

const OperationTasksView = () => {
    const {
        showAlert,
        ErrorHandler,
        user,
    } = useAppContext();

    const employeeOgid = user?.employee_info?.ogid;

    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [sizePerPage, setSizePerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [isTask, setIsTask] = useState(false);


    const isToday = (date) => {
        const today = moment().format("YYYY-MM-DD");
        return moment(date).isSame(today, "day");
    };
    // Fetch tasks for the given employee using the API
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
            availableTask()
        }
    }, [fetchTasks, employeeOgid]);

    const availableTask = () => {
        if (tasks?.length === 0 || tasks === null) {
            setIsTask(false)
            return
        }
        if (isToday(tasks[0]?.task_date)) {
            setIsTask(true)
        }

    }



    const startDailyTask = async () => {


        try {
            setLoading(true);
            const response = await axiosInstance.post(`/api/v1/employee_task_sheet`)

            if (response.status === 200) {

                fetchTasks();
                showAlert(true, response?.data?.message, "alert alert-success");
            }

        }
        catch (error) {
            console.error("Error submitting configuration", error);
            showAlert(true, error?.response?.data?.error, "alert alert-warning");
        }
        setLoading(false);
    }


    return <div>
        {
            (!isTask && !loading) && <button
                className="btn add-btn m-r-5 cursor-pointer"
                onClick={() => {

                    startDailyTask();
                }}
            >
                Start Daily Task
            </button>
        }



        <TaskTable loading={loading} tasks={tasks} sizePerPage={sizePerPage} totalPages={totalPages} page={page} setPage={setPage} setSizePerPage={setSizePerPage} fetchData={fetchTasks} /></div>
}

export default OperationTasksView
