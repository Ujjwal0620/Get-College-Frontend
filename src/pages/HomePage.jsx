import React from 'react'
import HeroBanner from '../components/HomeComponents/HeroBanner'
import Advertisment from '../components/HomeComponents/Advertisment'
import TopCities from '../components/HomeComponents/CollegeFinder'
import CollegeFinder from '../components/HomeComponents/CollegeFinder'
import ExamsPage from './ExamsPage'

const HomePage = () => {
  return (
    <div>
      <HeroBanner/>
      <Advertisment/>
      <CollegeFinder/>
      <ExamsPage />
    </div>
  )
}

export default HomePage
