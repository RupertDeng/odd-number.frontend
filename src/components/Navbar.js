import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark'>
      <div className='container-lg pt-1 pb-1 ps-4 pe-4'>
        <a className='navbar-brand' href='/'>
          <picture>
            <source media='(max-width: 720px)' srcSet='/images/logo-small.png'></source>
            <source media='(min-width: 721px)' srcSet='/images/logo-large.png'></source>
            <img src='/images/logo-large.png' alt='Odd Number the App' height='28'></img>
          </picture>
        </a>
        <button className='navbar-toggler collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapsibleNavbar' aria-controls='collapsibleNavbar' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='toggler-icon top-bar'></span>
          <span className='toggler-icon bottom-bar'></span>
        </button>
        <div className='collapse navbar-collapse' id='collapsibleNavbar'>
          <div className='navbar-nav ms-auto'>
            <a className='nav-link me-3' href='/terms-of-service'>Terms of Service</a>
            <a className='nav-link me-3' href='/privacy-policy'>Privacy Policy</a>
          </div>
        </div>
      </div>
    </nav>
  );
};