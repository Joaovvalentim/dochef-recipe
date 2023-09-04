import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToVeganFavorites, removeFromVeganFavorites, initializeVeganFavorites  } from '../store/veganFavoritesSlice.js'; // Importe as ações do novo slice
import iconFavorite from '../img/favorite.png';
import iconUnFavorite from '../img/unfavorite.png';
import '@splidejs/react-splide/css';
import './Trending.css';

function Vegans() {
  const [vegan, setVegan] = useState([]);
  const veganFavorites = useSelector((state) => state.veganFavorites); // Acesse os favoritos veganos do Redux
  const dispatch = useDispatch();

  useEffect(() => {
    getVegan();
  }, []);

  useEffect(() => {
    // Você pode armazenar os favoritos no localStorage aqui
    localStorage.setItem('veganFavorites', JSON.stringify(veganFavorites));
  }, [veganFavorites]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('veganFavorites'));
    if (storedFavorites) {
      dispatch(initializeVeganFavorites(storedFavorites)); // Inicialize os favoritos veganos com os valores do localStorage
    }
  }, [dispatch]);

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

  const toggleFavorite = (recipeId) => {
    if (veganFavorites.includes(recipeId)) {
      dispatch(removeFromVeganFavorites(recipeId)); // Remova dos favoritos veganos
    } else {
      dispatch(addToVeganFavorites(recipeId)); // Adicione aos favoritos veganos
    }
  }

  const isFavorite = (recipeId) => {
    return veganFavorites.includes(recipeId);
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
            breakpoints: {
              1920: {
                perPage: 6,
            },
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
            const isFavorited = isFavorite(recipe.id);
            return (
              <SplideSlide key={recipe.id}>
                <div className="card">
                  <Link to={'/info/' + recipe.id}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="gradient" />
                    <p className="title-trending">{recipe.title}</p>
                  </Link>
                  <button
                    className={`favorite ${isFavorited ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    <img
                      src={isFavorited ? iconUnFavorite : iconFavorite}
                      alt="icone"
                    />
                  </button>
                </div>
              </SplideSlide>
            )
          })}
        </Splide>
      </div>
    </div>
  )
}

export default Vegans;
