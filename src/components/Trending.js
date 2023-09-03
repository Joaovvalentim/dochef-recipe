import { useEffect, useState } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from "react-router-dom";
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
        if (check) {
            setTrending(JSON.parse(check));
        } else {
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
                        perPage: 8,
                        arrows: false,
                        pagination: false,
                        // drag: 'free',
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
                        return (
                            <SplideSlide key={recipe.id}>
                                <div className="card">
                                    <Link to={'/info/'+ recipe.id}>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <div className="gradient" />
                                        <p className="title-trending">{recipe.title}</p>
                                    </Link>
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
