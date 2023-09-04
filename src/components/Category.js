import React, { useState } from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { MdOutlineFavorite } from 'react-icons/md';
import { NavLink, Link } from 'react-router-dom';
import  logo  from "../img/logo.png"
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
      <div className="nav">
        <Link to={'/'} className="logo">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className='litsnavlink'>
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
        <NavLink
          className={`styledlink ${activeLink === 4 ? 'active' : ''}`}
          onClick={() => setActive(4)}
          to={'/favoritos'}
        >
          <MdOutlineFavorite />
          <h4>Favoritos</h4>
        </NavLink>
      </div>

    </div>
  );
}

export default Category;
