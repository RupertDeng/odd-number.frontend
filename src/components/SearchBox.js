import React from 'react';
import './SearchBox.css';

export const SearchBox = React.memo(({searchedNum, handleSearchInput, queryNumber, handlSearchResult, raiseAlertPop}) => {
  
  // function to handle visual effect after clicking searching button
  const handleSearchClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    document.getElementById('jumbo').classList.add('hide');
    document.getElementById('search-panel').classList.add('narrow-panel');
  };
  
  // function to handle search submit (button click or hit ENTER in text box)
  const handleSearchSubmit = async (e) => {
    try {
      e.preventDefault();
      const alertPop = document.getElementById('invalidNumber');
      if (searchedNum === '') {
        alertPop.classList.add('active');
        handlSearchResult(undefined);
      } else {
        alertPop.classList.remove('active');
        const response = await queryNumber(searchedNum);
        handlSearchResult(response.data);
      }
    } catch(err) {
      raiseAlertPop(err, 'serviceError');
    }
  };


  return (
    <div className='mx-auto px-2 py-5 shadow' id='search-panel'>
      <div className='container-fluid'>
        <form className='row justify-content-center align-items-center g-2' onSubmit={handleSearchSubmit}>
          <div className='col-9 col-sm-8'>
            <input type='text' className='form-control fs-4' placeholder='U.S. phone numbers' onChange={handleSearchInput}></input>
          </div>
          <div className='col-auto'>
            <button type='submit' className='btn btn-primary fs-5 text-white' onClick={handleSearchClick}>
              <i className='bi bi-search'></i> <span className='d-none d-sm-inline'>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

});