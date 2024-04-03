import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Movies from './pages/Movies';
import Homepage from './pages/Homepage';
import TVshows from './pages/TVshows';
import Detailpage from './pages/detailpage';
import Categoriespage from './pages/Categoriespage';
import SearchResults from './pages/SearchResults';
import SignInPage from './pages/Signinpage/SignInPage';
import RentMovies from './pages/RentMovies';
import OtpPage from './pages/Signinpage/OtpPage';
import SignupPage from './pages/Signinpage/SignupPage';
import Detailmain from './components/detailpage/detailmain/detailmain';
const RouterComponent = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/Tvshows" element={<TVshows />} />
                    <Route path="/categories" element={<Categoriespage />} />
                    <Route path="/searchresults" element={<SearchResults />} />
                    <Route path="/signinpage" element={<SignInPage />} />
                    <Route path="/Rent" element={<RentMovies />} />
                    <Route path="/Otppage" element={<OtpPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/detailpage" element={<Detailpage />} />
                    <Route path="/detailmain/:detailImdbId" element={<Detailmain />} />
                    <Route path="/searchresults/:imdbID" element={<SearchResults />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default RouterComponent;
