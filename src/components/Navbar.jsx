// import React from "react";
// import logo2 from "../images/logo2.png";
// import { BsSearch } from "react-icons/bs";
// import Search from "./Search";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import RecipesDropdown from "./DropDown";
// import { UserAuth } from "../../context/AuthContext";

// // import { Link } from "react-router-dom";

// const Navbar = () => {
//   let navigate = useNavigate();
//   const { user, logOut } = UserAuth();
//   const [isOpen, setIsOpen] = useState(true);

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
//     <div className="navbars_container">
//       <nav>
//         <img src={logo2} alt="" />
//         <Search />
//         <img src="" alt="" />
//       </nav>

//       <div className="second_navbar">
//         <ul className="second_navbar__list">
//           <Link to={"/"} i className="home-link">
//             Home
//           </Link>
//           <li>
//             <RecipesDropdown />
//           </li>
//           <Link to={"/blogs"} className="home-link">
//             <li>Blog</li>
//           </Link>
//           <li>Submit A recipe</li>
//           {
//             user?.email ?(
//             <li>Log Out</li>
         
//             ):(
//              <>
//              <Link to={'/login'}><li>Login</li></Link>
//              <Link to{'/register'}><li>Register</li></Link>
//              </>
//             )
//           }
//           {/* <li></li> */}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from "react";
import logo2 from "../images/logo2.png";
import { BsSearch } from "react-icons/bs";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipesDropdown from "./DropDown";
import { UserAuth } from "../../context/AuthContext";

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
    <div className="navbars_container">
      <nav>
        <img src={logo2} alt="" />
        <Search />
        {/* <img src="" alt="" /> */}
      </nav>

      <div className="second_navbar">
        <ul className="second_navbar__list">
          <Link to={"/"} i className="home-link">
            Home
          </Link>
          <li>
            <RecipesDropdown />
          </li>
          <Link to={"/blogs"} className="home-link">
            <li>Blog</li>
          </Link>
          <li>Submit A recipe</li>
          {user?.email ? (
            <>
            <li onClick={handleLogout}>Log Out</li>
            <Link to={'/account'} className="home-link"><li>My Account</li></Link>
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
  );
};

export default Navbar;
