/** @format */

import { RiCloseCircleFill } from 'react-icons/ri';
import axiosInstance from '../../services/api';
// import $ from 'jquery';
import { useAppContext } from '../../Context/AppContext';

function ConfirmStatusModal({ closeModal, id, fetchClient, fetchClientAccount}) {
  const { showAlert } = useAppContext();
  const handleClientStatusChange = async (id) => {
    try {
      const res = await axiosInstance.post(`/api/client_status/${id}`);
      console.log('this deactivated account', res.data.data);
      showAlert(true, "Account Deactivated", 'alert alert-success');
    } catch (error) {
      console.log(error);
    }
    fetchClient();
    fetchClientAccount();
    closeModal(false);
  };

  return (
    <>
      <div className="deactivate-modal">
        <div className="deactivate-modal-container">
          <RiCloseCircleFill
            className="deactivate-modal-close"
            onClick={() => closeModal(false)}
          />
          <div className="deactivate-modal-items">
            <p>Are you sure you want to deactivate this account?</p>
            <div className="deactivate-modal-btns">
              <button
                className="deactivate-modal-cancel btn-secondary"
                onClick={() => closeModal(false)}
              >
                Cancel
              </button>
              <button
                className="deactivate-modal-yes btn-success"
                onClick={() => handleClientStatusChange(id)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmStatusModal;
