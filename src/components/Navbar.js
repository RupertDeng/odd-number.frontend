import './Navbar.css'

export const Navbar = () => {
  
  return (
    <nav className='navbar navbar-expand-sm navbar-dark fixed-top'>
      <div className='container-md pt-1 pb-1 ps-4 pe-4'>
        <a class='navbar-brand' href='/'>
          <picture>
            <source media='(max-width: 350px)' srcset='/images/logo-small.png'></source>
            <source media='(min-width: 351px)' srcset='/images/logo-large.png'></source>
            <img src='/images/logo-large.png' alt='Odd Number the App' height='30'></img>
          </picture>
        </a>
        <button class='navbar-toggler collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapsibleNavbar' aria-controls='collapsibleNavbar' aria-expanded='false' aria-label='Toggle navigation'>
          <span class='toggler-icon top-bar'></span>
          <span class='toggler-icon bottom-bar'></span>
        </button>
        <div class='collapse navbar-collapse' id='collapsibleNavbar'>
          <div class='navbar-nav ms-auto'>
            <a class='nav-link me-3' href='/'>Terms of Service</a>
            <a class='nav-link me-3' href='/'>Privacy Policy</a>
          </div>
        </div>
      </div>
    </nav>
  );


}