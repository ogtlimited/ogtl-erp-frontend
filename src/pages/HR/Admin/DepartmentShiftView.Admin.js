/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import LeaveTable from "../../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../services/api";
// import { useAppContext } from "../../../Context/AppContext";
// import Select from "react-select";

const DepartmentShiftView = () => {
  const { id } = useParams();
  // const {showAlert} = useAppContext();
  // const [submitted, setsubmitted] = useState(false);
  // const [formValue, setformValue] = useState(null);
  // const [editData, seteditData] = useState(null);
  // const [departMentOpts, setDepartmentOts] = useState(null);
  // const [unfiltered, setunfiltered] = useState([]);
  // const [mode, setmode] = useState("add");
  const [department, setDepartment] = useState('');

  const [allDepartmentsShifts, setallDepartmentsShifts] = useState([]);

  const fetchDept = () => {
    const department = localStorage.getItem('department');
    setDepartment(department);

    axiosInstance.get(`/api/shiftType/office?departmentId=${id}`).then((e) => {
      const resData = e?.data?.shiftData;
      console.log("Dept shifts:", resData)

      setallDepartmentsShifts(resData);
    });
  };


  useEffect(() => {
    fetchDept();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (submitted) {
  //     console.log(formValue);
  //     if (mode == "add") {
  //       axiosInstance
  //         .post("/department", formValue)
  //         .then((e) => {
  //           // setformValue({});
  //           fetchDept();
  //           showAlert(true, "New department created", "alert alert-success");
  //         })
  //         .catch((err) => {
  //           // setformValue(null);
  //           setsubmitted(false);
  //           console.log(err);
  //         });
  //     } else {
  //       axiosInstance
  //         .put("/department/" + editData._id, formValue)
  //         .then((e) => {
  //           console.log(e);
  //           setformValue(null);
  //           showAlert(
  //             true,
  //             "Department successfully updated",
  //             "alert alert-success"
  //           );
  //           fetchDept();
  //         })
  //         .catch((err) => {
  //           setformValue(null);
  //           setsubmitted(false);
  //           console.log(err);
  //         });
  //     }
  //   }
  // }, [formValue]);

  const columns = [
    {
      dataField: "shift_name",
      text: "Shift Name",
      sort: true,
      headerStyle: { width: "40%" },
    },
    {
      dataField: "start_time",
      text: "Start time",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "end_time",
      text: "End time",
      sort: true,
      headerStyle: { width: "30%" },
    },
  ];
  
  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">{department} Shifts</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">{department}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <LeaveTable
          data={allDepartmentsShifts}
          columns={columns}
        />
      </div>
    </>
  );
};

export default DepartmentShiftView ;
