import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './InfoRecipie.css';

function InfoRecipie() {

  let params = useParams()
  const [details, setDetails] = useState({});
  const [activeButton, setActiveButton] = useState("instruções")

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();
    setDetails(detailData)
  }

  useEffect(() => {
    fetchDetails()
    // eslint-disable-next-line
  }, [params.name])

  return (
    <div className='detail-wrapper'>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <div className='info'>
        <button className={activeButton === "instruções" ? 'active' : ''} onClick={() => setActiveButton("instruções")}>Instruções</button>
        <button className={activeButton === "ingredientes" ? 'active' : ''} onClick={() => setActiveButton("ingredientes")}>Ingredientes</button>
        {activeButton === 'instruções' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeButton === 'ingredientes' && (
          <div>
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}> {ingredient.original} </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoRecipie