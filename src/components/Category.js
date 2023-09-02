import React, { useState } from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import './Category.css';

function Category() {
  // Inicializa o estado para controlar qual link está ativo
  const [activeLink, setActiveLink] = useState(null);

  // Função para definir o link ativo
  const setActive = (index) => {
    setActiveLink(index);
  };

  return (
    <div className='list'>
      <NavLink
        className={`styledlink ${activeLink === 0 ? 'active' : ''}`}
        onClick={() => setActive(0)}
        to={'/receita/italian'}
      >
        <FaPizzaSlice />
        <h4>Italiano</h4>
      </NavLink>
      <NavLink
        className={`styledlink ${activeLink === 1 ? 'active' : ''}`}
        onClick={() => setActive(1)}
        to={'/receita/american'}
      >
        <FaHamburger />
        <h4>Americano</h4>
      </NavLink>
      <NavLink
        className={`styledlink ${activeLink === 2 ? 'active' : ''}`}
        onClick={() => setActive(2)}
        to={'/receita/thai'}
      >
        <GiNoodles />
        <h4>Thailandes</h4>
      </NavLink>
      <NavLink
        className={`styledlink ${activeLink === 3 ? 'active' : ''}`}
        onClick={() => setActive(3)}
        to={'/receita/japanese'}
      >
        <GiChopsticks />
        <h4>Japones</h4>
      </NavLink>
    </div>
  );
}

export default Category;
