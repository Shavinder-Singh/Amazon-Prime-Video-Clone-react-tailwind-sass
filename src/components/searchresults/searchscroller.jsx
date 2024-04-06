import React, { useEffect, useState } from 'react';
import Demoimage from '../../assets/image/categoriespageimages/demoimage.webp'
import axios from 'axios';
import './searchscroller.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const SearchScroller = () => {
    const { imdbID } = useParams();
    const [data, setdata] = useState(null);
    const [relateddata, setrelatedData] = useState(null);
    const [info, setinformation] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=eae86d55`);
                const data = response.data;
                if (data.Response === "True") {
                    setdata(data);
                    fetchGenre(data.Genre)
                } else {
                    setdata(null);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [imdbID]);
    const fetchGenre = async (genre) => {
        try {
            const Response = await axios.get(`https://omdbapi.com/?s=${genre}&apikey=eae86d55`);
            const data = Response.data;
            if (data.Response === 'True') {
                setrelatedData(data.Search);
                fetchinfo(data.Search)
            } else {
                console.log('Related movies not found');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchinfo = async (movies) => {
        try {
            const infoArray = [];
            for (const movie of movies) {
                const response = await axios.get(`https://omdbapi.com/?i=${movie.imdbID}&apikey=eae86d55`);
                const data = response.data;
                if (data.Response === 'True') {
                    infoArray.push(data);
                } else {
                    console.log('Error fetching movie info:', movie.imdbID);
                }
            }
            setinformation(infoArray);
        } catch (error) {
            console.log(error);
        }
    };
    const handleclick = async (detailImdbId) => {
        try {
            const response = await fetch(`https://omdbapi.com/?i=${detailImdbId}&apikey=eae86d55`);
            const data = await response.json();
            if (data.Response === 'True') {
                navigate(`/detailmain/${detailImdbId}`);
                console.log(data)
            } else {
                // setSelectedMovie(null);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //filters bigscreen
    const [freetome, setfreetome] = useState(true);
    const [genre, setgenre] = useState(true);
    const [videoQuality, setVidequality] = useState(true);
    const [contenttype, setcontenttype] = useState(true);
    const openfreetome = () => {
        setfreetome(!freetome)
        setgenre(true)
        setVidequality(true)
        setcontenttype(true)

    }
    const opengenre = () => {
        setgenre(!genre)
        setfreetome(true)
        setVidequality(true)
        setcontenttype(true)

    }
    const openvideoquality = () => {
        setVidequality(!videoQuality)
        setfreetome(true)
        setgenre(true)
        setcontenttype(true)
    }
    const opencontenttype = () => {
        setcontenttype(!contenttype)
        setgenre(true)
        setVidequality(true)
        setfreetome(true)

    }

    //filters
    const freePageRedirect = (imdbID) => {
        navigate(`/freemovies/${imdbID}`)
    }
    
    const handlegenre = (genre) => {
        fetchGenre(genre);
    }
    
    const qualityFilter = (imdbID) => {
        if (imdbID === "N/A") {
            alert("No Videos In 4k UHD")
        } else {
            fetchGenre(genre)
        }
    }
    return (
        <>
            <div className='search_page text-white px-6 bg-primary min-h-[120vh]'>
                <div className='search_filter'>
                    <div className='filters_options hidden'>
                        <div className='buttons mb-16 xl:mb-[61px]'>
                            <button onClick={() => openfreetome()} className='free_to_me relative text-[18px] flex items-center justify-between gap-3 font-semibold w-full rounded-lg bg-inputbgcolor tracking-wider'>
                                <div className='flex items-center  hover:bg-white hover:text-black gap-2 p-3 rounded-lg'> Free to me
                                    {freetome ? (
                                        <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    ) : (
                                        <span className='w-3 h-3'><svg className='w-3 h-3 rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    )}</div>
                                {freetome ? (<div className='free_to_me_drop_down hidden text-[18px] absolute left-0 bottom-[-48px] py-3  px-[25px] bg-secondary w-full'>
                                    Free to me
                                </div>) : (<div className='free_to_me_drop_down hover:bg-white hover:text-black text-[18px] absolute left-0 bottom-[-48px] py-3  px-[25px] rounded-b-md bg-secondary w-full'>
                                    {data && (<p onClick={() => freePageRedirect(data.imdbID)}>  Free to me <span className='text-[0px]'>{data.imdbID}</span></p>)}
                                </div>)}
                            </button>
                            <button onClick={() => opengenre()} className='genre  relative text-[18px] flex items-center justify-between font-semibold w-full rounded-lg  bg-inputbgcolor tracking-wider'>
                                <div className='flex items-center  hover:bg-white hover:text-black gap-2 p-3 rounded-lg '>Genre
                                    {genre ? (
                                        <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    ) : (
                                        <span className='w-3 h-3'><svg className='w-3 h-3 rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    )}</div>
                                {genre ? (
                                    <div className='w-[180px] hidden  flex-col items-start absolute left-0 bottom-[-330px] z-10  py-3  px-[25px] rounded-b-md bg-secondary'>
                                        <span>Action</span>
                                        <span>Adventure</span>
                                        <span>Comedy</span>
                                        <span>Drama</span>
                                        <span>Kids & Family</span>
                                        <span>Special Interest</span>
                                        <span>Suspense</span>
                                    </div>

                                ) : (

                                    <div className='w-[210px] flex flex-col items-start absolute left-0 top-12 z-10 rounded-b-md bg-secondary'>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('action')}>Action</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('adventure')}>Adventure</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('comedy')}>Comedy</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('drama')}>Drama</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('documentray')}>Documentray</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('fantasy')}>Fantasy</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('horror')}>Horror</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('international')}>International</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('kids')}>Kids & Family</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('military')}>Military & War</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black' onClick={() => handlegenre('romance')}>Romance</span>
                                        <span className='w-full text-left px-4 py-2 hover:bg-white hover:text-black hover:rounded-b-md' onClick={() => handlegenre('science')}>Science Fiction</span>
                                    </div>
                                )}
                            </button>
                            <button onClick={() => openvideoquality()} className='videoQuality relative text-[18px] hover:fill-black flex items-center justify-between gap-3 lg:gap-9 font-semibold w-full rounded-lg  bg-inputbgcolor tracking-wider'>
                                <div className='flex items-center  hover:bg-white hover:text-black gap-2 p-3 rounded-lg'> Video Quality
                                    {videoQuality ? (
                                        <span className='w-3 h-3'><svg className='w-3 h-3 hover:fill-black' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    ) : (
                                        <span className='w-3 h-3'><svg className='w-3 h-3 hover:fill-black rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    )}</div>
                                {videoQuality ? (<div className='flex hidden items-center absolute left-0 bottom-[-48px] py-3  px-[25px] rounded-b-md bg-secondary w-full'>
                                    <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                    <h1 className='text-[18px] '>4K UHD</h1>
                                </div>) : (<div className='flex hover:bg-white hover:text-black items-center absolute left-0 bottom-[-48px] py-3  px-[25px] rounded-b-md bg-secondary w-full'>
                                    <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                    <h1 className='text-[18px] ' onClick={() => qualityFilter(data.Metascore)}>4K UHD</h1>
                                </div>)}
                            </button>
                            <button onClick={() => opencontenttype()} className='content_type relative text-[18px] hover:fill-black flex items-center justify-between gap-3 lg:gap-9 font-semibold w-full rounded-lg  bg-inputbgcolor tracking-wider'>
                                <div className='flex items-center  hover:bg-white hover:text-black gap-2 p-3 rounded-lg' onClick={()=>handlegenre('tv')}> Content Type
                                    {contenttype ? (
                                        <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    ) : (
                                        <span className='w-3 h-3'><svg className='w-3 h-3  rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    )}</div>
                                {contenttype ? (
                                    <div className='absolute  hidden  items-start  flex-col left-0 bottom-[-92px] py-3  px-[25px] rounded-b-md bg-secondary w-full'>
                                        <div className=' flex items-center'>
                                            <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                            <h1 className='text-[18px]'>Movies</h1>
                                        </div>
                                        <div className='flex items-center'>
                                            <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                            <h1 className='text-[18px]'>TV Shows</h1>
                                        </div>
                                    </div>) : (<div className='absolute items-start flex-col left-0 top-[51px]  rounded-b-md bg-secondary w-full'>
                                        <div className=' flex items-center gap-3  hover:bg-white hover:text-black px-5 py-4'>
                                            <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                            <h1 className='text-[18px]'  onClick={() => handlegenre('Movies')}>Movies</h1>
                                        </div>
                                        <div className='flex items-center gap-3  hover:bg-white hover:rounded-b-md hover:text-black px-5 py-4'>
                                            <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                            <h1 className='text-[18px]'  onClick={() => handlegenre('action')}>TV Shows</h1>
                                        </div>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className='filter_content w-full pt-5 mb-[15px]'>
                        <button className='p-4 font-semibold w-full rounded-md bg-inputbgcolor tracking-wider'>
                            Filters
                        </button>
                    </div>
                </div >
                <div>
                    {data && (<h1 className='results_for font-bold tracking-wider mb-7 lg:mb-[52px]'>Results for "{data.Title}".</h1>)}
                </div>
                <div className='search_movies_list_mobile  lg:hidden'>
                    <h1 className='mb-2 font-bold tracking-wider moreVideos'>More videos</h1>
                    <div className='search_movies_list_wrapper_mobile  md:grid md:grid-cols-2 md:gap-[2px]'>
                        {data && (
                            <div className='flex items-center justify-between mb-3' key={data.imdbID} onClick={() => handleclick(data.imdbID)}>
                                <div className='flex'>
                                    <div className='mr-3 search_movie_image'><img src={data.Poster} className=' w-[189px] rounded-md ' /></div>
                                    <div>
                                        <h1 className='leading-5 mb-1 font-bold'>{data.Title}</h1>
                                        <p>{data.Year}</p>
                                    </div>
                                </div>
                                <div>
                                    <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>More</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.580 3.047 C 10.859 3.185,10.199 3.848,10.044 4.592 C 9.789 5.816,10.751 7.000,12.000 7.000 C 13.080 7.000,14.000 6.080,14.000 5.000 C 14.000 4.477,13.790 3.983,13.404 3.596 C 12.913 3.106,12.277 2.914,11.580 3.047 M11.580 10.047 C 10.707 10.214,10.000 11.087,10.000 12.000 C 10.000 12.920,10.690 13.768,11.592 13.956 C 12.816 14.211,14.000 13.249,14.000 12.000 C 14.000 11.477,13.790 10.983,13.404 10.596 C 12.913 10.106,12.277 9.914,11.580 10.047 M11.580 17.047 C 10.859 17.185,10.199 17.848,10.044 18.592 C 9.789 19.816,10.751 21.000,12.000 21.000 C 13.080 21.000,14.000 20.080,14.000 19.000 C 14.000 18.477,13.790 17.983,13.404 17.596 C 12.913 17.106,12.277 16.914,11.580 17.047 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                </div>
                            </div>
                        )}
                        {info && info.map((movie) => (
                            <div className='flex items-center justify-between mb-3' key={info.imdbID} onClick={() => handleclick(movie.imdbID)}>
                                <div className='flex'>
                                    <div className='mr-3 search_movie_image'><img src={movie.Poster} className=' w-[189px] rounded-md ' /></div>
                                    <div>
                                        <h1 className='leading-5 mb-1 font-bold'>{movie.Title}</h1>
                                        <p>{movie.Year}</p>
                                    </div>
                                </div>
                                <div>
                                    <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>More</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.580 3.047 C 10.859 3.185,10.199 3.848,10.044 4.592 C 9.789 5.816,10.751 7.000,12.000 7.000 C 13.080 7.000,14.000 6.080,14.000 5.000 C 14.000 4.477,13.790 3.983,13.404 3.596 C 12.913 3.106,12.277 2.914,11.580 3.047 M11.580 10.047 C 10.707 10.214,10.000 11.087,10.000 12.000 C 10.000 12.920,10.690 13.768,11.592 13.956 C 12.816 14.211,14.000 13.249,14.000 12.000 C 14.000 11.477,13.790 10.983,13.404 10.596 C 12.913 10.106,12.277 9.914,11.580 10.047 M11.580 17.047 C 10.859 17.185,10.199 17.848,10.044 18.592 C 9.789 19.816,10.751 21.000,12.000 21.000 C 13.080 21.000,14.000 20.080,14.000 19.000 C 14.000 18.477,13.790 17.983,13.404 17.596 C 12.913 17.106,12.277 16.914,11.580 17.047 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Laptops */}
                <div className='search_movies_list_wrapper hidden lg:block '>
                    <h1 className='more_videos mb-2 font-bold'>More Videos</h1>
                    <div className='search_movies_list_wrapper grid grid-cols-4 xl:grid-cols-5 3xl:grid-cols-5 gap-9'>
                        {data && (
                            <div className='w-56 movie_item  relative'>
                                <img src={data.Poster} className='rounded-xl w-56 movie_poster' key={data.imdbID} onClick={() => handleclick(data.imdbID)} />
                                <div className='detail_movie_detail_search w-56 overflow-hidden absolute z-30 b-black'>
                                    <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                        <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                    </div>
                                    <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                        <div className='min-w-7 text-left  mb-3'><p className=''>{data.Title}</p></div>
                                        <div className='flex items-center gap-2 pb-6'>
                                            <span className='plusicon'><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg> <span className='watchlist_blower'>Watchlist</span></span>
                                            <span className='movie_icon_wrapper'>
                                                <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg><span className='trailer_blower'>Trailer</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                        <p className='text-white'>{data.Year}</p>
                                        <p className='text-white'>{data.Runtime}</p>
                                        <p className='text-white'>{data.Rated}</p>
                                    </div>
                                    <div className='cs:block hidden px-2 lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                        <p>{data.Plot}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {info && info.map((movie) => (
                            <div className='w-56 movie_item  relative' key={movie.imdbID} onClick={() => handleclick(movie.imdbID)} >
                                <img src={movie.Poster} className='rounded-xl w-56 movie_poster' />
                                <div className='detail_movie_detail_search w-56 overflow-hidden  absolute z-30 b-black'>
                                    <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                        <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                    </div>
                                    <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                        <div className='min-w-7 text-left  mb-3'><p className=''>{movie.Title}</p></div>
                                        <div className='flex items-center gap-2 pb-6'>
                                            <span className='plusicon'><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg> <span className='watchlist_blower'>Watchlist</span></span>
                                            <span className='movie_icon_wrapper'>
                                                <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg><span className='trailer_blower'>Trailer</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                        <p className='text-white'>{movie.Title}</p>
                                        <p className='text-white'>{movie.Runtime}</p>
                                        <p className='text-white'>{movie.Rated}</p>
                                    </div>
                                    <div className='cs:block hidden px-2 lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                        <p>{movie.Plot}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    );
};

export default SearchScroller;
