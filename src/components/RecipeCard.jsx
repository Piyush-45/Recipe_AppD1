import React, { useState } from "react";
import heart from "../images/heart.png";
import timerequired from "../images/timerequired.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { db } from "../../context/Firebase";
import { UserAuth } from "../../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { async } from "@firebase/util";

const RecipeCard = ({ title, image }) => {
  return (
    <div className="recipe_Card ">
      <div className="recipe_Card__top">
        <img src={image} alt="" className="main_image" />
        <div className="p">
          <p className="recipe_card__title ">{title}</p>
          {/* <img src={heart} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export const RecipeCardBottom = ({ id ,title, image }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  // console.log(user)
  const recipeId = doc(db, "users", `${user?.email}`);

  const saveRecipe = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(recipeId, {
        savedRecipes: arrayUnion({
          id: id,
          title: title,
          img: image,
        }),
      });
    } else {
      alert("please login to save your recipe");
    }
  };
  return (
    <div className="recipe_card__bottom">
      <div className="timeRequired">
        {/* <img src={timerequired} className="like" alt="" /> */}
        {/* <p className="time_required">{readyInMinutes} minutes</p> */}
        <Link to={`similarrecipe/${id}`}>
          <p className="time_required">Similar Recipes</p>
        </Link>
      </div>
      <p onClick={saveRecipe} className="likepara">
        {like ? (
          <FcLike className="like" />
        ) : (
          <AiOutlineHeart className="like" />
        )}
      </p>
    </div>
  );
};

export default RecipeCard;
