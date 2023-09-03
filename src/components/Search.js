import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import './Search.css';

function Search() {

    const [input, setInput] = useState("")
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/pesquisa/' + input);
    }

    return (
        <form className='formstyle' onSubmit={submitHandler}>
            <div className='outline'>
                <FaSearch />
                <input placeholder="o que vamos comer hoje?" onChange={(e) => {
                    setInput(e.target.value)
                }} type="text" value={input} ></input>
                <p>Pesquise por receitas como: Muffin, Sandwich, Cookie.</p>
            </div>
        </form>
    )
}

export default Search