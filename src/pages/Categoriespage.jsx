import React, { useEffect } from 'react'

import genreimage1 from '../assets/image/categoriespageimages/genre1.webp'
import genreimage2 from '../assets/image/categoriespageimages/genre2.webp'
import genreimage3 from '../assets/image/categoriespageimages/genre3.webp'
import genreimage4 from '../assets/image/categoriespageimages/genre4.webp'
import genreimage5 from '../assets/image/categoriespageimages/genre5.webp'
import genreimage6 from '../assets/image/categoriespageimages/genre6.webp'
import genreimage7 from '../assets/image/categoriespageimages/genre7.webp'
import genreimage8 from '../assets/image/categoriespageimages/genre8.webp'
import genreimage9 from '../assets/image/categoriespageimages/genre9.webp'
import genreimage10 from '../assets/image/categoriespageimages/genre10.webp'
import genreimage11 from '../assets/image/categoriespageimages/genre11.webp'

import categoriesimage from '../assets/image/categoriespageimages/categories1.webp'
import '../components/categoriespage/categoriespage.scss'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { useNavigate } from 'react-router-dom';


const Categoriespage = () => {
    const navigate = useNavigate();

    const handleRedirect = async (genre) => {
        try {
            const response = await fetch(`https://omdbapi.com/?s=${genre}&apikey=eae86d55`);
            const data = await response.json();
            const imdb = data.imdbID;
            if (data.Response === 'True') {
                navigate(`/allmovies/${genre}`);

            } else {
                // setSelectedMovie(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <div>
                <div className='categories_page px-6 lg:px-[44px] pb-[40px] bg-black  z-[0] relative'>
                    <h1 class="Categories text-[24px] lg:text-2 pt-[3px] pb-[5px] tracking-[0.5px] text-white cursor-default">Categories</h1>
                    <div className='Genres_categories_wrapper pt-0 mb-10 '>
                        <span className='genres_content_categories text-white font-bold tracking-wider block mb-[6px]  cursor-default'>
                            Genres
                        </span>
                        <div className='genres_categories_media grid grid-cols-2 gap-3'>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('adventure')}>
                                <img src={genreimage1} className='rounded-lg bg-center' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-5'>Action and <br />adventure</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('anime')}>
                                <img src={genreimage2} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Anime</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('comedy')} >
                                <img src={genreimage3} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Comedy</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('documentary')}>
                                <img src={genreimage4} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Documentary</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('drama')}>
                                <img src={genreimage5} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Drama</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('fantasy')}>
                                <img src={genreimage6} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Fantasy</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('horror')}>
                                <img src={genreimage7} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Horror</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('kids')}>
                                <img src={genreimage8} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Kids</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('mystery')}>
                                <img src={genreimage9} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-5'>Mystery and thrillers</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('romance')}>
                                <img src={genreimage10} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Romance</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('science')}>
                                <img src={genreimage11} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Science</h1>
                            </div>


                        </div>
                    </div>
                    <div className='Genres_categories_wrapper pt-0 lg:pb-14'>
                        <span className='genres_content_categories text-white font-bold tracking-wider block mb-[6px] cursor-default'>
                            Featured collections
                        </span>
                        <div className='genres_categories_media grid grid-cols-2 gap-3 '>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('hindi')}>
                                <img src={categoriesimage} className='rounded-lg' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Hindi</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('english')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>English</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('telugu')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Telugu</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('tamil')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Tamil</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('malayalam')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Malayalam</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('kannada')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Kannada</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('marathi')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Marathi</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('punjabi')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Punjabi</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('gujarati')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Gujarati</h1>
                            </div>
                            <div className=' relative flex justify-left items-center cursor-pointer' onClick={() => handleRedirect('bengali')}>
                                <img src={categoriesimage} className='rounded-md' />
                                <h1 className='absolute z-10 text-white font-bold lg:text-[19px] pl-2 lg:pl-3 leading-6'>Bengali</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>

        </>
    )
}

export default Categoriespage
