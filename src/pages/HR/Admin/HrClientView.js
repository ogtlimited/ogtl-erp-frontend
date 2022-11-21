/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HrClientViewProjectTable from './HrClientViewProjectTable';
import axiosInstance from '../../../services/api';
import { CreateAccountModal } from '../../../components/Modal/CreateAccountModal';
import ViewModal from '../../../components/Modal/ViewModal';
import ConfirmStatusModal from '../../../components/Modal/ConfirmStatusModal';
import ClientProjectContent from '../../../components/ModalContents/ClientProjectContent';
import { useAppContext } from '../../../Context/AppContext';

const HrClientView = () => {
  const { id } = useParams();
  const { showAlert } = useAppContext();
  const [clientId, setClientId] = useState('');
  const [statusModal, setStatusModal] = useState(false);
  const [client, setClient] = useState([]);
  const [clientAccount, setClientAccount] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [modalType, setmodalType] = useState('');
  const [viewRow, setViewRow] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [noAccess, setNoAccess] = useState(false);

  const fetchClientAccount = async () => {
    setLoadingStatus(true);
    try {
      const res = await axiosInstance.get(`api/client_account/${id}`);
      setClientAccount(res.data.data);
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 403") {
        setNoAccess(true);
        setLoadingStatus(false);
        return;
      }
      setNoAccess(false);
    }
    setLoadingStatus(false);
    setNoAccess(false);
  };

  const fetchClient = () => {
    axiosInstance
      .get(`/api/client/${id}`)
      .then((res) => {
        const resData = res.data.data;
        setClient(resData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProjects = () => {
    axiosInstance
      .get(`/api/client_projects/${id}`)
      .then((res) => {
        const clientData = res.data.data;
        setProjects(clientData);

        let formatted = clientData.clientProjects.map((e) => ({
          ...e,
          date_created: new Date(e.createdAt).toUTCString(),
          start_date: new Date(e.start_date).toUTCString(),
          end_date: new Date(e.end_date).toUTCString(),
        }));

        setProjectData(formatted);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStatusModal = (clientAccount) => {
    if (clientAccount.activated) {
      setClientId(clientAccount._id);
      setStatusModal(true);
      return;
    } else if (!clientAccount.activated && !clientAccount.spammy) {
      axiosInstance.patch(`/api/activate/client-account/${clientAccount._id}`).then((res) => {
        // eslint-disable-next-line no-unused-vars
        let resData = res.data
        showAlert(true, "Account Activated", 'alert alert-success');
        fetchClient()
        fetchClientAccount();
      }).catch((error) => {
        console.log(error)
      })
      return;
    }
  };

  useEffect(() => {
    fetchClientAccount();
    fetchClient();
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      dataField: 'project_name',
      text: 'Name',
      sort: true,
      headerStyle: { width: '100px' },
    },
    {
      dataField: 'date_created',
      text: 'Date Created',
      sort: true,
    },
    {
      dataField: 'parent',
      text: 'Parent',
      sort: true,
      headerStyle: { width: '100px' },
    },
    {
      dataField: 'billing_structure',
      text: 'Billing Structure',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: 'diallers',
      text: 'Diallers',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: 'shift_start',
      text: 'Shift Start',
      sort: true,
      headerStyle: { minWidth: '100px' },
    },
    {
      dataField: 'shift_end',
      text: 'Shift End',
      sort: true,
      headerStyle: { minWidth: '100px' },
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
            <button
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#generalModal"
              onClick={() => {
                setmodalType('view-details');
                setViewRow(row);
              }}
            >
              View Project
            </button>
          </>
        </div>
      ),
    },
  ];

  return (
    <>
      {statusModal && (
        <ConfirmStatusModal
          closeModal={setStatusModal}
          id={clientId}
          fetchClient={fetchClient}
          fetchClientAccount={fetchClientAccount}
        />
      )}
      <CreateAccountModal
        data={client}
        onClick={fetchClient}
        setClientAccount={setClientAccount}
      />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h3 className="page-title">{client.client_name}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard/hr-clients">Clients</a>
              </li>
              <li className="breadcrumb-item active">{client.client_name}</li>
            </ul>
          </div>

          <div className="col-auto float-right ml-auto">
            <a href="/dashboard/hr-clients" className="btn add-btn m-r-5">
              Back
            </a>
          </div>

          {clientAccount.activated === true &&
          clientAccount.spammy === false && !noAccess ? (
            <div
              className="col-auto float-right ml-auto"
              onClick={() => handleStatusModal(clientAccount)}
            >
              <a href="#" className="btn add-btn m-r-5">
                Deactivate
              </a>
            </div>
          ) : clientAccount.activated === false &&
            clientAccount.spammy === true && !noAccess ? (
            <div className="col-auto float-right ml-auto">
              <a href="#" className="btn add-btn m-r-5">
                Activation Pending
              </a>
            </div>
          ) : clientAccount.activated === false &&
            clientAccount.spammy === false && !noAccess ? (
            <div className="col-auto float-right ml-auto" 
              onClick={() => handleStatusModal(clientAccount)}>
              <a href="#" className="btn add-btn m-r-5">
                Activate
              </a>
            </div>
          ) : loadingStatus && !noAccess ? (
            <button className="btn add-btn loading-btn">
              <div
                className="spinner-border loading-spinner"
                role="status"
              ></div>
            </button>
          ) : !noAccess ? (
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn m-r-5"
                data-toggle="modal"
                data-target="#FormModal"
              >
                Create Account
              </a>
            </div>
          ) : null}

        </div>
      </div>

      <div className="client-card-container">
        <div className="client-info-card">
          <h4 className="client-title">Client Info</h4>
          <div className="client-info-div">
            <ul className="client-list list-unstyled">
              <li>
                <strong>Code:</strong> {client.code}
              </li>
              <li>
                <strong>Client:</strong> {client.client_name}
              </li>
              <li>
                <strong>Email:</strong> {client.email}
              </li>
              <li>
                <strong>Address:</strong> {client.address}
              </li>
              <li>
                <strong>Phone:</strong> {client.contact_phone}
              </li>
              <li>
                <strong>City:</strong> {client.city}
              </li>
              <li>
                <strong>State:</strong> {client.state}
              </li>
              <li>
                <strong>Country:</strong> {client.country}
              </li>
              <li>
                <strong>Company:</strong> {client.company}
              </li>
            </ul>
          </div>
        </div>

        <div className="client-count-card">
          <h4 className="client-count-title">Total Projects</h4>
          <div className="client-card-div">
            <p>{projects.totalProjects}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <HrClientViewProjectTable columns={columns} data={projectData} />
        </div>
      </div>

      {modalType === 'view-details' ? (
        <ViewModal
          title="Project Details"
          content={<ClientProjectContent clientProject={viewRow} />}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default HrClientView;
