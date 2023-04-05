import React from 'react'
import RandomRecipe from '../RandomRecipe'
import Popular from '../components/Popular'
import Vegetarian from '../components/Vegetarian'

const Home = () => {
  return (
    <>
    <RandomRecipe/>
    <Popular/>
    <Vegetarian/>
    </>
  )
}

export default Home
