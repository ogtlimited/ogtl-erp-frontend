/** @format */

import React, { useState } from 'react';
import { CREATE_ACCOUNT } from '../FormJSON/CreateAccount';
// import { useAppContext } from '../../Context/AppContext';
import axiosInstance from '../../services/api';
import $ from 'jquery';
import SuccessModal from '../../components/Modal/SuccessModal';

export const CreateAccountModal = ({ data, onClick, setClientAccount }) => {
  // const { showAlert } = useAppContext();
  const [client, setClient] = useState(CREATE_ACCOUNT);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleFormChange = (e) => {
    e.preventDefault();
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post('api/client_account', client);
      const resData = res.data.data;

      setClientAccount(resData);
      // showAlert(true, 'Account created successfully', 'alert alert-success');
      onClick();
      $('#FormModal').modal('toggle');
      setSuccessModal(true);
    } catch (error) {
      console.log(error);
      onClick();
      $('#FormModal').modal('toggle');
    }
    setLoading(false);
  };

  return (
    <>
      {successModal && (
        <SuccessModal closeModal={setSuccessModal} pageRefresh={onClick} />
      )}
      <div
        className="modal fade"
        id="FormModal"
        tabIndex="-1"
        aria-labelledby="FormModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="FormModalLabel">
                Create Account
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateAccount}>
                <div className="form-group">
                  <label htmlFor="user_name">Username</label>
                  <input
                    type="text"
                    name="user_name"
                    value={client.user_name}
                    onChange={handleFormChange}
                    className="form-control"
                  />
                </div>
                <input
                  type="text"
                  value={(client.client_id = data._id)}
                  style={{ display: 'none' }}
                />
                <input
                  type="text"
                  value={(client.email = data.email)}
                  style={{ display: 'none' }}
                />

                <div className="col-md-12">
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
