import React from "react";
import { useState, useEffect } from "react";
import RecipeCard, { RecipeCardBottom } from "../components/RecipeCard";
import { Link } from "react-router-dom";
const American = () => {
  const API = `https://api.spoonacular.com/recipes/random?apiKey=2af405af41b84ff6a4b8f0cea79b1c5a&number=20&cusine=American`;

  const [americanRecipes, setAmericanRecipes] = useState([]);

  const fetchAmericanRecipe = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.recipes);
      setAmericanRecipes(data.recipes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAmericanRecipe(API);
  }, []);
  return (
    <>
      <h1 >American Cuisines</h1>
      <div className="recipes_container">
        {americanRecipes.map((recipe) => {
          const { id, title, image, readyInMinutes } = recipe;
          return (
            <>
              <div className="recipe_Card">
                <Link to={`/recipe/${id}`}>
                  <RecipeCard key={id} title={title} image={image} />
                </Link>
                <RecipeCardBottom
                  readyInMinutes={readyInMinutes}
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

export default American;
