import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import iconFavorite from '../img/favorite.png';
import iconUnFavorite from '../img/unfavorite.png';
import './InfoRecipie.css';

function InfoRecipie() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeButton, setActiveButton] = useState('instruções');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Recupere os favoritos do localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('recipeFavorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      // Remova dos favoritos
      const updatedFavorites = favorites.filter(id => id !== recipeId);
      setFavorites(updatedFavorites);
    } else {
      // Adicione aos favoritos
      const updatedFavorites = [...favorites, recipeId];
      setFavorites(updatedFavorites);
    }
  }

  useEffect(() => {
    // Atualize o localStorage quando os favoritos mudarem
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line
  }, [params.name]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  }

  return (
    <div className={`detail-wrapper ${isMobile ? 'mobile-layout' : ''}`}>
      <div className="image-details">
        <h2>{details.title}</h2>
        <div className='image-info'>
          <img src={details.image} alt="" />
        </div>
        <div className='fav-container'>
          <button
            className={`favorite-button-info ${isFavorite(params.name) ? 'favorited' : ''}`}
            onClick={() => toggleFavorite(params.name)}
          >
            <img
              src={isFavorite(params.name) ? iconUnFavorite : iconFavorite}
              alt="Favorite Icon"
            />
          </button>
          <h2>Adicionar aos favoritos</h2>
        </div>

        <div className="info-text">
          <h2>Curiosidade sobre {details.title}</h2>
          <h6 className="summary-image" dangerouslySetInnerHTML={{ __html: details.summary }}></h6>
        </div>
      </div>
      <div className="info">
        <div className='buttons-container'>
          <button className={`button-info ${activeButton === 'instruções' ? 'active' : ''}`} onClick={() => setActiveButton('instruções')}>
            Instruções
          </button>
          <button className={`button-info ${activeButton === 'ingredientes' ? 'active' : ''}`} onClick={() => setActiveButton('ingredientes')}>
            Ingredientes
          </button>
        </div>
        {activeButton === 'instruções' && (
          <div className="container-infos">
            <h2>Como preparar:</h2>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeButton === 'ingredientes' && (
          <div className="container-infos">
            <h2>Ingredientes:</h2>
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}> {ingredient.original} </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoRecipie;
