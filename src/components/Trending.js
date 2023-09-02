import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './Trending.css';

// import CardTrending from "./CardTrending";
function Trending() {

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        getTrending();
    }, []);

    const getTrending = async () => {

        const check = localStorage.getItem('trending');
        if(check){
            setTrending(JSON.parse(check));
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`)
            const data = await api.json()
            localStorage.setItem("trending", JSON.stringify(data.recipes))
            setTrending(data.recipes)
        }
    }

    return (
        <div>
            <div className="wrapper">
                <h3>Receitas Polares</h3>
                <Splide 
                options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem',
                }}>
                    {trending.map((recipe) => {
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


export default Trending;
