import {useRef} from 'react';
import './SearchBox.css';

export const SearchBox = ({queryNumber, setSearchResult, handleServiceError}) => {

  const searchBoxRef = useRef();
  
  // function to handle visual effect after clicking searching button
  const handleSearchClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    document.getElementById('jumbo').classList.add('hide');
    document.getElementById('search-panel').classList.add('narrow-panel');
  };

  // validation function to sanitize search number
  const validateNumber = (num) => {
    let filtered = num.replace(/\D/g, '')
    if (filtered.length > 11 || filtered.length < 10 || (filtered.length === 11 && filtered[0] !== '1')) {
      return '';
    } else {
      if (filtered.length === 11) {
        filtered = filtered.slice(1);
      }
      return `(${filtered.slice(0, 3)})${filtered.slice(3, 6)}-${filtered.slice(6, 10)}`;
    }
  };
  
  // function to handle search submit (button click or hit ENTER in text box)
  const handleSearchSubmit = async (e) => {
    try {
      e.preventDefault();
      const validatedNum = validateNumber(searchBoxRef.current.value);
      const alertPop = document.getElementById('invalidNumber');
      if (validatedNum === '') {
        alertPop.classList.add('active');
        setSearchResult(undefined);
      } else {
        alertPop.classList.remove('active');
        const response = await queryNumber(validatedNum);
        setSearchResult(response.data);
      }
    } catch(err) {
      handleServiceError(err);
    }
  };


  return (
    <div className='mx-auto px-2 py-5 shadow' id='search-panel'>
      <div className='container-fluid'>
        <form className='row justify-content-center align-items-center g-2' onSubmit={handleSearchSubmit}>
          <div className='col-9 col-sm-8'>
            <input ref={searchBoxRef} type='text' className='form-control fs-4' placeholder='U.S. phone numbers'></input>
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

};