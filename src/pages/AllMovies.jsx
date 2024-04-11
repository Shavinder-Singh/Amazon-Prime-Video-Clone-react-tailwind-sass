import React from 'react'
import Allmoviesmain from '../components/Allmovies/allmoviemain/Allmoviesmain'
import AllMoviesscroller from '../components/Allmovies/allmoviesscroller/Allmoviesscroller'
import Footer from '../components/footer/footer'



const AllMovies = () => {
    return (
        <div>
            <Allmoviesmain />
            <AllMoviesscroller />
            <Footer />
        </div>
    )
}

export default AllMovies
