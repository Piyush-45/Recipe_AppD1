// ! RANDOM RECIPE => SLIDE
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";

const RandomRecipe = () => {
  const key = "2af405af41b84ff6a4b8f0cea79b1c5a"; // tyagiharsh
  const key2 = " 7d8e3d34745c4731b1da758cdad1b008";
  const Api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=2af405af41b84ff6a4b8f0cea79b1c5a&cuisine=American,Spanish,Indian&number=12`;

  const [randomRecipe, setRandomRecipe] = useState([]);

  const fetchRandomRecipe = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRandomRecipe(data.results);
      // console.log(data.results)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRandomRecipe(Api);
  }, []);

  return (
    <div className="hero_swiper" id="all_recipes">
      {/* {randomRecipe.length > 0 && ( */}
        <Swiper
          key={randomRecipe.length}
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          // }}
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // 1024: {
            //   slidesPerView: 5,
            //   spaceBetween: 50,
            // },
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {randomRecipe.map((item) => {
            const { id, title, image } = item;
            return (
              <Link key={id} to={`/recipe/${id}`}>
                <SwiperSlide className="swiperSlide" key={id}>
                  <Link to={`/recipe/${id}`}>
                  <img src={image} alt="" />
                  </Link>
                  <div className="swiper-slide-bottom">
                    <p className="main_dish">Main Dish</p>
                    <p className="swiper_title">{title}</p>
                  </div>
                </SwiperSlide>
              </Link>
            );
          })}
        </Swiper>
    
    </div>
  );
};

export default RandomRecipe;
