import './SearchBox.css'


export const SearchBox = () => {

  const handleSearchClick = () => {
    document.getElementById('jumbo').classList.add('hide');
    document.getElementById('placeholder').classList.add('nojumbo');
    document.getElementById('search-panel').classList.add('narrow-panel');
    window.scrollTo({top: 0, behavior: 'smooth'})
  };


  return (
    <div className='mx-auto mb-5 px-2 py-5 shadow' id='search-panel'>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center g-2'>
          <div className='col-9 col-sm-8'>
            <input type='text' className='form-control fs-4' placeholder='U.S. phone numbers'></input>
          </div>
          <div className='col-auto'>
            <button type='submit' className='btn btn-primary fs-5 text-white' onClick={handleSearchClick}>
              <i className='bi bi-search'></i> <span className='d-none d-sm-inline'>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};