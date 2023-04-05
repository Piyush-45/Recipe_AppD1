import React, { useState } from 'react';
// import './RecipesDropdown.css'; // import CSS file
import { Link as Links } from 'react-scroll';
import { Link } from 'react-router-dom';
function RecipesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
    <button className="dropbtn" onClick={toggleMenu}>Recipes</button>
    <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
    <Links to="popular" smooth={true} duration={500}>
          Popular
        </Links>
        <Links to="vegetarian" smooth={true} duration={500}>
          Vegetarian
        </Links>
      <Link to="/american" >
        American
      </Link>
      <Link to="/italian" >
        Italian
      </Link>
      <Link to="/thai">
        Thai </Link>
    </div>
  </div>
  );
}

export default RecipesDropdown;
