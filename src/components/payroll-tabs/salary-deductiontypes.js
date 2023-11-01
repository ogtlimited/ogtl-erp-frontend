// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../Tables/UniversalTable";
import { AddDeductionTypeModal } from "../Modal/AddDeductionTypeModal";

const DeductionType = () => {
  const { ErrorHandler, user, goToTop } = useAppContext();
  const [deductionTypes, setDeductionTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const CurrentUserRoles = user?.employee_info?.roles;
  const canCreateAndEdit = ["hr_manager", "senior_hr_associate"];

  const CurrentUserCanCreateAndEdit = CurrentUserRoles.some((role) =>
    canCreateAndEdit.includes(role)
  );

  const fetchDeductionTypes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/deduction_types.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const resData = response?.data?.data?.deduction_types;

      console.log("Deduction type response:", resData);

      const formattedData = resData.map((item) => {
        return {
          ...item,
          officeType:
            item.office?.office_type.charAt(0).toUpperCase() +
              item.office?.office_type.slice(1) || "N/A",
          officeName: item.office?.title || "-",
          deductionTitle: item?.deduction?.title,
          deductionDesc: item?.deduction?.description,
          deductionMode:
            item?.deduction?.deduction_mode === "percentage"
              ? "Percentage"
              : item?.deduction?.deduction_mode === "flat_rate"
              ? "Flat Rate"
              : "-",
          deductionValue:
            item?.deduction?.deduction_mode === "percentage"
              ? item?.deduction?.value + "%"
              : item?.deduction?.deduction_mode === "flat_rate"
              ? "₦" + Intl.NumberFormat("en-US").format(item?.deduction?.value)
              : "-",
        };
      });

      setDeductionTypes(formattedData);
      setLoading(false);
    } catch (error) {
      const component = "Deduction Types Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeductionTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      dataField: "officeType",
      text: "Office Type",
      sort: true,
      headerStyle: { width: "15%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "officeName",
      text: "Office",
      sort: true,
      headerStyle: { width: "20%" },
      formatter: (val, row) => <span>{val?.toUpperCase()}</span>,
    },
    {
      dataField: "deductionTitle",
      text: "Title",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "deductionDesc",
      text: "Description",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: "deductionMode",
      text: "Deduction Mode",
      sort: true,
      headerStyle: { width: "25%" },
    },
    {
      dataField: "deductionValue",
      text: "Value",
      sort: true,
      headerStyle: { width: "10%" },
    },
  ];

  return (
    <div className="tab-pane" id="tab_deduction_types">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {CurrentUserCanCreateAndEdit && (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#AddDeductionTypesModal"
              >
                Add Deduction Type
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <UniversalTable
          data={deductionTypes}
          columns={columns}
          loading={loading}
          setLoading={setLoading}
        />
      </div>

      <AddDeductionTypeModal
        fetchAllDeductionTypes={fetchDeductionTypes}
        goToTop={goToTop}
      />
    </div>
  );
};

export default DeductionType;
