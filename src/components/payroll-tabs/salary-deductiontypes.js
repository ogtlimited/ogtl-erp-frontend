// *IN USE

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import { useAppContext } from "../../Context/AppContext";
import UniversalTable from "../Tables/UniversalTable";

const DeductionType = () => {
  const { ErrorHandler } = useAppContext();
  const [deductionTypes, setDeductionTypes] = useState([]);
  const [loading, setLoading] = useState(false);

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

      const formattedData = resData.map((item) => {
        return {
          ...item,
          officeType:
            item.office?.office_type.charAt(0).toUpperCase() +
            item.office?.office_type.slice(1),
          officeName: item.office?.title,
          deductionTitle: item?.deduction?.title,
          deductionDesc: item?.deduction?.description,
          deductionPercentage: item?.deduction?.percentage + "%",
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
    },
    {
      dataField: "officeName",
      text: "Office",
      sort: true,
      headerStyle: { width: "20%" },
    },
    {
      dataField: "deductionTitle",
      text: "Title",
      sort: true,
      headerStyle: { width: "15%" },
    },
    {
      dataField: "deductionDesc",
      text: "Description",
      sort: true,
      headerStyle: { width: "30%" },
    },
    {
      dataField: "deductionPercentage",
      text: "Deduction Percentage",
      sort: true,
      headerStyle: { width: "10%" },
    },
    
  ];

  return (
    <div className="tab-pane" id="tab_deduction_types">
      <div style={{ marginBottom: "50px" }}>
        <div className="row">
          {/* <div className="col-auto float-right ml-auto">
            <a
              href="#"
              className="btn add-btn m-r-5"
              data-toggle="modal"
              data-target="#test1"
            >
              Add Deduction Type
            </a>
          </div> */}
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
    </div>
  );
};

export default DeductionType;
