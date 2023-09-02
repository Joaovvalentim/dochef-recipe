import React from 'react'
import Home from './Home'
import Recipies from './Recipies'
import { Route, Routes } from 'react-router-dom'

function Pages() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/receita/:type' element={<Recipies/>}/>
      </Routes>
  ) 
}

export default Pages