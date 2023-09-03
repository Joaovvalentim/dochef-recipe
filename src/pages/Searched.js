import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './Searched.css';

function Searched() {
  const [searchRecipies, setSearchRecipies] = useState([]);
  const [similarRecipies, setSimilarRecipies] = useState([]);
  let params = useParams();

  useEffect(() => {
    const getSearched = async (name) => {
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
      const recipes = await data.json();
      setSearchRecipies(recipes.results);
    };

    getSearched(params.search);
  }, [params.search]);

  useEffect(() => {
    if (searchRecipies.length > 0) {
      const firstRecipeId = searchRecipies[0].id;
      const getSimilarRecipies = async (id) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API_KEY}`);
        const recipes = await data.json();
        // Limita a lista de receitas similares a 4 itens
        setSimilarRecipies(recipes.slice(0, 4));
      };
      getSimilarRecipies(firstRecipeId);
    }
  }, [searchRecipies]);

  return (
    <div>
      <div className="wrapper">
        <h3>Voce Pesquisou Por: {params.search}</h3>
        <Splide
          options={{
            perPage: 6,
            arrows: false,
            pagination: false,
            breakpoints: {
              2000: {
                perPage: 5,
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
              980: {
                perPage: 2,
              },
              640: {
                perPage: 1,
              },
            },
            focus: 'center',
            gap: '2em',
            updateOnMove: true,
          }}
        >
          {searchRecipies.map((item) => {
            return (
              <SplideSlide key={item.id}>
              <div className="card-search">
                  <Link to={'/info/'+ item.id}>
                      <img src={item.image} alt={item.title} />
                      <div className="gradient-search" />
                      <p className="title-search">{item.title}</p>
                  </Link>
              </div>
          </SplideSlide>
            );
          })}
        </Splide>
      </div>
      {similarRecipies.length > 0 && (
        <div className="wrapper">
          <h3>Receitas Similares:</h3>
          <ul>
            {similarRecipies.map((item) => {
              return (
                <li key={item.id}>

                  <div className='list-similar'>
                    <a href={item.sourceUrl}>{item.title}</a>
                  </div>

                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Searched;
