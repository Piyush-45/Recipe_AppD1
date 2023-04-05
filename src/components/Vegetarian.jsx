import React, { useEffect, useState } from "react";
import RecipeCard, { RecipeCardBottom } from "./RecipeCard";
import { Link } from "react-router-dom";
import SimilarRecipes from "./SimilarRecipes";
const Vegetarian = () => {
  const key1 = `62bd0b953b6c4a50a3fff4e27084d94c`;
  const key2 = " 7d8e3d34745c4731b1da758cdad1b008";
  const APi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=817073eab2c64effbdbffe3f78543ae2&query=vegetarian&number=20`;

  const [vegetarian, setVegetarian] = useState(null); // initialize state to null

  const fetchVegetarian = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVegetarian(data.results);
      // console.log(data.results)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVegetarian(APi);
  }, []);

  return (
    <>
      <h1 id="vegetarian">Our Vegetarian Pick</h1>
      <div className="vegetarian recipes_container">
        {/* add conditional statement to check if vegetarian state is not null */}
        {vegetarian !== null &&
          vegetarian.map((item) => {
            const { id, title, image, readyInMinutes } = item;
            return (
              <div className="recipe_Card" key={id}>
                <Link key={id} to={`/recipe/${id}`}  className="home-link">
                  <RecipeCard key={id} title={title} image={image} />
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

export default Vegetarian;
