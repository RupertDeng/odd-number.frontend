import {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import './SearchBox.css';

export const SearchBox = ({validateNumber}) => {

  let history = useHistory();
  const searchRef = useRef();

  const handleSearchBtnClick = () => {
    const searchedNum = validateNumber(searchRef.current.value);
    history.push(`/search/${searchedNum}`);
  };
  

  return (
    <div className='mx-auto px-2 py-5 shadow' id='search-panel'>
      <div className='container-fluid'>
        <form className='row justify-content-center align-items-center g-2' onSubmit={(e) => e.preventDefault()}>
          <div className='col-9 col-sm-8'>
            <input ref={searchRef} type='text' className='form-control fs-4' placeholder='U.S. phone numbers'></input>
          </div>
          <div className='col-auto'>
            <button type='submit' className='btn btn-primary fs-5 text-white' onClick={handleSearchBtnClick}>
              <i className='bi bi-search'></i> <span className='d-none d-sm-inline'>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};