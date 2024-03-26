import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import Homepage from './pages/Homepage';
import TVshows from './pages/TVshows';
import Detailpage from './pages/detailpage';
import Categoriespage from './pages/Categoriespage';
const RouterComponent = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/Tvshows" element={<TVshows/>} />
                    <Route path="/detailpage" element={<Detailpage/>} />
                <Route path="/categories" element={<Categoriespage/>} />

                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default RouterComponent;
