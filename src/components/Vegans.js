import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './Trending.css';

function Vegans() {
  const [vegan, setVegan] = useState([]);

  useEffect(() => {
      getVegan();
  }, []);

  const getVegan = async () => {

      const check = localStorage.getItem('vegan');
      if(check){
        setVegan(JSON.parse(check));
      }else{
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
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
        }}>
            {vegan.map((recipe) => {
                return (
                    <SplideSlide key={recipe.id}>
                        <div className="card">
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title} />
                            <div className="gradient"/>
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