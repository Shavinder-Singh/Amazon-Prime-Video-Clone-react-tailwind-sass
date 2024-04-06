import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FreeMovies = () => {
    const [data, setData] = useState(null);
    const { imdbID } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=eae86d55`);
                const movieData = response.data;
                if (movieData.Response === "True") {
                    setData(movieData);
                } else {
                    setData(null);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className='w-full h-[92vh] bg-black flex flex-col gap-3 px-5 pt-3 md:pl-10 lg:pl-[74px] lg:pt-4 '>
            <button className='text-black rounded-3xl font-bold p-3 hover:scale-110 transition-all bg-white max-w-40 lg:mb-5 lg:max-w-36 lg:text-[20px] lg:py-2 lg:px-0'>
                Free to me
            </button>
            {data && <h2 className='text-white font-bold tracking-wide lg:text-[20px]'>We didn't find any matches for " {data.Title}"</h2>}
        </div>
    )
}

export default FreeMovies;
