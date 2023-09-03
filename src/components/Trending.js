import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoriteSlice";
import iconFavorite from '../img/favorite.png'
import iconUnFavorite from '../img/unfavorite.png'
import '@splidejs/react-splide/css';
import './Trending.css';

function Trending() {
    const [trending, setTrending] = useState([]);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        getTrending();
    }, []);

    useEffect(() => {
        // Você não precisa mais armazenar os favoritos no localStorage aqui
    }, [favorites]);

    const getTrending = async () => {
        const check = localStorage.getItem('trending');
        if (check) {
            setTrending(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`)
            const data = await api.json()
            localStorage.setItem("trending", JSON.stringify(data.recipes))
            setTrending(data.recipes)
        }
    }

    const toggleFavorite = (recipeId) => {
        if (favorites.includes(recipeId)) {
            // Remova dos favoritos usando o Redux
            dispatch(removeFromFavorites(recipeId));
        } else {
            // Adicione aos favoritos usando o Redux
            dispatch(addToFavorites(recipeId));
        }
    }

    const isFavorite = (recipeId) => {
        return favorites.includes(recipeId);
    }

    return (
        <div>
            <div className="wrapper">
                <h3>Receitas Polares</h3>
                <Splide
                    options={{
                        perPage: 8,
                        arrows: false,
                        pagination: false,
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
                        gap: '15px',
                    }}>
                    {trending.map((recipe) => {
                        const isFavorited = isFavorite(recipe.id);
                        return (
                            <SplideSlide key={recipe.id}>
                                <div className="card">
                                    <Link to={'/info/' + recipe.id}>
                                        <img className='recipe-image ' src={recipe.image} alt={recipe.title} />
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

export default Trending;