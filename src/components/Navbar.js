import React from 'react';

export const Navbar = () => {


  return (
    <nav className='navbar navbar-expand-sm navbar-dark fixed-top'>
      <div className='container-md pt-1 pb-1 ps-3 pe-3'>
        <a class='navbar-brand' href='/'>
          <img src='/images/logo-large.png' alt='' height='32'></img>
        </a>
        <button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#collapsibleNavbar' aria-controls='collapsibleNavbar' aria-expanded='false' aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='collapsibleNavbar'>
          <div class='navbar-nav ms-auto'>
            <a class='nav-link me-3' href='/'>Terms of Service</a>
            <a class='nav-link' href='/'>Privacy Policy</a>
          </div>
        </div>
      </div>
    </nav>
  );


}