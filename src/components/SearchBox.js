import {useState} from 'react';
import {Popup} from './Popup';
import './SearchBox.css';

export const SearchBox = () => {

  // the number searched and validation function to sanitize it
  const [number, setNumber] = useState('');
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

  // function to handle user input on search box
  const handleSearchInput = (e) => {
    setNumber(e.target.value);
  };

  // function to handle visual effect after clicking searching button
  const handleSearchClick = () => {
    document.getElementById('jumbo').classList.add('hide');
    document.getElementById('search-panel').classList.add('narrow-panel');
    window.scrollTo({top: 0, behavior: 'smooth'})
  };

  // function to handle search submit (button click or hit ENTER in text box)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const validated = validateNumber(number);
    if (validated === '') {

    } else {

      // axios http request to backend
    }
  };


  return (
    <>
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
      <Popup popupId='invalidNumberPopup' popupIcon='bi bi-emoji-dizzy' popupText='Invalid Number! Please input valid U.S. phone number to search.' />
    </>
  );

};