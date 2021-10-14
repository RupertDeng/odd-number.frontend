import './Popup.css';

export const Popup = ({popupId, popupIcon, popupTitle, popupMessage}) => {
  
  const handlePopupClose = () => {
    document.getElementById(popupId).classList.remove('active');
  };

  return (
    <div id={popupId} className='popup-container position-fixed d-flex align-items-center'>
      <div className='container pe-1'>
        <div className='row align-items-center g-0'>
          <div className='col-10 text-center border-end'>
            <h5 className='mt-0 mb-1'><i className={popupIcon}></i> {popupTitle}</h5>
            <p className='fs-6 m-0'>{popupMessage}</p>
          </div>
          <div className='col-2 text-center'>
            <button type='button' className='btn-close fs-3 bg-light rounded-pill' onClick={handlePopupClose}></button>
          </div>
        </div>
      </div>
    </div>
  );
};