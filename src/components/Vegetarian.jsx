import React, { useEffect, useState } from "react";
import RecipeCard, { RecipeCardBottom } from "./RecipeCard";
import { Link } from "react-router-dom";
import SimilarRecipes from "./SimilarRecipes";

const Vegetarian = () => {
  const key1 = `62bd0b953b6c4a50a3fff4e27084d94c`;
  const key2 = " 7d8e3d34745c4731b1da758cdad1b008";
  const APi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=817073eab2c64effbdbffe3f78543ae2&query=vegetarian&number=10`;

  const [vegetarian, setVegetarian] = useState(null);
  const [nextPage, setNextPage] = useState(2); // set default page to 2

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

  const fetchMoreData = async () => {
    const moreRecipes = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=817073eab2c64effbdbffe3f78543ae2&query=vegetarian&number=10&page=${nextPage}`
    );
    const data = await moreRecipes.json();
    setVegetarian((prevRecipes) => [...prevRecipes, ...data.results]);
    setNextPage(nextPage + 1);
  };

  useEffect(() => {
    fetchVegetarian(APi);
  }, []);

  return (
    <>
      <h1 id="vegetarian">Our Vegetarian Pick</h1>
      <div className="vegetarian recipes_container">
        {vegetarian !== null &&
          vegetarian.map((item) => {
            const { id, title, image, readyInMinutes } = item;
            return (
              <div className="recipe_Card" key={id}>
                <Link key={id} to={`/recipe/${id}`} className="home-link">
                  <RecipeCard key={id} title={title} image={image} />
                </Link>
                <RecipeCardBottom
                  similarRecipes={<SimilarRecipes id={id} />}
                  id={id}
                  title={title}
                  image={image}
                />
              </div>
            );
          })}
      </div>
      {/* Add button to fetch more data */}
      {vegetarian !== null && vegetarian.length >= 10 && (
        <div className="load-more">
          <button onClick={fetchMoreData}>Load More</button>
        </div>
      )}
    </>
  );
};

export default Vegetarian;


// ? using offset

// import React, { useEffect, useState } from "react";
// import RecipeCard, { RecipeCardBottom } from "./RecipeCard";
// import { Link } from "react-router-dom";
// import SimilarRecipes from "./SimilarRecipes";

// const Vegetarian = () => {
//   const APi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=817073eab2c64effbdbffe3f78543ae2&query=vegetarian&number=10`;

//   const [vegetarian, setVegetarian] = useState([]);
//   const [page, setPage] = useState(1);

//   const fetchVegetarian = async (url) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setVegetarian((prevVegetarian) => [...prevVegetarian, ...data.results]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchVegetarian(APi);
//   }, []);

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   useEffect(() => {
//     if (page > 1) {
//       const moreRecipes = `${APi}&offset=${(page - 1) * 10}`;
//       fetchVegetarian(moreRecipes);
//     }
//   }, [page]);

//   return (
//     <>
//       <h1 id="vegetarian">Our Vegetarian Pick</h1>
//       <div className="vegetarian recipes_container">
//         {vegetarian.map((item) => {
//           const { id, title, image, readyInMinutes } = item;
//           return (
//             <div className="recipe_Card" key={id}>
//               <Link key={id} to={`/recipe/${id}`} className="home-link">
//                 <RecipeCard key={id} title={title} image={image} />
//               </Link>
//               <RecipeCardBottom
//                 similarRecipes={<SimilarRecipes id={id} />}
//                 id={id}
//                 title={title}
//                 image={image}
//               />
//             </div>
//           );
//         })}
//       </div>
//       {vegetarian.length > 0 && (
//         <div className="load-more">
//           <button onClick={handleLoadMore}>Load More</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Vegetarian;
