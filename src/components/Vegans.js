import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoriteSlice"; 
import iconFavorite from '../img/favorite.png'
import iconUnFavorite from '../img/unfavorite.png'
import '@splidejs/react-splide/css';
import './Vegans.css'; 

function Vegans() {
    const [vegan, setVegan] = useState([]);
    const favorites = useSelector((state) => state.favorites); // Obtendo a lista de favoritos do Redux
    const dispatch = useDispatch(); // Obtendo a função de despacho do Redux

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
            const serializedData = JSON.stringify(data.recipes);
            localStorage.setItem("vegan", serializedData);
            setVegan(data.recipes)
        }
    }

    // Função para salvar os favoritos no localStorage
    const saveFavoritesToLocalStorage = (favorites) => {
        const serializedFavorites = JSON.stringify(favorites);
        localStorage.setItem("favorites", serializedFavorites);
    }

    // Função para adicionar ou remover favorito
    const toggleFavorite = (recipe) => {
        if (isFavorite(recipe.id)) {
            // Remova dos favoritos usando o Redux
            dispatch(removeFromFavorites({ recipeId: recipe.id }));

            // Obtém a lista atualizada de favoritos após a remoção
            const updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);

            // Salva os favoritos atualizados no localStorage
            saveFavoritesToLocalStorage(updatedFavorites);
        } else {
            // Adicione aos favoritos usando o Redux
            dispatch(addToFavorites({ recipe }));

            // Obtém a lista atualizada de favoritos após a adição
            const updatedFavorites = [...favorites, recipe];

            // Salva os favoritos atualizados no localStorage
            saveFavoritesToLocalStorage(updatedFavorites);
        }
    }

    // Função para verificar se a receita é favorita
    const isFavorite = (recipe) => {
        return favorites.some((favorite) => favorite.id === recipe.id);
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
                        gap: '15px',
                    }}>
                    {vegan.map((recipe) => {
                        const isFavorited = isFavorite(recipe);
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
                                        onClick={() => toggleFavorite(recipe)}
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
