import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import '@splidejs/react-splide/css';
import './Trending.css';

function Vegans() {
  const [vegan, setVegan] = useState([]);

  useEffect(() => {
    getVegan();
  }, []);

  const getVegan = async () => {

    const check = localStorage.getItem('vegan');
    if (check) {
      setVegan(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`)
      const data = await api.json()
      localStorage.setItem("vegan", JSON.stringify(data.recipes))
      setVegan(data.recipes)
    }
  }



  return (
    <div>
      <div className="wrapper">
        <h3>Receitas Vegetarianas</h3>
        <Splide
          options={{
            perPage: 8,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '2rem',
            // drag: 'free',
            breakpoints: {
              1629: {
                perPage: 4,

              },
              1280: {
                perPage: 3,

              },
              1024: {
                perPage: 3,

              },
              912: {
                perPage: 2,

              },
              640: {
                perPage: 1,

              },
            },
            focus: "center",
            updateOnMove: true,
          }}>
          {vegan.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className="card">
                  <Link to={'/info/' + recipe}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="gradient" />
                    <p className="title-trending">{recipe.title}</p>
                  </Link>
                </div>
              </SplideSlide>
            )
          })}
        </Splide>
      </div>
    </div>
  )
}

export default Vegans