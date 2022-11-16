/** @format */

import { RiCloseCircleFill } from 'react-icons/ri';
import axiosInstance from '../../services/api';

function ConfirmStatusModal({ closeModal, id, fetchClients}) {
  const handleClientStatusChange = async (id) => {
    try {
      const res = await axiosInstance.post(`/api/client_status/${id}`);
      console.log('the result of deactivating', res);
    } catch (error) {
      console.log(error);
    }
    fetchClients();
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
                className="deactivate-modal-yes btn-primary"
                onClick={() => handleClientStatusChange(id)}
              >
                Yes
              </button>
              <button
                className="deactivate-modal-cancel btn-secondary"
                onClick={() => closeModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmStatusModal;
