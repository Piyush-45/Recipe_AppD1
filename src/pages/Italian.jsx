import React from "react";
import { useState, useEffect } from "react";
import RecipeCard, { RecipeCardBottom } from "../components/RecipeCard";
import { Link } from "react-router-dom";
const Italian = () => {
  const API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=2af405af41b84ff6a4b8f0cea79b1c5a&number=20&cusine=Italian`;

  const [italianRecipes, setItalianRecipes] = useState([]);

  const fetchAmericanRecipe = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.recipes)
      // setItalianRecipes(data.recipes);
      setItalianRecipes(data.results)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAmericanRecipe(API);
  }, []);
  return (
    <>
      <h1 id="popular">American Cuisines</h1>
      <div className="recipes_container">
        {italianRecipes.map((recipe) => {
          const { id, title, image, readyInMinutes } = recipe;
          return (
            <div className="recipe_Card">
              <Link to={`/recipe/${id}`}>
                {" "}
                <RecipeCard
                  key={id}
                  title={title}
                  readyInMinutes={readyInMinutes}
                  image={image}
                />
              </Link>
              <RecipeCardBottom
                readyInMinutes={readyInMinutes}
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

export default Italian;
