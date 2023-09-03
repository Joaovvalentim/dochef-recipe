import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  return (
    <div className={`detail-wrapper ${isMobile ? 'mobile-layout' : ''}`}>
      <div className="image-details">
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
        <div className="info-text">
          <h2>Curiosidade sobre {details.title}</h2>
          <h6 className="summary-image" dangerouslySetInnerHTML={{ __html: details.summary }}></h6>
        </div>
      </div>
      <div className="info">
        <div className='buttons-container'>
          <button className={activeButton === 'instruções' ? 'active' : ''} onClick={() => setActiveButton('instruções')}>
            Instruções
          </button>
          <button className={activeButton === 'ingredientes' ? 'active' : ''} onClick={() => setActiveButton('ingredientes')}>
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