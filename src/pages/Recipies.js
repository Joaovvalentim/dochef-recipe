import { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Recipies.css';



function Recipies() {
  const [cousine, setCousine] = useState([])
  let params = useParams()


  const getRecipe = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
    const recipes = await data.json()
    setCousine(recipes.results)
  }

  useEffect(() => {
    getRecipe(params.type)
  }, [params.type]);

  return (
    <motion.div 
    className='grid' 
    animate={{ opacity: 1}}
    initial={{ opacity: 0}}
    exit={{opacity: 0}}
    transition={{
      duration: 0.8,
    }}
    >
      {cousine.map((item) => {
        return (
          <div className='card-type' key={item.id}>
            <Link to={'/info/'+ item.id}>
              <h4>{item.title}</h4>
              <img src={item.image} alt="" />
            </Link>
          </div>
        )
      })}
    </motion.div>
  )
}

export default Recipies