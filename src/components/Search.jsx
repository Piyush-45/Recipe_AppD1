import React, { useEffect, useState } from "react";
import searchIcon from "../images/searchiconsvg.svg";
import { useNavigate } from "react-router-dom";

const Search = () => {
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // const API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=7d8e3d34745c4731b1da758cdad1b008&query=${searchTerm}&number=10`

  function handleSubmit(e) {
    e.preventDefault();
    // !make sure you add another slash / here
    navigate("/searched/" + searchTerm);
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="nav__input">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleSubmit}
        />
        <img src={searchIcon} alt="" />
      </div>
    </form>
  );
};

export default Search;
