// *IN USE - FIXED!

/*eslint-disable jsx-a11y/anchor-is-valid*/

import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../../Context/AppContext";
import axiosInstance from "../../../services/api";
import LeadersSubordinatesTable from "../../../components/Tables/EmployeeTables/leadersSubordinatesTable";
import OfficeStaffTable from "../../../components/Tables/EmployeeTables/officeStaffTable";

const SupervisorAdmin = () => {
  const { user, showAlert, ErrorHandler } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [allLeadersSubordinates, setAllLeadersSubordinates] = useState([]);
  const [allOfficeStaff, setAllOfficeStaff] = useState([]);
  const [hideComponent, setHideComponent] = useState(false);

  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalPages, setTotalPages] = useState("");

  const [designations, setDesignations] = useState([]);

  const [designationFilter, setDesignationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const officeId = user?.office?.id;

  // Team Members:
  const fetchAllLeadersSubordinates = useCallback(async () => {
    const supervisorOgid = user?.employee_info?.ogid;
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/subordinates.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          ogid: supervisorOgid,
        },
      });

      const resData = response?.data?.data?.subordinates;

      const mapp = resData.map((e) => {
        return {
          ...e,
          fullName: e?.first_name + " " + e?.last_name,
        };
      });

      setAllLeadersSubordinates(mapp);
      setLoading(false);
    } catch (error) {
      const component = "Team Members Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.employee_info?.ogid]);

  // Office Staff:
  const fetchAllOfficeStaff = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/employees.json", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
        params: {
          operation_office_id: officeId,
          page: page,
          limit: sizePerPage,
          name: searchTerm.length ? searchTerm : null,
          hr_designation_id: designationFilter.length
            ? designationFilter
            : null,
          status: statusFilter.length ? statusFilter : null,
        },
      });

      const resData = response?.data?.data?.employees;
      const totalPages = response?.data?.data?.pages;

      const thisPageLimit = sizePerPage;
      const thisTotalPageSize = totalPages;

      setSizePerPage(thisPageLimit);
      setTotalPages(thisTotalPageSize);

      const mapp = resData.map((emp) => {
        return {
          ...emp,
          fullName: emp?.full_name,
          office: emp?.office?.office_type,
          officeName: emp?.office?.title,
          designation: emp?.designation,
          company_email: emp?.email,
        };
      });

      setAllOfficeStaff(mapp);
      setLoading(false);
    } catch (error) {
      const component = "Office Staff Error:";
      ErrorHandler(error, component);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sizePerPage, searchTerm, designationFilter, statusFilter]);

  // // All Designations:
  // const fetchDesignation = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axiosInstance.get("/api/v1/designations.json", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "ngrok-skip-browser-warning": "69420",
  //       },
  //     });
  //     const resData = response?.data?.data?.designations;

  //     const formattedDesignation = resData
  //       .map((e) => ({
  //         label: e?.title.toUpperCase(),
  //         value: e.id,
  //       }))
  //       .sort((a, b) => a.label.localeCompare(b.label));

  //     setDesignations(formattedDesignation);
  //     setLoading(false);
  //   } catch (error) {
  //     if (error?.response?.status === 403) {
  //       setHideComponent(true);
  //     }
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchAllLeadersSubordinates();
    fetchAllOfficeStaff();
    // fetchDesignation();
  }, [fetchAllLeadersSubordinates, fetchAllOfficeStaff, user]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Team Members</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">Leadership</li>
              <li className="breadcrumb-item active">Team Members</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-menu">
        <div className="row">
          <div className="col-sm-12">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#tab_teamMembers"
                >
                  Team Members
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#tab_officeStaff"
                >
                  Office Staff
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className="row tab-content">
          <div id="tab_teamMembers" className="col-12 tab-pane show active">
            <LeadersSubordinatesTable
              data={allLeadersSubordinates}
              setData={setAllLeadersSubordinates}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div id="tab_officeStaff" className="col-12 tab-pane">
            <OfficeStaffTable
              data={allOfficeStaff}
              setData={setAllOfficeStaff}
              loading={loading}
              setLoading={setLoading}
              designations={designations}
              page={page}
              setPage={setPage}
              sizePerPage={sizePerPage}
              setSizePerPage={setSizePerPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              designationFilter={designationFilter}
              setDesignationFilter={setDesignationFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              fetchAllOfficeStaff={fetchAllOfficeStaff}
              hideComponent={hideComponent}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorAdmin;
