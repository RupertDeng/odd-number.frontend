import './SearchBox.css'

export const SearchBox = () => {

  return (
    <div className='mx-auto my-5' id='search-panel'>
      <div className='container-fluid px-2 py-5 shadow'>
        <div className='row justify-content-center align-items-center g-2'>
          <div className='col-8'>
            <input type='text' className='form-control fs-4' placeholder='U.S. phone numbers'></input>
          </div>
          <div className='col-auto'>
            <button type='submit' className='btn btn-primary fs-5 text-white'>
              <i className='bi bi-search'></i> <span className='d-none d-sm-inline'>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};