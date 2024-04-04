import React from 'react'
import Main from '../components/homepage/main/main'
import Overviewrental from '../components/homepage/overviewrental/overviewrental'
import Platforms from '../components/homepage/platforms/platforms'
import Firestick from '../components/homepage/firestick/firestick'
import Footer from '../components/footer/footer'
const Homepage = () => {
  return (
    <div>
      <Main />
      <Overviewrental />
      <Platforms />
      <Firestick />
      <Footer/>
    </div>
  )
}

export default Homepage
