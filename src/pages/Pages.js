import React from 'react'
import Home from './Home'
import Recipies from './Recipies'
import Searched from './Searched'
import InfoRecipie from './InfoRecipie'
import { Route, Routes } from 'react-router-dom'


function Pages() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/receita/:type' element={<Recipies/>}/>
        <Route path='/pesquisa/:search' element={<Searched/>}/>
        <Route path='/info/:name' element={<InfoRecipie/>}/>
      </Routes>
  ) 
}

export default Pages