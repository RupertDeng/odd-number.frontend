export const Popup = ({popupId, popupIcon, popupText}) => {

  return (
    <div className='modal fade px-3' id={popupId}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'><i className={popupIcon}></i> Attention</h5>
          </div>
          <div className='modal-body fs-6 px-4'>
            {popupText}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-dark fs-6' data-bs-dismiss='modal'>OK</button>
          </div>
        </div>
      </div>
    </div>
  );

};