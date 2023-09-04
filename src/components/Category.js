import React, { useState } from 'react';
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
