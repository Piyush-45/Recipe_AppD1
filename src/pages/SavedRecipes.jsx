import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../context/Firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setRecipes(doc.data()?.savedRecipes);
    });
  }, [user?.email]);

  const handleDeleteRecipe = async (recipeId) => {
    const userDoc = doc(db, "users", `${user?.email}`);
    await updateDoc(userDoc, {
      savedRecipes: recipes.filter((recipe) => recipe.id !== recipeId),
    });
  };

  return (
    <div className="recipes_container">
      {recipes.map((item) => {
        const { id, title, img } = item;
        return (
          <div key={id} className="recipe_Card">
            <Link to={`/recipe/${id}`}>
              <RecipeCard id={id}image={img} />
            </Link>
            <div className="card_footer">
              <h3 className="card_title">{title}</h3>
              <p className="delete-recipe" onClick={() => handleDeleteRecipe(id)}>
                <AiFillDelete className="delete-icon" />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SavedRecipes;
// import React from "react";
// import { useState, useEffect } from "react";
// import { db } from "../../context/Firebase";
// import { updateDoc, doc, onSnapshot } from "firebase/firestore";
// import { UserAuth } from "../../context/AuthContext";
// import RecipeCard from "../components/RecipeCard";
// import { Link } from "react-router-dom";
// import { AiFillDelete} from "react-icons/ai";
// import {AiOutlineShareAlt} from "react-icons/ai"
// import { MdClose } from "react-icons/md";

// const SavedRecipes = () => {
//   const [recipes, setRecipes] = useState([]);
//   const { user } = UserAuth();

//   useEffect(() => {
//     onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
//       setRecipes(doc.data()?.savedRecipes);
//     });
//   }, [user?.email]);

//   const handleDeleteRecipe = async (recipeId) => {
//     const userDoc = doc(db, "users", `${user?.email}`);
//     await updateDoc(userDoc, {
//       savedRecipes: recipes.filter((recipe) => recipe.id !== recipeId),
//     });
//   };

//   const handleShareRecipe = (recipeId) => {
//     const recipeUrl = `https://your-website.com/recipe/${recipeId}`;
//     if (navigator.share) {
//       navigator
//         .share({
//           title: "Check out this recipe",
//           text: "I found this recipe and thought you might like it!",
//           url: recipeUrl,
//         })
//         .then(() => console.log("Shared successfully"))
//         .catch((error) => console.log("Error sharing:", error));
//     } else {
//       // If the Web Share API is not supported, open a new window with the recipe URL
//       window.open(recipeUrl);
//     }
//   };

//   return (
//     <div className="recipes_container">
//       {recipes.map((item) => {
//         const { id, title, img } = item;
//         return (
//           <div className="recipe_card">
//             <Link to={`/recipe/${id}`}>
//               <RecipeCard id={id} title={title} image={img} />
//             </Link>
//             <div className="recipe_actions">
//               <button
//                 className="recipe_action"
//                 onClick={() => handleShareRecipe(id)}
//               >
//                 <AiOutlineShareAlt className="recipe_action_icon" />
//               </button>
//               <button
//                 className="recipe_action"
//                 onClick={() => handleDeleteRecipe(id)}
//               >
//                 <AiFillDelete className="recipe_action_icon" />
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SavedRecipes;
