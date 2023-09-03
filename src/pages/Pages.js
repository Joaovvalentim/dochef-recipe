import React from 'react'
import Home from './Home'
import Recipies from './Recipies'
import Searched from './Searched'
import InfoRecipie from './InfoRecipie'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function Pages() {

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/receita/:type' element={<Recipies />} />
        <Route path='/pesquisa/:search' element={<Searched />} />
        <Route path='/info/:name' element={<InfoRecipie />} />
      </Routes>
    </AnimatePresence>
  )
}

export default Pages