import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { RecipeCardBottom } from "../components/RecipeCard";
import { Link } from "react-router-dom";
const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const { search } = useParams();
  
  const API_KEY = "7d8e3d34745c4731b1da758cdad1b008";

  const fetchResult = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${search}`
      );
      const data = await response.json();
      setSearchedRecipes(data.results);
      // console.log(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [search]);

  return (
    <>
      <h1>Showing result for {search} </h1>
      <div className="recipes_container">
        {searchedRecipes.map((item) => {
          const { id, title, image } = item;
          return (
            <>
              <div className="recipe_Card">
                <Link to={`/recipe/${id}`}>
                  <RecipeCard key={id} title={title} image={image} />
                </Link>
                <RecipeCardBottom
                  // readyInMinutes={readyInMinutes}
                  id={id}
                  title={title}
                  image={image}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Searched;
