import React from "react";
import logo2 from "../images/logo2.png";
import { BsSearch } from "react-icons/bs";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipesDropdown from "./DropDown";
import { UserAuth } from "../../context/AuthContext";
import plateful from "../images/plateful.png";
// import MobileMenu from "./MobileMenu";
const Navbar = () => {
  let navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="navbars_container">
        <nav>
          <div className="logo-container">
            <p className="logo-h1">PLATEFUL</p>
            <p className="logo-p">Discover your culinary kingdom</p>
          </div>
          <Search />
        </nav>

        <div className="second_navbar">
          <ul className="second_navbar__list">
            <li>
              <Link to={"/"} className="home-link">
                Home
              </Link>
            </li>
            <li>
              <RecipesDropdown />
            </li>
            <Link to={"/blogs"} className="home-link">
              <li>Blog</li>
            </Link>
            {/* <li>Submit A recipe</li> */}
            {user?.email ? (
              <>
                <li onClick={handleLogout}>Log Out</li>
                <Link to={"/account"} className="home-link">
                  <li>My Account</li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"} className="home-link">
                  <li>Login</li>
                </Link>
                <Link to={"/register"} className="home-link">
                  <li>Register</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// import RecipesDropdown from "./DropDown";
// import { UserAuth } from "../../context/AuthContext";
// import Search from "./Search";
// import logo2 from "../images/logo2.png";
// import plateful from "../images/plateful.png";
// import "../css/Navbar.css";

// const Navbar = () => {
//   let navigate = useNavigate();
//   const { user, logOut } = UserAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       navigate("/");
//     } catch (err) {
//       alert(err);
//     }
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div className="navbars_container">
//         <nav>
//           <div className="logo-container">
//             <img src={logo2} alt="logo" className="logo-image" />
//             <p className="logo-h1">PLATEFUL</p>
//             <p className="logo-p">Discover your culinary kingdom</p>
//           </div>
//           <Search />
//         </nav>

//         <div className="second_navbar">
//           <ul className="second_navbar__list">
//             <li>
//               <Link to={"/"} className="home-link">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <RecipesDropdown />
//             </li>
//             <Link to={"/blogs"} className="home-link">
//               <li>Blog</li>
//             </Link>
//             {/* <li>Submit A recipe</li> */}
//             {user?.email ? (
//               <>
//                 <li onClick={handleLogout}>Log Out</li>
//                 <Link to={"/account"} className="home-link">
//                   <li>My Account</li>
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link to={"/login"} className="home-link">
//                   <li>Login</li>
//                 </Link>
//                 <Link to={"/register"} className="home-link">
//                   <li>Register</li>
//                 </Link>
//               </>
//             )}
//           </ul>
//         </div>

//         <div id="mobile">
//           <button className="hamburger" onClick={toggleMenu}>
//             {/* icon from heroicons.com */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="white"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>

//           <div className={`mobile_menus ${isOpen ? "open" : ""}`}>
//             <div className="search">
//               <Search />
//             </div>
           
