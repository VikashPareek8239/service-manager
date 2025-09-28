import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className='header-content'>
          <Link to='/' className='logo'>
            <h1>ServiceManager</h1>
          </Link>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <Link
              to='/'
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link
              to='/services'
              className={location.pathname === "/services" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link
              to='/blog'
              className={location.pathname === "/blog" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link
              to='/contact'
              className={location.pathname === "/contact" ? "active" : ""}
              onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </nav>

          <button className='menu-toggle' onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
