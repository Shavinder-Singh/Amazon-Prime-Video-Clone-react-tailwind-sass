import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Movies from './pages/Movies';
import Homepage from './pages/Homepage';
import Detailpage from './pages/detailpage';
import Categoriespage from './pages/Categoriespage';
import SearchResults from './pages/SearchResults';
import SignInPage from './pages/Signinpage/SignInPage';
import RentMovies from './pages/RentMovies';
import OtpPage from './pages/Signinpage/OtpPage';
import SignupPage from './pages/Signinpage/SignupPage';
import Detailmain from './components/detailpage/detailmain/detailmain';
import AllMoviesscroller from './components/Allmovies/allmoviesscroller/Allmoviesscroller';
import AllMovies from './pages/AllMovies';
import Footer from './components/footer/footer';
import FreeMovies from './pages/FreeMovies';
const RouterComponent = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/categories" element={<Categoriespage />} />
                    <Route path="/searchresults" element={<SearchResults />} />
                    <Route path="/signinpage" element={<SignInPage />} />
                    <Route path="/Rent" element={<RentMovies />} />
                    <Route path="/Otppage" element={<OtpPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/detailpage" element={<Detailpage />} />
                    <Route path="/detailmain/:detailImdbId" element={<Detailmain />} />
                    <Route path="/searchresults/:imdbID" element={<SearchResults />} />
                    <Route path="/allmoviesscroller" element={<AllMoviesscroller />} />
                    <Route path="/allmovies/:genre" element={<AllMovies />} />
                    <Route path="/freemovies/:imdbID" element={<FreeMovies />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default RouterComponent;
