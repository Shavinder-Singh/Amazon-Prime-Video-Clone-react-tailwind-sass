import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../footer/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './scroller.css';
import Detailpage from '../../../pages/detailpage'

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function App() {
    const [swiperRef, setSwiperRef] = useState(null);

    let appendNumber = 4;
    let prependNumber = 1;

    const prepend2 = () => {
        swiperRef.prependSlide([
            '<div class="swiper_slide_pag">Slide ' + --prependNumber + '</div>',
            '<div class="swiper_slide_pag">Slide ' + --prependNumber + '</div>',
        ]);
    };

    const prepend = () => {
        swiperRef.prependSlide(
            '<div class="swiper_slide_pag">Slide ' + --prependNumber + '</div>'
        );
    };

    const append = () => {
        swiperRef.appendSlide(
            '<div class="swiper_slide_pag">Slide ' + ++appendNumber + '</div>'
        );
    };

    const append2 = () => {
        swiperRef.appendSlide([
            '<div class="swiper_slide_pag">Slide ' + ++appendNumber + '</div>',
            '<div class="swiper_slide_pag">Slide ' + ++appendNumber + '</div>',
        ]);
    };
    const [mystery, setmystries] = useState();
    const [romantic, setromantic] = useState();
    const [historical, sethistorical] = useState();
    const [horror, sethorror] = useState();
    const [action, setaction] = useState();
    const [hindi, sethindi] = useState();
    const [punjabi, setpunjabi] = useState();
    const [drama, setdrama] = useState();

    const [datas, setdata] = useState(null);

    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=movies&apikey=eae86d55")
            .then(function (response) {
                setmystries(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=romantic&apikey=eae86d55")
            .then(function (response) {
                setromantic(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=Historical&apikey=eae86d55")
            .then(function (response) {
                sethistorical(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=horror&apikey=eae86d55")
            .then(function (response) {
                sethorror(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=action&apikey=eae86d55")
            .then(function (response) {
                setaction(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=hindi&apikey=eae86d55")
            .then(function (response) {
                sethindi(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=punjabi&apikey=eae86d55")
            .then(function (response) {
                setpunjabi(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=drama&apikey=eae86d55")
            .then(function (response) {
                setdrama(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    const handleclick = (imdbID) => {
        axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=eae86d55`)
            .then(function (response) {
                setdata(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const onmouseenters = () => {
        const paginationElements = document.querySelectorAll(".movies_scroller");
        const lowzindexElements = document.querySelectorAll(".movie_scroller");

        paginationElements.forEach(pagination => {
            pagination.classList.add("check");
        });

        lowzindexElements.forEach(lowzindex => {
            lowzindex.style.zIndex = "0";
        });
    }

    const zIndexchange = () => {
        const paginationElements = document.querySelectorAll(".movies_scroller");
        const movieScrollers = document.querySelectorAll(".movie_scroller");

        paginationElements.forEach(pagination => {
            pagination.classList.remove("check");
        });

        movieScrollers.forEach(movieScroller => {
            movieScroller.style.zIndex = "999";
        });
    };
    const breakpoints = {
        375: {
            slidesPerView: 1.5,
            spaceBetween: 12,

        },
        450: {
            slidesPerView: 2.5,
            spaceBetween: 12,

        },
        768: {
            slidesPerView: 3.5,
            spaceBetween: 12,

        },
        1028: {
            slidesPerView: 4,
            spaceBetween: 39,
        },
        1280: {
            slidesPerView: 5.2,
            spaceBetween: 23,
        },
        // Define other breakpoints as needed
    };

    return (
        <>
            <div className='movie_page pl-[24px] md:pl-[45px] lg:pl-[45px] pb-[170px] xl:pl-[65px] bg-black'>
                <div className='movies_scroller bg-black text-white  mb-[43px] md:mb-[0px] relative' onMouseEnter={() => onmouseenters()}>
                    <div className='font-bold flex  pr-3 md:pr-0 gap-4 md:gap-4 md:pb-0 text-[15px] md:text-[18px] tracking-wide'>
                        <div className=' flex-wrap flex'><span className='text-azonblue mr-1'>Prime</span> <span>Kids and Family movies </span></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {mystery && mystery.map((data, index) => (
                            <>
                            <SwiperSlide className='swiper_slide relative flex flex-col mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)} ><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute hidden md:block bg-black text-white w-[111%] flex-col py-1 rounded-md '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>
                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2 lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                                <p className=' absolute top-[173px] left-0 -z-10 font-bold'>Rent</p>
                            </SwiperSlide>
                            </>
                        ))}
                    </Swiper>
                </div>
                {/* first */}
                <div className='movie_scroller bg-black text-white  md:mb-[0px] relative ' onMouseEnter={() => zIndexchange()}>
                    <div className='font-bold pr-3 md:pr-0 flex gap-4 md:gap-4 pb-2 md:pb-0 text-[16px] md:text-[18px] tracking-wide'>
                        <div><h1><span className='text-azonblue'>Prime</span> Romance Movies</h1></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {romantic && romantic.map((data, index) => (
                            <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)}><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute bottom-[-235px] bg-black text-white w-[111%] flex-col py-1 rounded-md hidden '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>

                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2  lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* second */}
                <div className='movies_scroller bg-black text-white   mb-[43px] md:mb-[0px] relative' onMouseEnter={() => onmouseenters()}>
                    <div className='font-bold flex  pr-3 md:pr-0 gap-4 md:gap-4 md:pb-0 text-[15px] md:text-[18px] tracking-wide'>
                        <div className=' flex-wrap flex'><span className='text-azonblue mr-1'>Prime</span> <span>   Horro Movies</span></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {horror && horror.map((data, index) => (
                            <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)} ><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute hidden md:block bg-black text-white w-[111%] flex-col py-1 rounded-md '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>
                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2 lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* first */}
                <div className='movie_scroller bg-black text-white  md:mb-[0px] relative ' onMouseEnter={() => zIndexchange()}>
                    <div className='font-bold pr-3 md:pr-0 flex gap-4 md:gap-4 pb-2 md:pb-0 text-[16px] md:text-[18px] tracking-wide'>
                        <div><h1><span className='text-azonblue'>Prime</span> Historical Movies</h1></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {historical && historical.map((data, index) => (
                            <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)}><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute bottom-[-235px] bg-black text-white w-[111%] flex-col py-1 rounded-md hidden '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>

                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2  lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* second */}
                <div className='movies_scroller bg-black text-white   mb-[43px] md:mb-[0px] relative' onMouseEnter={() => onmouseenters()}>
                    <div className='font-bold flex  pr-3 md:pr-0 gap-4 md:gap-4 md:pb-0 text-[15px] md:text-[18px] tracking-wide'>
                        <div className=' flex-wrap flex'><span className='text-azonblue mr-1'>Prime</span> <span>Action and adventure Movies</span></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {action && action.map((data, index) => (
                            <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)} ><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute hidden md:block bg-black text-white w-[111%] flex-col py-1 rounded-md '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>
                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2 lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* first */}
                <div className='movie_scroller bg-black text-white  md:mb-[0px] relative ' onMouseEnter={() => zIndexchange()}>
                    <div className='font-bold pr-3 md:pr-0 flex gap-4 md:gap-4 pb-2 md:pb-0 text-[16px] md:text-[18px] tracking-wide'>
                        <div><h1><span className='text-azonblue'>Prime</span> Hindi Movies</h1></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {hindi && hindi.map((data, index) => (
                            <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)}><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute bottom-[-235px] bg-black text-white w-[111%] flex-col py-1 rounded-md hidden '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>

                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2  lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* second */}
                <div className='movies_scroller bg-black text-white   mb-[43px] md:mb-[0px] relative' onMouseEnter={() => onmouseenters()}>
                    <div className='font-bold flex  pr-3 md:pr-0 gap-4 md:gap-4 md:pb-0 text-[15px] md:text-[18px] tracking-wide'>
                        <div className=' flex-wrap flex'><span className='text-azonblue mr-1'>Prime</span> <span>Punjabi Movies</span></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {punjabi && punjabi.map((data, index) => (
                            <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)} ><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute hidden md:block bg-black text-white w-[111%] flex-col py-1 rounded-md '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>
                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2 lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* first */}
                <div className='movie_scroller bg-black text-white  md:mb-[0px] relative ' onMouseEnter={() => zIndexchange()}>
                    <div className='font-bold pr-3 md:pr-0 flex gap-4 md:gap-4 pb-2 md:pb-0 text-[16px] md:text-[18px] tracking-wide'>
                        <div><h1><span className='text-azonblue'>Prime</span> Drama Movies</h1></div>
                        <div className='font-thin md:font-bold flex items-center gap-2 text-nowrap'><span>See more</span><span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="right-arrow"><path fill="white" d="M13.8 24.196a1 1 0 0 0 1.414 0L21.7 17.71a.992.992 0 0 0 .292-.71.997.997 0 0 0-.292-.71l-6.486-6.486a1 1 0 0 0-1.414 1.414L19.582 17 13.8 22.782a1 1 0 0 0 0 1.414z"></path></svg>
                        </span></div>
                    </div>
                    <Swiper
                        onSwiper={setSwiperRef}
                        slidesPerView={4}
                        centeredSlides={false}
                        spaceBetween={39}
                        breakpoints={breakpoints}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiperpagination "
                    >
                        {drama && drama.map((data, index) => (
                            <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)}><Link to="/detailpage" className='w-full h-full'><img src={data.Poster} /></Link>
                                <div className='movies_data absolute bottom-[-235px] bg-black text-white w-[111%] flex-col py-1 rounded-md hidden '>
                                    <div>
                                        {datas && ((
                                            <>
                                                <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                </div>

                                                <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                    <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title}</p></div>
                                                    <div className='flex items-center gap-2 pb-6'>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><title>Watchlist</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <span>
                                                            <svg class="fbl-icon _3UMk3x _1a_Ljt" className='movie_icon bg-gray-800 hover:bg-white  hover rounded-3xl hover:text-primarycolor lg:h-[30px] lg:w-[30px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true"><title>Trailer</title><svg className='p-9' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='flex justify-between gap-1 text-[11px]  lg:text-[14px] font-bold px-2 lg:px-5 text-left mb-2'>
                                                    <p className='text-white'>{datas.Year}</p>
                                                    <p className='text-white'>{datas.Runtime}</p>
                                                    <p className='text-white'>{datas.Rated}</p>
                                                </div>
                                                <div className='cs:block hidden px-2  lg:px-5 font-bold text-left text-[14px] lg:text-[16px] tracking-wider text-ellipsis'>
                                                    <p>{datas.Plot}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* second */}
            </div>
            <Footer />

        </>
    );
}
