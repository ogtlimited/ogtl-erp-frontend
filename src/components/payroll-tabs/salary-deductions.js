import React, { useEffect, useState } from "react";
import LeavesTable from "../../components/Tables/EmployeeTables/Leaves/LeaveTable";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { DeductionForm } from "../Forms/DeductionForm";

const Deductions = () => {
  const { showAlert } = useAppContext();
  const [editData, seteditData] = useState({});
  const [data, setData] = useState([]);
  const [formValue, setFormValue] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [statusRow, setstatusRow] = useState({});
  const [status, setStatus] = useState("");

  const fetchDeductions = () => {
    axiosInstance
      .get("/api/deduction")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchDeductions();
  }, []);

  const deleteDeductions = (row) => {
    axiosInstance
      .delete(`/api/deduction/${row._id}`)
      .then((res) => {
        setData((prevData) =>
          prevData.filter((pdata) => pdata._id !== row._id)
        );
        showAlert(true, res.data.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error.response.data.message, "alert alert-danger");
      });
  };

  const updateDeductions = (row) => {
    axiosInstance
      .patch(`/api/deduction/${row._id}`, row)
      .then((res) => {
        setData((prevData) => [...data, res.data.data]);
        fetchDeductions();
        showAlert(true, res?.data?.message, "alert alert-success");
      })
      .catch((error) => {
        console.log(error);
        showAlert(true, error?.response?.data?.message, "alert alert-danger");
      });
  };

  const columns = [
    {
      dataField: "employeeId",
      text: "Employee",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => (
        <h2>
          {row?.employeeId?.first_name} {row?.employeeId?.last_name}
        </h2>
      ),
    },

    {
      dataField: "deductionTypeId",
      text: "Deduction",
      sort: true,
      headerStyle: { minWidth: "150px" },
      formatter: (value, row) => <h2>{row?.deductionTypeId?.title}</h2>,
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      headerStyle: { minWidth: "150px" },
    },

    {
      dataField: "",
      text: "Action",
      sort: true,
      headerStyle: { minWidth: "70px", textAlign: "left" },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => {
                setSelectedRow(row);
              }}
            >
              <i className="fa fa-trash m-r-5"></i> Delete
            </a>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="tab-pane" id="tab_deductions">
      <div>
        <div className="row">
          <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#FormModal"
            >
              Add
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="col-3 mb-2"></div>
          <LeavesTable data={data} columns={columns} />
        </div>
      </div>
      <DeductionForm fetchDeductions={fetchDeductions} />

      <ConfirmModal
        title="Deductions"
        selectedRow={selectedRow}
        deleteFunction={deleteDeductions}
      />
    </div>
  );
};

export default Deductions;
