/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PayrollBatchesTable from "../../components/Tables/payrollBatchesTable";
import axiosInstance from '../../services/api';
import ViewModal from '../../components/Modal/ViewModal';
import PayrollBatchesContent from '../../components/ModalContents/PayrollBatchesContent';


const PayrollBatches = () => {
  const [data, setData] = useState([]);
  const [viewRow, setViewRow] = useState(null);
  const [modalType, setmodalType] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPayrollBatches = () => {
    axiosInstance
      .get('/api/batch')
      .then((res) => {
        console.log('Payroll Batches', res?.data?.data);
        let resData = res?.data?.data;
        setData(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPayrollBatches();
    setTimeout(() => {
      setLoading(false);
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Table for PayrollBAtches
  const columns = [
    {
      dataField: 'batch_id',
      text: 'Batch ID',
      sort: true,
      formatter: (value, row) => (
        <h2>
          {row?.batch_id}
        </h2>
      ),
    },
    {
      dataField: 'reference_id',
      text: 'Reference ID',
      sort: true,
      formatter: (value, row) => (
        <>
          <h2>{row?.reference_id}</h2>
        </>
      ),
    },
    {
      dataField: 'approved',
      text: 'Payroll Batch Status',
      sort: true,
      formatter: (value, row) => (
        <>
         <h2>
          {row?.approved ? 'Approved' : 'Not Approved'}
         </h2>
        </>
      ),
    },

    {
      dataField: '',
      text: 'Action',
      sort: true,
      csvExport: false,
      headerStyle: { minWidth: '70px', textAlign: 'left' },
      formatter: (value, row) => (
        <div className="dropdown dropdown-action text-right">
          <>
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
                data-target="#generalModal"
                onClick={() => {
                  setmodalType('view-details');
                  setViewRow(row);
                }}
              >
                <i className="fa fa-eye m-r-5"></i> View
              </a>
            </div>
          </>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">Payroll Batches</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">
                Payroll Batches
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">

          <PayrollBatchesTable
            data={data}
            loading={loading}
            setLoading={setLoading}
            setData={setData}
            columns={columns}
          />
        </div>
      </div>

      {modalType === 'view-details' ? (
        <ViewModal
          title="Batch Details"
          content={<PayrollBatchesContent payrollBatch={viewRow} />}
        />
      ) : ""
      }
    </>
  );
};

export default PayrollBatches;
