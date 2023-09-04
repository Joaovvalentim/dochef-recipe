import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Favorites.css';

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [searchFavorites, setSearchFavorites] = useState([]);

  useEffect(() => {
    // Recupere os favoritos gerais do localStorage (substitua 'favorites' pela chave correta)
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteRecipes(storedFavorites);

    // Recupere os favoritos de pesquisa do localStorage (substitua 'searchFavorites' pela chave correta)
    const storedSearchFavorites = JSON.parse(localStorage.getItem('searchFavorites')) || [];
    setSearchFavorites(storedSearchFavorites);
  }, []);

  const removeFavorite = (recipeId, type) => {
    // Remove o favorito do estado e do localStorage
    if (type === 'general') {
      const updatedFavorites = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
      setFavoriteRecipes(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else if (type === 'search') {
      const updatedSearchFavorites = searchFavorites.filter((recipe) => recipe.id !== recipeId);
      setSearchFavorites(updatedSearchFavorites);
      localStorage.setItem('searchFavorites', JSON.stringify(updatedSearchFavorites));
    }
  };

  return (
    <motion.div
      className="grid"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="favorites-container">
        <h2>Meus Favoritos</h2>

        <div className="favorite-section">
          <h3>Favoritos Gerais</h3>
          <div className="favorite-list">
            {favoriteRecipes.map((recipe) => (
              <div className="favorite-item" key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <button onClick={() => removeFavorite(recipe.id, 'general')}>Remover Favorito</button>
                {/* Adicione outros detalhes da receita, se necessário */}
              </div>
            ))}
          </div>
        </div>

        <div className="favorite-section">
          <h3>Favoritos de Pesquisa</h3>
          <div className="favorite-list">
            {searchFavorites.map((recipe) => (
              <div className="favorite-item" key={recipe.id}>
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <button onClick={() => removeFavorite(recipe.id, 'search')}>Remover Favorito</button>
                {/* Adicione outros detalhes da receita, se necessário */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Favorites;
