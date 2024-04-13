import React, { useEffect, useState } from 'react';
import Demoimage from '../../assets/image/categoriespageimages/demoimage.webp'
import axios from 'axios';
import './searchscroller.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../header/header';


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
    //filters mobile
    const [freetomeMobile, setfreetomeMobile] = useState(true);
    const [genreMobile, setgenreMobile] = useState(true);
    const [videoQualityMobile, setVidequalityMobile] = useState(true);
    const [contenttypeMobile, setcontenttypeMobile] = useState(true);
    const openfreetomeMobile = () => {
        setfreetomeMobile(!freetomeMobile)
        setgenreMobile(true)
        setVidequalityMobile(true)
        setcontenttypeMobile(true)
    }
    const opengenreMobile = () => {
        setgenreMobile(!genreMobile)
        setfreetomeMobile(true)
        setVidequalityMobile(true)
        setcontenttypeMobile(true)

    }
    const openvideoqualityMobile = () => {
        setVidequalityMobile(!videoQualityMobile)
        setfreetomeMobile(true)
        setgenreMobile(true)
        setcontenttypeMobile(true)
    }
    const opencontenttypeMobile = () => {
        setcontenttypeMobile(!contenttypeMobile)
        setgenreMobile(true)
        setVidequalityMobile(true)
        setfreetomeMobile(true)
    }



    //filters
    const freePageRedirect = (imdbID) => {
        navigate(`/freemovies/${imdbID}`)
    }
    const [contentChangebigscreen, setcontentbigscreen] = useState();
    const handlegenre = (genre) => {
        fetchGenre(genre);
        setcontentbigscreen(genre)
    }

    const qualityFilter = (imdbID) => {
        if (imdbID === "N/A") {
            alert("No Videos In 4k UHD")
        } else {
            fetchGenre(genre)
        }
    }

    //filters boxes opens on clicking mobile
    const [content, setcontent] = useState(false);

    const freePageRedirectMobile = (imdbID) => {
        navigate(`/freemovies/${imdbID}`)
    }

    const [selectedGenre, setSelectedGenre] = useState("")
    const handlegenreMobile = (genre) => {
        fetchGenre(genre);
        setgenreMobile(!genreMobile);
        setcontent(true)
        setSelectedGenre(genre)
    }
    const handlegenreMobilefilter = (genre) => {
        fetchGenre(genre);
        setcontenttypeMobile(!contenttypeMobile);
    }

    const qualityFilterMobile = (imdbID) => {
        if (imdbID === "N/A") {
            alert("No Videos In 4k UHD")
            setVidequalityMobile(!videoQualityMobile);
        } else {
            fetchGenre(genre)
        }
    }

    const [moviecheckbox, setmoviecheckbox] = useState();
    const [tvcheckbox, settvcheckbox] = useState();
    const [count, setcount] = useState(0);
    const movieChecked = () => {
        setcontenttypeMobile(!contenttypeMobile);
        setcount(count + 1)
        if (moviecheckbox) {
            setcount(count - 1)
        }
        else {
            setcount(count + 1)
        }
        setmoviecheckbox(!moviecheckbox)


    }
    const tvChecked = () => {
        setcontenttypeMobile(!contenttypeMobile);
        settvcheckbox(!tvcheckbox)
        if (tvcheckbox) {
            setcount(count - 1);
        } else {
            setcount(count + 1);
        }
        settvcheckbox(!tvcheckbox);
    }
    const [qualitycheckbox, setqualitycheckbox] = useState();
    const Qualitychecked = () => {
        setqualitycheckbox(!qualitycheckbox)
        setVidequalityMobile(!videoQualityMobile);
    }


    //mobile screen open filter box
    const [filter, setfilter] = useState();
    const openFilter = () => {
        setfilter(!filter)

    }
    const closeFilter = () => {
        setfilter(false)
    }

    //popup box
    const [popup, setpopup] = useState(false);
    const [popupdata, setPopupData] = useState([]);

    const openPopup = async (detailImdbId) => {
        setpopup(true)
        try {
            const response = await fetch(`https://omdbapi.com/?i=${detailImdbId}&apikey=eae86d55`);
            const data = await response.json();

            if (data.Response === 'True') {
                setPopupData([data]);
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }


    const closePopup = () => {
        setpopup(false)
    }
    return (
        <>
        <Header/>
            <div className='search_page text-white px-6 bg-primary min-h-[120vh]'>
                <div className='search_filter'>
                    <div className='filters_options hidden'>
                        <div className='buttons mb-16 xl:mb-[61px]'>
                            <button onClick={() => openfreetome()} className='free_to_me relative text-[18px] flex items-center justify-between gap-3 font-semibold w-full rounded-lg bg-inputbgcolor tracking-wider p-4'>
                                <div className='flex items-center  hover:bg-white hover:text-black gap-2 rounded-lg'> Free to me
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
                            <button onClick={() => opengenre()} className='genre  relative text-[18px] flex items-center  justify-between font-semibold w-full rounded-lg  bg-inputbgcolor tracking-wider'>
                                <div className='flex items-center  hover:bg-white hover:text-black gap-4 p-4 rounded-lg '> {contentChangebigscreen ? <p>{contentChangebigscreen}</p> : <p>Genre</p>}
                                    {genre ? (
                                        <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    ) : (
                                        <span className='w-3 h-3'><svg className='w-3 h-3 rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    )}</div>
                                {genre ? (
                                    <div className='w-[180px] hidden  flex-col items-start absolute left-0 bottom-[-330px] z-10  py-3  px-[25px] rounded-b-md bg-secondary'>
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
                                <div className='flex items-center  hover:bg-white hover:text-black gap-10 p-[18px] rounded-lg'> Video Quality
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
                                <div className='flex items-center  hover:bg-white hover:text-black gap-10 p-[18px] rounded-lg' > Content Type {count > 0 && (<span>{count}</span>)}
                                    {contenttype ? (
                                        <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    ) : (
                                        <span className='w-3 h-3'><svg className='w-3 h-3  rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                    )}</div>
                                {contenttype ? (
                                    <div className='absolute  hidden  items-start  flex-col left-0 bottom-[-92px] py-3  px-[25px] rounded-b-md bg-secondary w-full'>
                                    </div>) : (<div className='absolute items-start flex-col left-0 top-[51px]  rounded-b-md bg-secondary w-full'>
                                        <div className=' flex items-center gap-3  hover:bg-white hover:text-black px-5 py-4' onClick={() => movieChecked()}>
                                            {moviecheckbox ? (<svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Selected Web</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.514,21.872 19.012 L 21.980 18.620 21.991 13.780 L 22.001 8.940 21.001 9.940 L 20.000 10.939 20.000 14.542 C 20.000 16.957,19.986 18.224,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.184 4.848,4.849 4.184,5.620 4.043 C 5.788 4.012,7.743 3.999,12.149 4.001 L 18.438 4.003 18.668 3.822 C 18.936 3.612,19.357 3.398,19.700 3.297 C 19.832 3.259,20.147 3.217,20.400 3.204 L 20.860 3.180 20.592 2.958 C 20.117 2.564,19.548 2.272,18.940 2.108 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M20.077 4.775 C 19.977 4.802,19.815 4.871,19.717 4.929 C 19.618 4.989,17.904 6.673,15.800 8.777 C 13.743 10.836,12.042 12.520,12.020 12.520 C 11.998 12.520,11.287 11.828,10.440 10.982 C 8.625 9.170,8.694 9.220,8.020 9.220 C 7.614 9.220,7.563 9.229,7.365 9.333 C 6.633 9.719,6.340 10.545,6.668 11.298 C 6.764 11.517,6.968 11.735,8.857 13.633 C 10.003 14.784,11.024 15.788,11.127 15.864 C 11.654 16.254,12.387 16.254,12.913 15.864 C 13.016 15.787,15.037 13.784,17.405 11.412 C 22.205 6.604,21.917 6.926,21.952 6.322 C 21.973 5.946,21.898 5.653,21.707 5.375 C 21.354 4.861,20.679 4.612,20.077 4.775 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>) : (
                                                <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="15" width="15" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                            )}
                                            <h1 className='text-[18px]' onClick={() => handlegenre('Movies')}>Movies</h1>
                                        </div>
                                        <div className='flex items-center gap-3  hover:bg-white hover:rounded-b-md hover:text-black px-5 py-4' onClick={() => tvChecked()}>
                                            {tvcheckbox ? (<svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Selected Web</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.514,21.872 19.012 L 21.980 18.620 21.991 13.780 L 22.001 8.940 21.001 9.940 L 20.000 10.939 20.000 14.542 C 20.000 16.957,19.986 18.224,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.184 4.848,4.849 4.184,5.620 4.043 C 5.788 4.012,7.743 3.999,12.149 4.001 L 18.438 4.003 18.668 3.822 C 18.936 3.612,19.357 3.398,19.700 3.297 C 19.832 3.259,20.147 3.217,20.400 3.204 L 20.860 3.180 20.592 2.958 C 20.117 2.564,19.548 2.272,18.940 2.108 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M20.077 4.775 C 19.977 4.802,19.815 4.871,19.717 4.929 C 19.618 4.989,17.904 6.673,15.800 8.777 C 13.743 10.836,12.042 12.520,12.020 12.520 C 11.998 12.520,11.287 11.828,10.440 10.982 C 8.625 9.170,8.694 9.220,8.020 9.220 C 7.614 9.220,7.563 9.229,7.365 9.333 C 6.633 9.719,6.340 10.545,6.668 11.298 C 6.764 11.517,6.968 11.735,8.857 13.633 C 10.003 14.784,11.024 15.788,11.127 15.864 C 11.654 16.254,12.387 16.254,12.913 15.864 C 13.016 15.787,15.037 13.784,17.405 11.412 C 22.205 6.604,21.917 6.926,21.952 6.322 C 21.973 5.946,21.898 5.653,21.707 5.375 C 21.354 4.861,20.679 4.612,20.077 4.775 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>) : (
                                                <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="15" width="15" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                            )}
                                            <h1 className='text-[18px]' onClick={() => handlegenre('Movies')}>TV Shows</h1>
                                        </div>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className='filter_content w-full pt-[18px] mb-[15px]'>
                        <button className='p-3 pb-[13px]  text-[15px] font-semibold w-full rounded-lg bg-inputbgcolor tracking-wider' onClick={() => openFilter()}>
                            Filters
                        </button>
                        {filter && (
                            <div className='fixed w-full bg-secondary h-full top-[0px] z-10  left-0 '>
                                <div className='pt-3 pb-3 px-6 flex justify-between items-center border-b-[0.1px] border-gray-500'>
                                    <h2 className='text-[16px] font-bold tracking-wider'>Filters</h2>
                                    <span onClick={() => closeFilter()}><svg xmlns="http://www.w3.org/2000/svg" className='fill-white' viewBox="0 0 50 50" width="15px" height="15px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg></span>
                                </div>
                                <ul className='flex flex-col md:text-[19px] lg:font-bold relative max-h-full overflow-scroll'>
                                    <div>
                                        <li>
                                            <div className='flex px-3 py-3 items-center gap-[5px] tracking-wide text-azongray' onClick={() => openfreetomeMobile()}>Free to me
                                                {freetomeMobile ? (
                                                    <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                                ) : (
                                                    <span className='w-3 h-3'><svg className='w-3 h-3  rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                                )}
                                            </div>
                                            {freetomeMobile ? (<span className='hidden'></span>) : (<div className=' bg-inputbgcolor p-[11px] w-full flex items-center pl-9 gap-1'>
                                                {data && (<p onClick={() => freePageRedirectMobile(data.imdbID)}>  Free to me <span className='text-[0px]'>{data.imdbID}</span></p>)}
                                            </div>)}
                                        </li>
                                        <li >
                                            <div className='tracking-wide text-azongray flex items-center gap-[5px] px-3 py-1' onClick={() => opengenreMobile()}>Genre
                                                {genreMobile ? (
                                                    <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                                ) : (
                                                    <span className='w-3 h-3'><svg className='w-3 h-3  rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                                )}
                                            </div>{content ? (<span className='pl-3 relative top-[-5px] change_movie_name'>{selectedGenre}</span>) : (null)}
                                            {genreMobile ? (<span className=' hidden'></span>) : (<div className=' bg-inputbgcolor flex-col p-[11px]  w-full flex items-start pl-9 gap-1'>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1 ' onClick={() => handlegenreMobile('action')}>{selectedGenre === "action" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Action</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1 ' onClick={() => handlegenreMobile('adventure')}>{selectedGenre === "adventure" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Adventure</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1 ' onClick={() => handlegenreMobile('comedy')}>{selectedGenre === "comedy" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Comedy</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('drama')}>{selectedGenre === "Drama" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Drama</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('documentary')}>{selectedGenre === "documentary" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Documentray</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('fantasy')}>{selectedGenre === "fantasy" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Fantasy</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('horror')}>{selectedGenre === "horror" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Horror</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('international')}>{selectedGenre === "international" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}International</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('kids')}>{selectedGenre === "kids" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Kids & Family</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('military')}>{selectedGenre === "military" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Military & War</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('romance')}>{selectedGenre === "romance" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Romance</span>
                                                <span className='text-[16px] mt-[-2px] px-3 py-2 text-azongray flex items-center gap-1' onClick={() => handlegenreMobile('science')}>{selectedGenre === "science" && <span className='ml-[-23px]'><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Check</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.671 5.064 C 20.545 5.102,20.409 5.192,20.264 5.331 C 20.144 5.446,17.739 7.952,14.918 10.900 C 12.097 13.848,9.728 16.323,9.653 16.400 L 9.517 16.540 9.348 16.360 C 8.619 15.580,4.800 11.475,4.278 10.909 C 3.814 10.407,3.569 10.173,3.444 10.112 C 2.962 9.879,2.402 10.051,2.128 10.516 C 2.036 10.672,2.020 10.745,2.021 11.000 C 2.021 11.213,2.043 11.339,2.094 11.435 C 2.184 11.601,2.919 12.399,8.163 18.023 C 8.642 18.537,8.967 18.854,9.066 18.901 C 9.151 18.942,9.322 18.983,9.446 18.992 C 9.932 19.029,9.479 19.466,15.944 12.724 C 19.643 8.866,21.815 6.571,21.876 6.458 C 22.162 5.922,21.885 5.232,21.316 5.063 C 21.061 4.987,20.920 4.987,20.671 5.064 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>}Science Fiction</span>
                                            </div>)}
                                        </li>
                                    </div>
                                    <li>
                                        <div className='tracking-wide text-azongray flex items-center gap-[5px] px-3 py-3' onClick={() => openvideoqualityMobile()} >
                                            Video Quality
                                            {videoQualityMobile ? (
                                                <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                            ) : (
                                                <span className='w-3 h-3'><svg className='w-3 h-3  rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                            )}
                                        </div>
                                        {videoQualityMobile ? (<span className='hidden'></span>) : (<div onClick={() => Qualitychecked()} className=' bg-inputbgcolor p-[11px] w-full flex items-center pl-9 gap-1'>
                                            {qualitycheckbox ? (
                                                <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Selected Web</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.514,21.872 19.012 L 21.980 18.620 21.991 13.780 L 22.001 8.940 21.001 9.940 L 20.000 10.939 20.000 14.542 C 20.000 16.957,19.986 18.224,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.184 4.848,4.849 4.184,5.620 4.043 C 5.788 4.012,7.743 3.999,12.149 4.001 L 18.438 4.003 18.668 3.822 C 18.936 3.612,19.357 3.398,19.700 3.297 C 19.832 3.259,20.147 3.217,20.400 3.204 L 20.860 3.180 20.592 2.958 C 20.117 2.564,19.548 2.272,18.940 2.108 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M20.077 4.775 C 19.977 4.802,19.815 4.871,19.717 4.929 C 19.618 4.989,17.904 6.673,15.800 8.777 C 13.743 10.836,12.042 12.520,12.020 12.520 C 11.998 12.520,11.287 11.828,10.440 10.982 C 8.625 9.170,8.694 9.220,8.020 9.220 C 7.614 9.220,7.563 9.229,7.365 9.333 C 6.633 9.719,6.340 10.545,6.668 11.298 C 6.764 11.517,6.968 11.735,8.857 13.633 C 10.003 14.784,11.024 15.788,11.127 15.864 C 11.654 16.254,12.387 16.254,12.913 15.864 C 13.016 15.787,15.037 13.784,17.405 11.412 C 22.205 6.604,21.917 6.926,21.952 6.322 C 21.973 5.946,21.898 5.653,21.707 5.375 C 21.354 4.861,20.679 4.612,20.077 4.775 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                            ) : (
                                                <span onClick={() => Qualitychecked()}><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                            )}
                                            <h2 className='text-[16px] mt-[-2px]' onClick={() => qualityFilterMobile(data.Metascore)}>Free to me</h2>
                                        </div>)}
                                    </li>
                                    <li >
                                        <div className='tracking-wide text-azongray flex items-center gap-[5px] px-3 py-3' onClick={() => opencontenttypeMobile()} >Content Type {count > 0 && (<span>{count}</span>)}
                                            {contenttypeMobile ? (
                                                <span className='w-3 h-3'><svg className='w-3 h-3' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                            ) : (
                                                <span className='w-3 h-3'><svg className='w-3 h-3  rotate-180 transition-all duration-300' viewBox="0 0 12 7" fill="white" data-chevron-svg="true"><path d="M11.7071 1.70711C12.0976 1.31658 12.0976 0.683417 11.7071 0.292893C11.3166 -0.0976311 10.6834 -0.0976311 10.2929 0.292893L11.7071 1.70711ZM6 6L5.29289 6.70711C5.68342 7.09763 6.31658 7.09763 6.70711 6.70711L6 6ZM1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976315 0.683417 -0.0976315 1.31658 0.292893 1.70711L1.70711 0.292893ZM10.2929 0.292893L5.29289 5.29289L6.70711 6.70711L11.7071 1.70711L10.2929 0.292893ZM6.70711 5.29289L1.70711 0.292893L0.292893 1.70711L5.29289 6.70711L6.70711 5.29289Z"></path></svg></span>
                                            )}
                                        </div>
                                        {contenttypeMobile ? (<span className='hidden'></span>) : (<div className=' bg-inputbgcolor p-[11px] w-full flex flex-col items-start pl-9 gap-2'>
                                            <div className='flex items-center gap-2' onClick={() => movieChecked()}>
                                                {moviecheckbox ? (<svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Selected Web</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.514,21.872 19.012 L 21.980 18.620 21.991 13.780 L 22.001 8.940 21.001 9.940 L 20.000 10.939 20.000 14.542 C 20.000 16.957,19.986 18.224,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.184 4.848,4.849 4.184,5.620 4.043 C 5.788 4.012,7.743 3.999,12.149 4.001 L 18.438 4.003 18.668 3.822 C 18.936 3.612,19.357 3.398,19.700 3.297 C 19.832 3.259,20.147 3.217,20.400 3.204 L 20.860 3.180 20.592 2.958 C 20.117 2.564,19.548 2.272,18.940 2.108 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M20.077 4.775 C 19.977 4.802,19.815 4.871,19.717 4.929 C 19.618 4.989,17.904 6.673,15.800 8.777 C 13.743 10.836,12.042 12.520,12.020 12.520 C 11.998 12.520,11.287 11.828,10.440 10.982 C 8.625 9.170,8.694 9.220,8.020 9.220 C 7.614 9.220,7.563 9.229,7.365 9.333 C 6.633 9.719,6.340 10.545,6.668 11.298 C 6.764 11.517,6.968 11.735,8.857 13.633 C 10.003 14.784,11.024 15.788,11.127 15.864 C 11.654 16.254,12.387 16.254,12.913 15.864 C 13.016 15.787,15.037 13.784,17.405 11.412 C 22.205 6.604,21.917 6.926,21.952 6.322 C 21.973 5.946,21.898 5.653,21.707 5.375 C 21.354 4.861,20.679 4.612,20.077 4.775 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>) : (
                                                    <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="15" width="15" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                )}
                                                <h2 className='text-[16px] mt-[-2px]' onClick={() => handlegenreMobilefilter('Movies')}>Movies</h2>
                                            </div>
                                            <div className='flex items-center gap-2' onClick={() => tvChecked()}>
                                                {tvcheckbox ? (<svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Checkbox Selected Web</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.514,21.872 19.012 L 21.980 18.620 21.991 13.780 L 22.001 8.940 21.001 9.940 L 20.000 10.939 20.000 14.542 C 20.000 16.957,19.986 18.224,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.184 4.848,4.849 4.184,5.620 4.043 C 5.788 4.012,7.743 3.999,12.149 4.001 L 18.438 4.003 18.668 3.822 C 18.936 3.612,19.357 3.398,19.700 3.297 C 19.832 3.259,20.147 3.217,20.400 3.204 L 20.860 3.180 20.592 2.958 C 20.117 2.564,19.548 2.272,18.940 2.108 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M20.077 4.775 C 19.977 4.802,19.815 4.871,19.717 4.929 C 19.618 4.989,17.904 6.673,15.800 8.777 C 13.743 10.836,12.042 12.520,12.020 12.520 C 11.998 12.520,11.287 11.828,10.440 10.982 C 8.625 9.170,8.694 9.220,8.020 9.220 C 7.614 9.220,7.563 9.229,7.365 9.333 C 6.633 9.719,6.340 10.545,6.668 11.298 C 6.764 11.517,6.968 11.735,8.857 13.633 C 10.003 14.784,11.024 15.788,11.127 15.864 C 11.654 16.254,12.387 16.254,12.913 15.864 C 13.016 15.787,15.037 13.784,17.405 11.412 C 22.205 6.604,21.917 6.926,21.952 6.322 C 21.973 5.946,21.898 5.653,21.707 5.375 C 21.354 4.861,20.679 4.612,20.077 4.775 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>) : (
                                                    <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="15" width="15" role="img" aria-hidden="true"><title>Checkbox Unselected</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.433 2.043 C 4.858 2.128,4.224 2.377,3.731 2.712 C 2.956 3.239,2.396 4.034,2.129 4.989 L 2.020 5.380 2.020 12.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 12.000 L 21.980 5.380 21.874 4.995 C 21.611 4.045,21.044 3.239,20.269 2.712 C 19.929 2.481,19.353 2.218,18.958 2.112 L 18.620 2.022 12.140 2.015 C 8.576 2.012,5.558 2.024,5.433 2.043 M18.383 4.043 C 19.151 4.184,19.816 4.849,19.957 5.617 C 20.017 5.950,20.017 18.050,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.050,3.983 5.950,4.043 5.617 C 4.180 4.868,4.847 4.187,5.580 4.047 C 5.875 3.991,18.077 3.987,18.383 4.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                )}
                                                <h2 className='text-[16px] mt-[-2px]' onClick={() => handlegenreMobilefilter('action')}>TV Shows</h2>
                                            </div>
                                        </div>)}
                                    </li>
                                </ul>
                                <div className='border-t-[0.2px] border-gray-500  absolute bottom-0 p-6 w-full bg-secondary'>
                                    <div className='p-3 text-center bg-inputbgcolor rounded-lg w-full tracking-wide' onClick={() => closeFilter()}>Close</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div >
                <div>
                    {data && (<h1 className='results_for font-bold tracking-wider mb-7 lg:mb-[52px] leading-5 mt-[20px]'>Results for "{data.Title}".</h1>)}
                </div>
                <div className='search_movies_list_mobile  lg:hidden'>
                    <h1 className='mb-2 font-bold tracking-wider moreVideos'>More videos</h1>
                    <div className='search_movies_list_wrapper_mobile  md:grid md:grid-cols-2 md:gap-[10px] md:justify-between md:items-center'>
                        {data && (
                            <div className='mobile_search_results  ' key={data.imdbID} >
                                <div className='grid grid-cols-2 mb-10'>
                                    <div className=' search_movie_image w-[130px] md:w-[100%] h-[70px] md:h-[120px]'><img src={data.Poster} className=' w-full h-full rounded-md ' /></div>
                                    <div className=' ml-3 flex flex-col gap-1 mt-[-5px] md:mt-[0px]'>
                                        <h1 className='leading-4 font-bold text-[16px]'>{data.Title}</h1>
                                        <p className='text-[16px]'>{data.Year}</p>
                                    </div>
                                </div>
                                <div onClick={() => openPopup(data.imdbID)} className='mt-[20px]'>
                                    <span > <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>More</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.580 3.047 C 10.859 3.185,10.199 3.848,10.044 4.592 C 9.789 5.816,10.751 7.000,12.000 7.000 C 13.080 7.000,14.000 6.080,14.000 5.000 C 14.000 4.477,13.790 3.983,13.404 3.596 C 12.913 3.106,12.277 2.914,11.580 3.047 M11.580 10.047 C 10.707 10.214,10.000 11.087,10.000 12.000 C 10.000 12.920,10.690 13.768,11.592 13.956 C 12.816 14.211,14.000 13.249,14.000 12.000 C 14.000 11.477,13.790 10.983,13.404 10.596 C 12.913 10.106,12.277 9.914,11.580 10.047 M11.580 17.047 C 10.859 17.185,10.199 17.848,10.044 18.592 C 9.789 19.816,10.751 21.000,12.000 21.000 C 13.080 21.000,14.000 20.080,14.000 19.000 C 14.000 18.477,13.790 17.983,13.404 17.596 C 12.913 17.106,12.277 16.914,11.580 17.047 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                </div>
                            </div>
                        )}
                        {info && info.map((movie) => (
                            <div className='mobile_search_results' key={info.imdbID} >
                                <div className='grid grid-cols-2 mb-10'>
                                    <div className=' search_movie_image w-[130px] md:w-full h-[70px] md:h-[120px]'><img src={movie.Poster} className=' w-full h-full  rounded-md ' /></div>
                                    <div className='ml-3 flex flex-col gap-1 mt-[-5px] md:mt-[0px]'>
                                        <h1 className='leading-5 mb-1 font-bold text-[16px]'>{movie.Title}</h1>
                                        <p className='text-[16px]'>{movie.Year}</p>
                                    </div>
                                </div>
                                <div className=' mt-[20px] ' onClick={() => openPopup(data.imdbID)}>
                                    <span><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>More</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.580 3.047 C 10.859 3.185,10.199 3.848,10.044 4.592 C 9.789 5.816,10.751 7.000,12.000 7.000 C 13.080 7.000,14.000 6.080,14.000 5.000 C 14.000 4.477,13.790 3.983,13.404 3.596 C 12.913 3.106,12.277 2.914,11.580 3.047 M11.580 10.047 C 10.707 10.214,10.000 11.087,10.000 12.000 C 10.000 12.920,10.690 13.768,11.592 13.956 C 12.816 14.211,14.000 13.249,14.000 12.000 C 14.000 11.477,13.790 10.983,13.404 10.596 C 12.913 10.106,12.277 9.914,11.580 10.047 M11.580 17.047 C 10.859 17.185,10.199 17.848,10.044 18.592 C 9.789 19.816,10.751 21.000,12.000 21.000 C 13.080 21.000,14.000 20.080,14.000 19.000 C 14.000 18.477,13.790 17.983,13.404 17.596 C 12.913 17.106,12.277 16.914,11.580 17.047 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* mobile popup */}
                    {popup && (<div className=' popupbox_search_result_page fixed w-full top-0 h-full left-0 z-10 '>
                        <div className='popupbox_search_result_page_container absolute z-20 bottom-0 rounded-lg p-4 pl-4 pb-6 bg-secondary left-0 w-full flex flex-col gap-[7px]'>
                            <div className='header_popup flex justify-between items-center p-[2px] mb-2'>
                                <h2 className='font-bold tracking-wider text-[18px] mt-[1px]'>{popupdata && popupdata.map((data, index) => (
                                    <p key={index}>{data.Title}</p>
                                ))}</h2>
                                <svg onClick={() => closePopup()} class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" className='mt-1' height="24" width="24" role="img" aria-hidden="true"><title>Close</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.758 4.054 C 4.416 4.147,4.160 4.395,4.061 4.729 C 3.985 4.987,3.985 5.053,4.063 5.323 C 4.125 5.534,4.219 5.632,7.353 8.770 L 10.579 12.000 7.371 15.210 C 4.893 17.690,4.145 18.461,4.083 18.600 C 3.984 18.819,3.975 19.182,4.062 19.391 C 4.144 19.587,4.381 19.831,4.580 19.924 C 4.798 20.025,5.166 20.022,5.400 19.917 C 5.539 19.855,6.310 19.107,8.790 16.629 L 12.000 13.421 15.230 16.647 C 18.368 19.781,18.466 19.875,18.677 19.937 C 18.949 20.016,19.013 20.016,19.283 19.936 C 19.581 19.847,19.847 19.581,19.936 19.283 C 20.016 19.013,20.016 18.949,19.937 18.677 C 19.875 18.466,19.781 18.368,16.647 15.230 L 13.421 12.000 16.647 8.770 C 19.781 5.632,19.875 5.534,19.937 5.323 C 20.015 5.053,20.016 4.987,19.938 4.725 C 19.768 4.154,19.088 3.855,18.558 4.119 C 18.431 4.182,17.462 5.124,15.190 7.393 L 12.000 10.580 8.810 7.394 C 6.729 5.315,5.564 4.180,5.460 4.129 C 5.243 4.023,4.977 3.994,4.758 4.054 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                            </div>
                            <div className='rating pb-1 px-1 ml-0 bg-inputbgcolor rounded-sm max-w-12 text-[12px] font-bold h-6 w-max '>
                                U
                            </div>
                            <ul>
                                <li className='flex items-center gap-2 py-3'>
                                    <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Play</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.643 3.069 C 6.546 3.103,6.392 3.206,6.300 3.298 C 5.973 3.624,6.000 2.855,6.000 12.000 C 6.000 21.144,5.974 20.376,6.299 20.701 C 6.568 20.970,6.964 21.065,7.308 20.944 C 7.580 20.848,20.606 12.815,20.748 12.656 C 21.074 12.289,21.074 11.710,20.748 11.345 C 20.607 11.188,7.572 3.150,7.305 3.055 C 7.107 2.985,6.867 2.990,6.643 3.069 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                    <Link to="/signinpage"> Play</Link>
                                </li>
                                <li className='flex items-center gap-2 py-3'>
                                    <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                    <Link to="/signinpage"> Watchlist</Link>
                                </li>
                                <li className='flex items-center gap-2 py-3' >
                                    {popupdata && popupdata.map((data, index) => (<p onClick={() => handleclick(data.imdbID)} className=' absolute  w-44 h-10'></p>))}
                                    <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Info</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M12.740 4.041 C 15.525 4.302,17.953 5.983,19.182 8.500 C 20.655 11.514,20.091 15.104,17.765 17.530 C 16.248 19.111,14.175 19.999,12.000 19.999 C 8.235 19.999,4.948 17.331,4.177 13.648 C 3.426 10.057,5.201 6.431,8.501 4.817 C 9.822 4.170,11.277 3.904,12.740 4.041 M11.000 8.000 L 11.000 9.000 12.000 9.000 L 13.000 9.000 13.000 8.000 L 13.000 7.000 12.000 7.000 L 11.000 7.000 11.000 8.000 M11.000 13.570 C 11.000 15.217,11.015 16.194,11.042 16.289 C 11.103 16.509,11.315 16.762,11.531 16.874 C 11.932 17.080,12.390 17.012,12.700 16.702 C 13.008 16.394,13.000 16.478,13.000 13.573 L 13.000 11.000 12.000 11.000 L 11.000 11.000 11.000 13.570 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                    More details
                                </li>
                            </ul>
                        </div>
                    </div>

                    )}
                </div>
                {/* Laptops */}
                <div className='search_movies_list_wrapper hidden lg:block '>
                    <h1 className='more_videos mb-2 font-bold'>More videos</h1>
                    <div className='search_movies_list_wrapper grid grid-cols-4 xl:grid-cols-5 3xl:grid-cols-5 gap-9'>
                        {data && (
                            <div className='w-56 movie_item  relative'>
                                <img src={data.Poster} className='rounded-xl w-56 h-40 movie_poster' key={data.imdbID} onClick={() => handleclick(data.imdbID)} />
                                <div className='detail_movie_detail_search w-56 overflow-hidden absolute z-30 b-black'>
                                    <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                        <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                    </div>
                                    <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                        <div className='min-w-7 text-left  mb-3'><p className=''>{data.Title}</p></div>
                                        <div className='flex items-center gap-2 pb-6'>
                                            <Link to="/signinpage"> <span className='plusicon'><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg> <span className='watchlist_blower'>Watchlist</span></span></Link>
                                            <span className='movie_icon_wrapper'>
                                                <svg onClick={() => handleclick(data.imdbID)} class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg><span className='trailer_blower'>Trailer</span>
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
                            <div className='w-56 movie_item  relative' key={movie.imdbID}  >
                                <img src={movie.Poster} className='rounded-xl w-56  h-40 movie_poster' onClick={() => handleclick(movie.imdbID)} />
                                <div className='detail_movie_detail_search w-56 overflow-hidden  absolute z-30 b-black'>
                                    <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                        <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                    </div>
                                    <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                        <div className='min-w-7 text-left  mb-3'><p className=''>{movie.Title}</p></div>
                                        <div className='flex items-center gap-2 pb-6'>
                                            <Link to="/signinpage"> <span className='plusicon'><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg> <span className='watchlist_blower'>Watchlist</span></span></Link>
                                            <span className='movie_icon_wrapper'>
                                                <svg onClick={() => handleclick(movie.imdbID)} class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg><span className='trailer_blower'>Trailer</span>
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
