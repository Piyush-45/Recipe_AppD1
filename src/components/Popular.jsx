import React from "react";
import { useState, useEffect } from "react";
import RecipeCard, { RecipeCardBottom } from "./RecipeCard";
import heart from "../images/heart.png";
import timerequired from "../images/timerequired.png";
import { Link } from "react-router-dom";
import SimilarRecipes from "./SimilarRecipes";

const Popular = () => {
  const key1 = `62bd0b953b6c4a50a3fff4e27084d94c`;
  const key2 = ` 7d8e3d34745c4731b1da758cdad1b008`;
  const APi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=817073eab2c64effbdbffe3f78543ae2&number=20&cuisine=Irish`;

  const [popularRecipes, setPopularRecipes] = useState([]);

  const fetchPopularRecipe = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPopularRecipes(data.results);
      //   setImageData(data.recipes.image);
      //   console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPopularRecipe(APi);
  }, []);


  return (
    <>
      <h1 id="popular">Popular Picks</h1>
      <div className="popular recipes_container">
        {popularRecipes.map((item) => {
          const { id, title, image, readyInMinutes } = item;
          return (
            <div className="recipe_Card" key={id}>
              <Link key={id} to={`/recipe/${id}`}>
                <RecipeCard id={id} title={title} image={image} />
              </Link>
              <RecipeCardBottom
                similarRecipes={<SimilarRecipes id={id}/>}
                id={id}
                title={title}
                image={image}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Popular;
