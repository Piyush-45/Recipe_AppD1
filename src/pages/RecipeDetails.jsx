import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetails] = useState({});
  const apiKey = "7d8e3d34745c4731b1da758cdad1b008";
  const API = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  const fetchRecipeDetails = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipeDetails(data);
      // console.log(data.instructions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipeDetails(API);
  }, []);

  // Remove the br tags from the summary string
  const summary = recipeDetail.summary?.replace(/<br>/g, " ");

  // Split the instructions string by the <li> tag to create an array of instructions
  const instructions = recipeDetail.instructions?.split("<li>").map((instruction) => {
    // Remove the opening <li> tag
    let modifiedInstruction = instruction.replace(/<li>/g, "");

    // Remove the closing </li> tag
    modifiedInstruction = modifiedInstruction.replace(/<\/li>/g, "");

    // Remove any other HTML tags and trim the result
    modifiedInstruction = modifiedInstruction.replace(/(<([^>]+)>)/gi, "").trim();

    return modifiedInstruction;
  });

  return (
    <div className="recipe-detailPage">
      {recipeDetail.image && <img src={recipeDetail.image} alt="" />}
      {recipeDetail.title && <h2>{recipeDetail.title}</h2>}
      {/* {recipeDetail.readyInMinutes && (
        <p className="recipeDetail-time">
          Ready In Minutes: {recipeDetail.readyInMinutes}
        </p>
      )} */}
      {summary && (
        <div>
          <p className="summary-heading">Recipe Summary</p>
          <p
            className="recipeDetail-summary"
            dangerouslySetInnerHTML={{ __html: summary }}
          ></p>
        </div>
      )}
      {instructions && (
        <div>
          <p className="summary-heading">Instructions for Making </p>
          <ol>
            {instructions.map((instruction, index) => (
              <li key={index} className="li">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;





// In this updated code, I added a step to remove any other HTML tags from the instructions by using a regular expression to match and remove anything between < and >. This ensures that only the text content of each instruction is displayed in the <li> tags, and the <ol> tags should not be visible on the page.