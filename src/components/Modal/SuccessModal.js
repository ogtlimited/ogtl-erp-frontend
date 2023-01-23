/** @format */

import successAnim from '../../assets/img/success-tick.png';

function SuccessModal({ closeModal, pageRefresh }) {

  const handleSuccessModal = () => {
    closeModal(false);
    pageRefresh();
  }

  return (
    <>
      <div className="success-modal">
        <div className="success-modal-container">
          <div className="success-modal-items">
            <div className="success-modal-img">
              <img src={successAnim} alt="success-icon" />
            </div>
            <p className="success-info">
              Account created successfully, <br /> please activate account by clicking
              the link sent to your email.
            </p>
            <div className="success-modal-btns">
              <button
                className="success-modal-cancel btn-secondary"
                onClick={handleSuccessModal}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessModal;
