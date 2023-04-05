import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./similarrecipe.css"
const SimilarRecipes = () => {
  const { id } = useParams();
  const [similarRecipes, setSimilarRecipes] = useState([]);

  const fetchSimilarRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=817073eab2c64effbdbffe3f78543ae2`
      );
      const data = await response.json();
      setSimilarRecipes(data);
    //   console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSimilarRecipes();
  }, []);
  return (
    <div>
      {/* <h2>Similar Recipes</h2> */}
      <div className="similar_recipe_container">
      <p>You can check following recipes in detail by  clicking on their name.</p>
        {similarRecipes.map(({id, sourceUrl, title}) => {
          return (
            <div className="similar_recipe" key={id}>
             <a href={sourceUrl} target="/"> <h2>{title}</h2></a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarRecipes;
