import React from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Search.css';

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/pesquisa/' + input);
  }

  return (
    <div className='formstyle'>
      <div className='form-content'>
        <form onSubmit={submitHandler}>
          <div className='search-container'>
            <div className='search-input-container'>
              <FaSearch className='search-icon' />
              <input
                placeholder="o que vamos comer hoje?"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                type="text"
                value={input}
                className='search-input'
              ></input>
            </div>
          </div>
        </form>
        <p className='dicas'>Pesquise por receitas como: Muffin, Sandwich, Cookie.</p>
      </div>
    </div>
  );
}

export default Search;
