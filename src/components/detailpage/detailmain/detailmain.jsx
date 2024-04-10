import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import primeContent from '../../../assets/image/PrimecontentImage.png'
import './detailmain.scss';
import { useParams } from 'react-router-dom';
import Header from '../../header/header'
import Footer from '../../footer/footer';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default function Detailmain() {
    const navigate = useNavigate();
    const [swiperRef, setSwiperRef] = useState(null);
    const breakpoints = {
        320: {
            slidesPerView: 1.6,
            spaceBetween: 12,
        },
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

    const { detailImdbId } = useParams();
    console.log(detailImdbId)
    const [data, setdata] = useState([]);
    const [relateddata, setrelatedData] = useState(null);
    const [info, setinformation] = useState(null);
    console.log(data);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`https://www.omdbapi.com/?i=${detailImdbId}&apikey=eae86d55`);
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
    }, [detailImdbId]);
    //close popup detail page
    const close_btn_popup = () => {
        setOpenPopup(false);

    }
    const [openpopup, setOpenPopup] = useState();

    const openPopup = () => {
        setOpenPopup(!openpopup);
    }
    //copied btn
    const [changeCopy, setcopy] = useState("Copy");
    const copied = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                setcopy("Copied")
            })
            .catch((error) => {
                console.log('Failed to Copy Url', error)
            })
    }

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

    const handledetail = async (detailImdbId) => {
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
    //additional popups 
    const [activeindex, setactiveindex] = useState(0);
    const relatedMovies = (index) => {
        if (index !== activeindex) {
            setactiveindex(index);
        }
    }
    //open popup
    const [openPurchasebox, setOpenPurchase] = useState(false);
    const [closePurchasebox, setClosePurchase] = useState();
    const openPurchase = () => {
        setOpenPurchase(true);
    }
    const closePurchase = () => {
        setOpenPurchase(false);
    }

    return (
        <>
            <Header />
            <div className='movie_detail_page w-full'>
                <div className=''>
                    {data && (
                        <>
                            <div className='movie_detail_page_main'>
                                <div className='movie_detail_page_main_image_wrapper_mobile'>
                                    <div className='detail_page_image_big_wrapper h-52 relative flex '>
                                        <div className='shadow_mobile'>
                                        </div>
                                        <div className='w-full h-full fakeImage relative hidden' >
                                            <div className='shadow_big absolute'>

                                            </div>
                                        </div>
                                        <img src={data.Poster} alt="Punjabi Movie Poster" className='w-full h-full RealImage' />
                                        <img src={primeContent} alt="" className=' logo_movie_prime w-[100px] absolute top-2 right-3' />
                                    </div>
                                </div>
                                <div className='movie_detail_page_main_content md:pl-2'>
                                    <div className='movie_detail_wrapper text-white'>
                                        <div className='movie_heading_detail pl-4'>
                                            <div className='lg:pl-[42px]'>
                                                <h1 className='text-[26px] lg:text-[42px] font-bold movie_name_detail_page lg:max-w-[70%]'>{data.Title}</h1>
                                            </div>
                                        </div>
                                        <div className='ordering_content flex flex-col px-[20px] lg:px-[65px] bg-black '>
                                            <div className='movie_detail_options movie_detail_buttons flex flex-col gap-2 md:w-[130%] '>
                                                <span className='flex items-center gap-1 '>
                                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" viewBox="0 0 24 24" height="17" width="17" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="blue" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill=" #1a98ff;" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                    <span className='text-[13px] font-semibold tracking-wider prime_trial lg:text-[17px] md:text-[15px]  z-[1]'>Watch with a free Prime trial</span></span>
                                                <div className='flex flex-col flex-wrap gap-2 lg:flex-row lg:items-center lg:gap-8 shadow_last'>
                                                    <div className='movie_details_btns flex flex-col md:flex-row md:justify-left gap-3'>
                                                        <Link to="/signinpage"> <div className='movie_options_trial_btn py-1 md:p-2 rounded-lg tracking-widest bg-white flex flex-col justify-center items-center font-bold hover:scale-[1.1] hover:text-gray hover:bg-white transition-all text-black '>
                                                            <button className=' text-[15px] md:text-[18px] tracking-wider mt-[-2px]'>Watch with Prime</button>
                                                            <span className='text-[12px] md:text-[16px] tracking-normal'>Start your 30-day free trial</span>
                                                        </div></Link>
                                                        <div className='movie_options_rent_btn py-[14.5px] md:p-2 rounded-lg tracking-widest bg-inputbgcolor hover:scale-[1.1] hover:text-black hover:bg-white transition-all text-white flex flex-col justify-center items-center font-bold'>
                                                            <Link to="/signinpage"> <button className=' text-[15px] md:text-[16px] tracking-wider mt-[-2px]'>Rent <span className='uhd_badge'>UHD ₹119</span></button></Link>
                                                        </div>
                                                        <div className='movie_options_purchase_btn py-[14px] md:p-2 rounded-lg tracking-widest bg-inputbgcolor flex flex-col justify-center items-center font-bold hover:scale-[1.1] hover:text-black hover:bg-white transition-all text-white ' onClick={() => openPurchase()}>
                                                            <button className=' text-[15px] md:text-[16px] tracking-wider mt-[-2px]'>More purchase <span className='options_content'>options</span></button>
                                                        </div>
                                                    </div>
                                                    <div className='movie_details_icons flex items-center pt-2 pb-1 '>
                                                        <div className='flex gap-2 items-center'>
                                                            <span className=' relative flex p-[12px] md:p-[16px] rounded-full flex-col justify-center items-center gap-2 lg:p-[17px] lg:mt-[-12px]  bg-inputbgcolor hover:bg-white'><svg className='hover:fill-black' class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Trailer</title><svg width="24" height="24" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 3.042 C 3.487 3.214,2.556 3.976,2.202 4.925 C 1.994 5.481,2.001 5.233,2.001 11.992 C 2.000 18.878,1.989 18.550,2.234 19.151 C 2.521 19.857,3.143 20.479,3.849 20.766 C 4.453 21.012,4.024 21.000,12.000 21.000 C 19.974 21.000,19.547 21.012,20.150 20.767 C 20.850 20.482,21.482 19.850,21.767 19.150 C 22.011 18.551,22.000 18.876,22.000 12.000 C 22.000 5.123,22.011 5.449,21.766 4.849 C 21.499 4.193,20.964 3.633,20.296 3.312 C 19.636 2.994,20.412 3.023,12.120 3.015 C 8.039 3.012,4.611 3.024,4.503 3.042 M19.340 5.066 C 19.455 5.105,19.603 5.201,19.701 5.299 C 20.023 5.621,20.000 5.097,20.000 12.000 C 20.000 18.903,20.023 18.379,19.701 18.701 C 19.377 19.025,20.023 19.000,12.000 19.000 C 3.977 19.000,4.623 19.025,4.299 18.701 C 3.977 18.379,4.000 18.903,4.000 12.000 C 4.000 5.096,3.976 5.621,4.300 5.298 C 4.616 4.982,3.975 5.007,11.983 5.003 C 18.550 5.000,19.162 5.006,19.340 5.066 M5.660 6.652 C 5.495 6.817,5.467 6.980,5.486 7.649 C 5.501 8.185,5.537 8.291,5.749 8.429 C 5.840 8.489,5.953 8.500,6.500 8.500 C 7.047 8.500,7.160 8.489,7.251 8.429 C 7.463 8.291,7.499 8.185,7.514 7.649 C 7.533 6.980,7.505 6.817,7.340 6.652 L 7.208 6.520 6.500 6.520 L 5.792 6.520 5.660 6.652 M16.660 6.652 C 16.495 6.817,16.467 6.980,16.486 7.649 C 16.501 8.185,16.537 8.291,16.749 8.429 C 16.840 8.489,16.953 8.500,17.500 8.500 C 18.047 8.500,18.160 8.489,18.251 8.429 C 18.463 8.291,18.499 8.185,18.514 7.649 C 18.533 6.980,18.505 6.817,18.340 6.652 L 18.208 6.520 17.500 6.520 L 16.792 6.520 16.660 6.652 M10.208 9.081 C 9.955 9.235,9.960 9.175,9.960 12.000 C 9.960 14.825,9.955 14.763,10.208 14.921 C 10.473 15.088,10.486 15.081,12.720 13.687 C 14.134 12.806,14.808 12.363,14.870 12.276 C 14.974 12.128,14.986 11.927,14.901 11.761 C 14.856 11.675,14.332 11.328,12.831 10.389 C 11.725 9.698,10.762 9.103,10.692 9.066 C 10.522 8.978,10.369 8.983,10.208 9.081 M5.768 11.067 C 5.534 11.182,5.500 11.301,5.500 12.000 C 5.500 12.952,5.548 13.000,6.500 13.000 C 7.452 13.000,7.500 12.952,7.500 12.000 C 7.500 11.047,7.452 10.999,6.494 11.001 C 6.028 11.002,5.872 11.016,5.768 11.067 M16.768 11.067 C 16.534 11.182,16.500 11.301,16.500 12.000 C 16.500 12.952,16.548 13.000,17.500 13.000 C 18.452 13.000,18.500 12.952,18.500 12.000 C 18.500 11.047,18.452 10.999,17.494 11.001 C 17.028 11.002,16.872 11.016,16.768 11.067 M5.660 15.652 C 5.495 15.817,5.467 15.980,5.486 16.649 C 5.501 17.185,5.537 17.291,5.749 17.429 C 5.840 17.489,5.953 17.500,6.500 17.500 C 7.047 17.500,7.160 17.489,7.251 17.429 C 7.463 17.291,7.499 17.185,7.514 16.649 C 7.533 15.980,7.505 15.817,7.340 15.652 L 7.208 15.520 6.500 15.520 L 5.792 15.520 5.660 15.652 M16.660 15.652 C 16.495 15.817,16.467 15.980,16.486 16.649 C 16.501 17.185,16.537 17.291,16.749 17.429 C 16.840 17.489,16.953 17.500,17.500 17.500 C 18.047 17.500,18.160 17.489,18.251 17.429 C 18.463 17.291,18.499 17.185,18.514 16.649 C 18.533 15.980,18.505 15.817,18.340 15.652 L 18.208 15.520 17.500 15.520 L 16.792 15.520 16.660 15.652 " fill="white" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                <p className='trailer absolute bg-white text-black rounded-md font-bold px-1 top-[64px]'>Trailer</p>
                                                            </span>
                                                            <span className=' relative flex p-[12px]  md:p-[16px] rounded-full  flex-col justify-center items-center gap-2 lg:p-[17px] lg:mt-[-12px] bg-inputbgcolor  hover:bg-white'><svg className='' class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Add</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                <p className='watchlist absolute bg-white text-black rounded-md font-bold px-1 top-[64px]'>Watchlist</p>
                                                            </span>
                                                            <span className=' relative flex p-[8px] md:p-[12px] rounded-full  flex-col justify-center items-center gap-0 mt-[0px] lg:p-[13px] lg:mt-[-12px] bg-inputbgcolor  hover:bg-white'><svg height="34" width="34" class="mO+eGr" viewBox="0 0 60 60" fill="white" xmlns="http://www.w3.org/2000/svg" data-testid="thumbUpOutlined"><path d="M43.7186 27.1678C43.3041 26.6702 42.7855 26.2696 42.1992 25.9943C41.613 25.719 40.9735 25.5758 40.3258 25.5747H33.5993L34.4253 23.4652C34.7689 22.5416 34.8834 21.5484 34.7588 20.5709C34.6342 19.5934 34.2744 18.6606 33.7102 17.8527C33.1459 17.0448 32.3941 16.3858 31.5192 15.9322C30.6444 15.4787 29.6725 15.2442 28.6871 15.2488C28.4033 15.2493 28.1258 15.3318 27.8877 15.4861C27.6496 15.6405 27.461 15.8603 27.3447 16.1191L23.1406 25.5747H19.674C18.5004 25.5747 17.3747 26.0409 16.5448 26.8708C15.7149 27.7007 15.2487 28.8263 15.2487 30V40.3259C15.2487 41.4996 15.7149 42.6252 16.5448 43.4551C17.3747 44.2851 18.5004 44.7513 19.674 44.7513H38.4524C39.4877 44.751 40.4901 44.3877 41.2851 43.7247C42.0802 43.0616 42.6177 42.1408 42.8041 41.1225L44.6775 30.7966C44.7933 30.1584 44.7675 29.5026 44.6018 28.8755C44.4361 28.2484 44.1346 27.6654 43.7186 27.1678ZM22.6243 41.8011H19.674C19.2828 41.8011 18.9076 41.6456 18.631 41.369C18.3543 41.0924 18.1989 40.7172 18.1989 40.3259V30C18.1989 29.6088 18.3543 29.2336 18.631 28.957C18.9076 28.6803 19.2828 28.5249 19.674 28.5249H22.6243V41.8011ZM41.801 30.2656L39.9276 40.5915C39.8647 40.9351 39.682 41.2453 39.4118 41.4668C39.1417 41.6883 38.8017 41.8068 38.4524 41.8011H25.5746V27.3596L29.5869 18.3318C29.9999 18.4522 30.3835 18.6569 30.7134 18.933C31.0433 19.2091 31.3124 19.5506 31.5037 19.936C31.695 20.3213 31.8043 20.7421 31.8248 21.1718C31.8452 21.6016 31.7764 22.0309 31.6226 22.4326L30.8408 24.5421C30.6742 24.9879 30.6179 25.4675 30.6768 25.9398C30.7357 26.4121 30.9081 26.8631 31.1791 27.2544C31.4501 27.6457 31.8117 27.9656 32.2331 28.1869C32.6546 28.4081 33.1233 28.5241 33.5993 28.5249H40.3258C40.5426 28.5246 40.7567 28.572 40.953 28.6637C41.1493 28.7555 41.323 28.8894 41.4617 29.056C41.6038 29.2202 41.7079 29.4137 41.7665 29.6228C41.8252 29.8319 41.8369 30.0514 41.801 30.2656Z"></path></svg>
                                                                <p className='like absolute bg-white text-black rounded-md font-bold px-1 top-[64px]'>Like</p>
                                                            </span>
                                                            <span className=' relative flex p-[8px] md:p-[12px] rounded-full  flex-col justify-center items-center gap-0 mt-[0px] lg:p-[13px] lg:mt-[-12px] bg-inputbgcolor  hover:bg-white'><svg className='' height="34" width="34" class="mO+eGr" viewBox="0 0 60 60" fill="white" xmlns="http://www.w3.org/2000/svg" data-testid="thumbDownOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M42.1982 34.0054C42.7844 33.7301 43.303 33.3296 43.7174 32.832C44.1334 32.3344 44.4349 31.7514 44.6006 31.1244C44.7662 30.4974 44.7921 29.8416 44.6762 29.2035L42.8029 18.8785C42.6166 17.8602 42.0792 16.9395 41.2842 16.2766C40.4892 15.6136 39.4869 15.2503 38.4517 15.25H19.675C18.5014 15.25 17.3759 15.7162 16.546 16.546C15.7162 17.3759 15.25 18.5014 15.25 19.675V30C15.25 31.1735 15.7162 32.2991 16.546 33.1289C17.3759 33.9588 18.5014 34.425 19.675 34.425H23.1412L27.345 43.8797C27.4613 44.1385 27.6498 44.3582 27.8879 44.5126C28.126 44.6669 28.4035 44.7493 28.6872 44.7499C29.6726 44.7545 30.6443 44.52 31.5191 44.0665C32.3939 43.613 33.1457 42.9541 33.7099 42.1462C34.2741 41.3384 34.6339 40.4057 34.7584 39.4283C34.883 38.4508 34.7685 37.4577 34.425 36.5342L33.599 34.425H40.3249C40.9725 34.4239 41.612 34.2806 42.1982 34.0054ZM39.9267 19.4094L41.7999 29.7344C41.8359 29.9485 41.8242 30.168 41.7655 30.3771C41.7069 30.5861 41.6028 30.7797 41.4607 30.9439C41.322 31.1104 41.1483 31.2443 40.952 31.3361C40.7558 31.4279 40.5416 31.4753 40.3249 31.4749H33.599C33.123 31.4757 32.6544 31.5917 32.233 31.8129C31.8116 32.0341 31.45 32.354 31.179 32.7453C30.908 33.1365 30.7357 33.5875 30.6768 34.0598C30.6179 34.5321 30.6741 35.0116 30.8407 35.4574L31.6225 37.5666C31.7763 37.9684 31.8451 38.3976 31.8246 38.8273C31.8042 39.257 31.6948 39.6778 31.5036 40.0631C31.3123 40.4484 31.0432 40.7899 30.7134 41.0659C30.3835 41.342 29.9999 41.5467 29.587 41.6671L25.575 32.6401V18.1999H38.4517C38.801 18.1942 39.1409 18.3127 39.411 18.5342C39.6811 18.7557 39.8639 19.0658 39.9267 19.4094ZM22.625 18.1999H19.675C19.2838 18.1999 18.9086 18.3553 18.632 18.6319C18.3554 18.9085 18.2 19.2837 18.2 19.6749V29.9999C18.2 30.391 18.3554 30.7662 18.632 31.0428C18.9086 31.3194 19.2838 31.4748 19.675 31.4748H22.625V18.1999Z"></path></svg>
                                                                <p className='not_for_me absolute bg-white text-black rounded-md font-bold px-1 top-[64px]'>Not for me</p>
                                                            </span>
                                                            <span className=' relative flex p-[12px] md:p-[16px] rounded-full  flex-col justify-center items-center gap-2 lg:p-[17px] lg:mt-[-12px] bg-inputbgcolor  hover:bg-white' onClick={() => openPopup()}><svg className=' fill-black' class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Share Android</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.423 2.041 C 16.823 2.136,16.237 2.369,15.725 2.716 C 14.735 3.389,14.086 4.536,14.013 5.743 L 13.989 6.145 11.344 7.588 C 9.182 8.768,8.688 9.022,8.636 8.985 C 8.600 8.960,8.483 8.873,8.376 8.791 C 8.098 8.579,7.556 8.306,7.175 8.186 C 5.790 7.752,4.219 8.136,3.197 9.157 C 2.770 9.585,2.518 9.962,2.302 10.500 C 2.075 11.062,2.020 11.355,2.020 12.000 C 2.020 12.645,2.075 12.938,2.302 13.500 C 2.775 14.677,3.750 15.535,4.995 15.871 C 5.330 15.962,5.460 15.975,6.000 15.977 C 6.564 15.978,6.656 15.968,7.020 15.864 C 7.598 15.699,8.163 15.407,8.551 15.074 L 8.682 14.961 11.335 16.288 L 13.989 17.614 14.012 18.137 C 14.051 19.039,14.337 19.818,14.876 20.488 C 16.372 22.351,19.110 22.511,20.806 20.836 C 21.761 19.893,22.182 18.525,21.917 17.227 C 21.755 16.431,21.399 15.760,20.841 15.197 C 20.485 14.837,20.163 14.613,19.663 14.376 C 19.100 14.110,18.697 14.024,18.000 14.024 C 17.270 14.024,16.885 14.111,16.255 14.419 C 15.639 14.720,15.229 15.055,14.771 15.634 L 14.696 15.728 12.246 14.503 C 10.230 13.495,9.799 13.265,9.817 13.209 C 9.940 12.809,9.976 12.533,9.977 12.000 C 9.978 11.520,9.962 11.359,9.886 11.067 C 9.835 10.872,9.799 10.709,9.807 10.703 C 9.814 10.697,10.894 10.106,12.208 9.391 L 14.595 8.090 14.731 8.295 C 15.165 8.948,15.952 9.535,16.746 9.797 C 18.744 10.456,20.945 9.428,21.712 7.477 C 21.928 6.927,21.980 6.637,21.979 5.980 C 21.979 5.439,21.968 5.341,21.864 4.980 C 21.651 4.243,21.340 3.700,20.841 3.197 C 20.113 2.462,19.179 2.055,18.140 2.020 C 17.876 2.011,17.554 2.021,17.423 2.041 M18.383 4.043 C 19.185 4.190,19.839 4.872,19.967 5.695 C 20.153 6.894,19.209 8.000,18.000 8.000 C 17.032 8.000,16.183 7.268,16.033 6.305 C 15.933 5.663,16.132 5.061,16.596 4.596 C 17.085 4.108,17.698 3.918,18.383 4.043 M6.383 10.043 C 7.185 10.190,7.839 10.872,7.967 11.695 C 8.153 12.894,7.209 14.000,6.000 14.000 C 5.032 14.000,4.183 13.268,4.033 12.305 C 3.933 11.663,4.132 11.061,4.596 10.596 C 5.085 10.108,5.698 9.918,6.383 10.043 M18.383 16.043 C 19.185 16.190,19.839 16.872,19.967 17.695 C 20.153 18.894,19.209 20.000,18.000 20.000 C 17.032 20.000,16.183 19.268,16.033 18.305 C 15.933 17.663,16.132 17.061,16.596 16.596 C 17.085 16.108,17.698 15.918,18.383 16.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                <p className='share absolute bg-white text-black rounded-md font-bold px-1 top-[64px]' >Share</p>
                                                            </span>

                                                            {openpopup && (<div className='popup_detail_page fixed top-0 border w-full h-full  z-10 left-0 '>
                                                                <div className='popup_detail_page_container bg-secondary absolute w-full px-3 bottom-0 p-3 rounded-xl flex flex-col gap-5 pb-6'>
                                                                    <div className='popup_detail_header flex justify-between px-3' >
                                                                        <h1 className='font-bold cursor-pointer'>Share</h1>
                                                                        <svg class="fbl-icon _30dE3d _1a_Ljt" onClick={() => close_btn_popup()} className='cursor-pointer close_btn_popup' viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Close</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.758 4.054 C 4.416 4.147,4.160 4.395,4.061 4.729 C 3.985 4.987,3.985 5.053,4.063 5.323 C 4.125 5.534,4.219 5.632,7.353 8.770 L 10.579 12.000 7.371 15.210 C 4.893 17.690,4.145 18.461,4.083 18.600 C 3.984 18.819,3.975 19.182,4.062 19.391 C 4.144 19.587,4.381 19.831,4.580 19.924 C 4.798 20.025,5.166 20.022,5.400 19.917 C 5.539 19.855,6.310 19.107,8.790 16.629 L 12.000 13.421 15.230 16.647 C 18.368 19.781,18.466 19.875,18.677 19.937 C 18.949 20.016,19.013 20.016,19.283 19.936 C 19.581 19.847,19.847 19.581,19.936 19.283 C 20.016 19.013,20.016 18.949,19.937 18.677 C 19.875 18.466,19.781 18.368,16.647 15.230 L 13.421 12.000 16.647 8.770 C 19.781 5.632,19.875 5.534,19.937 5.323 C 20.015 5.053,20.016 4.987,19.938 4.725 C 19.768 4.154,19.088 3.855,18.558 4.119 C 18.431 4.182,17.462 5.124,15.190 7.393 L 12.000 10.580 8.810 7.394 C 6.729 5.315,5.564 4.180,5.460 4.129 C 5.243 4.023,4.977 3.994,4.758 4.054 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                    </div>
                                                                    <div className='popup_social_links flex justify-between px-4'>
                                                                        <div className='flex items-center flex-col cursor-pointer'>
                                                                            <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Email</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.664 5.063 C 2.436 5.146,2.257 5.297,2.131 5.511 L 2.020 5.700 2.020 12.000 L 2.020 18.300 2.131 18.489 C 2.260 18.709,2.437 18.854,2.678 18.939 C 2.830 18.993,3.916 19.000,11.998 19.000 C 22.265 19.000,21.375 19.027,21.701 18.701 C 22.023 18.379,22.000 18.903,22.000 12.000 C 22.000 5.097,22.023 5.621,21.701 5.299 C 21.375 4.972,22.267 5.000,11.983 5.003 C 4.135 5.005,2.798 5.014,2.664 5.063 M16.020 8.868 C 12.466 10.648,12.288 10.732,12.040 10.750 L 11.780 10.769 8.020 8.887 L 4.260 7.005 12.000 7.004 L 19.740 7.004 16.020 8.868 M11.111 12.630 C 11.392 12.728,11.473 12.738,12.000 12.738 C 12.527 12.738,12.608 12.728,12.889 12.630 C 13.058 12.570,14.728 11.756,16.599 10.821 L 20.000 9.120 20.000 13.060 L 20.000 17.000 12.000 17.000 L 4.000 17.000 4.000 13.060 L 4.000 9.120 7.401 10.821 C 9.272 11.756,10.942 12.570,11.111 12.630 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                            <h1 className='text-white '>Email</h1>
                                                                        </div>
                                                                        <div className='flex items-center flex-col cursor-pointer'>
                                                                            <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Facebook</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.987 2.253,7.151 3.024,5.517 4.393 C 2.702 6.751,1.412 10.659,2.260 14.260 C 3.056 17.643,5.557 20.394,8.820 21.475 C 9.282 21.628,10.277 21.880,10.421 21.880 C 10.431 21.880,10.440 20.305,10.440 18.380 L 10.440 14.880 9.180 14.880 L 7.920 14.880 7.920 13.440 L 7.920 12.000 9.176 12.000 L 10.433 12.000 10.451 10.510 C 10.468 9.181,10.479 8.982,10.553 8.672 C 10.768 7.768,11.208 7.055,11.819 6.619 C 12.176 6.365,12.598 6.167,13.033 6.050 C 13.394 5.952,13.480 5.945,14.320 5.943 C 14.974 5.941,15.387 5.961,15.830 6.016 L 16.440 6.091 16.440 7.326 L 16.440 8.560 15.710 8.561 C 14.930 8.561,14.573 8.611,14.285 8.757 C 13.949 8.929,13.696 9.284,13.605 9.712 C 13.578 9.838,13.560 10.346,13.560 10.962 L 13.560 12.000 14.940 12.000 C 16.229 12.000,16.320 12.005,16.318 12.070 C 16.316 12.108,16.221 12.752,16.106 13.500 L 15.897 14.860 14.729 14.871 L 13.560 14.881 13.560 18.381 C 13.560 20.305,13.569 21.880,13.579 21.880 C 13.723 21.880,14.718 21.628,15.180 21.475 C 17.254 20.788,19.082 19.387,20.316 17.540 C 23.335 13.022,22.184 6.931,17.720 3.806 C 16.452 2.918,15.069 2.366,13.493 2.119 C 12.909 2.027,11.660 1.985,11.120 2.039 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                            <h1 className='text-white'>Facebook</h1>
                                                                        </div>
                                                                        <div className='flex items-center flex-col cursor-pointer'>
                                                                            <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Twitter</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.620 3.042 C 14.179 3.237,12.854 4.182,12.202 5.480 C 11.800 6.281,11.639 7.240,11.762 8.100 C 11.784 8.254,11.811 8.411,11.823 8.448 C 11.842 8.509,11.814 8.513,11.552 8.494 C 8.196 8.248,5.032 6.669,2.787 4.121 L 2.524 3.821 2.364 4.161 C 1.714 5.550,1.800 7.298,2.584 8.606 C 2.774 8.922,3.271 9.477,3.560 9.694 L 3.700 9.799 3.566 9.800 C 3.327 9.800,2.632 9.639,2.094 9.457 C 1.805 9.360,1.546 9.280,1.519 9.280 C 1.480 9.280,1.475 9.356,1.495 9.598 C 1.645 11.391,2.994 12.999,4.832 13.576 C 5.015 13.633,5.193 13.680,5.229 13.680 C 5.358 13.680,5.245 13.723,4.960 13.783 C 4.652 13.847,3.937 13.865,3.619 13.818 C 3.435 13.790,3.432 13.792,3.458 13.885 C 3.517 14.099,3.890 14.797,4.075 15.040 C 4.482 15.576,5.041 16.058,5.594 16.351 C 6.160 16.650,6.974 16.880,7.468 16.880 C 7.573 16.880,7.635 16.896,7.621 16.919 C 7.556 17.024,6.566 17.636,6.065 17.880 C 4.693 18.551,3.437 18.823,1.856 18.794 L 1.043 18.778 1.251 18.910 C 1.654 19.163,2.865 19.747,3.380 19.936 C 4.346 20.291,5.256 20.519,6.300 20.667 C 7.033 20.770,8.868 20.770,9.640 20.666 C 11.182 20.459,12.398 20.098,13.700 19.461 C 16.560 18.062,18.741 15.610,19.931 12.460 C 20.450 11.088,20.708 9.765,20.748 8.275 L 20.771 7.410 21.076 7.175 C 21.514 6.836,22.337 6.002,22.672 5.558 C 22.830 5.347,22.960 5.163,22.960 5.149 C 22.960 5.135,22.879 5.157,22.781 5.200 C 22.273 5.417,21.239 5.696,20.620 5.782 L 20.420 5.810 20.680 5.636 C 21.046 5.392,21.583 4.841,21.854 4.433 C 22.061 4.120,22.360 3.513,22.360 3.406 C 22.360 3.383,22.086 3.497,21.750 3.660 C 21.110 3.971,20.403 4.225,19.852 4.343 L 19.524 4.413 19.280 4.186 C 18.702 3.652,17.951 3.268,17.149 3.097 C 16.790 3.021,15.992 2.992,15.620 3.042 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                            <h1 className='text-white'>Twitter</h1>
                                                                        </div><div className='flex items-center flex-col cursor-pointer'>
                                                                            <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Pinterest</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.080 2.043 C 7.539 2.395,4.495 4.520,2.977 7.700 C 2.563 8.568,2.284 9.460,2.113 10.460 C 1.994 11.160,1.982 12.694,2.091 13.400 C 2.299 14.746,2.779 16.082,3.448 17.178 C 4.260 18.509,5.485 19.742,6.780 20.530 C 7.088 20.718,7.927 21.160,7.974 21.160 C 7.983 21.160,7.999 20.787,8.011 20.330 C 8.022 19.873,8.052 19.392,8.079 19.260 C 8.105 19.128,8.422 17.763,8.785 16.226 L 9.444 13.432 9.360 13.192 C 9.202 12.733,9.150 12.400,9.150 11.840 C 9.150 11.418,9.169 11.230,9.235 10.980 C 9.432 10.235,9.839 9.683,10.393 9.410 C 10.675 9.270,10.720 9.260,11.058 9.260 C 11.374 9.260,11.449 9.274,11.649 9.372 C 12.262 9.674,12.509 10.364,12.340 11.306 C 12.267 11.714,12.133 12.201,11.738 13.500 C 11.525 14.199,11.506 14.292,11.503 14.660 C 11.500 15.020,11.511 15.085,11.615 15.309 C 11.904 15.935,12.606 16.291,13.363 16.197 C 14.873 16.008,16.013 14.212,16.243 11.660 C 16.381 10.131,16.025 8.965,15.171 8.153 C 14.424 7.442,13.388 7.080,12.107 7.080 C 10.695 7.081,9.472 7.563,8.560 8.480 C 7.673 9.370,7.200 10.546,7.200 11.855 C 7.201 12.652,7.354 13.148,7.782 13.733 C 8.043 14.091,8.048 14.144,7.886 14.780 C 7.754 15.297,7.710 15.391,7.573 15.443 C 7.434 15.495,7.251 15.440,6.919 15.242 C 6.001 14.697,5.430 13.657,5.277 12.253 C 5.083 10.466,5.794 8.600,7.165 7.300 C 8.247 6.273,9.583 5.662,11.240 5.434 C 11.784 5.360,13.042 5.371,13.540 5.455 C 16.210 5.905,18.135 7.680,18.626 10.145 C 18.768 10.857,18.700 12.268,18.476 13.240 C 18.115 14.808,17.265 16.204,16.182 17.010 C 15.346 17.632,14.058 18.026,13.130 17.943 C 12.212 17.861,11.303 17.395,10.960 16.831 C 10.907 16.743,10.877 16.722,10.864 16.762 C 10.853 16.794,10.688 17.432,10.498 18.180 C 10.056 19.914,9.881 20.386,9.345 21.294 L 9.168 21.593 9.474 21.675 C 12.472 22.472,15.673 21.801,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.429 2.058,12.028 1.949,11.080 2.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                                                            <h1 className='text-white'>Pinterest</h1>
                                                                        </div>
                                                                    </div>
                                                                    <div className='copyLinkbtn  px-3 cursor-pointer hover:scale-[1.07] transition-all ' onClick={() => copied()}>
                                                                        <div className='p-3 bg-white text-black font-bold text-center rounded-xl px-4 hover:text-gray-900'>{changeCopy} </div>
                                                                    </div>
                                                                </div>
                                                            </div>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='movie_detail_note text-[15px] pb-4 text-azongray font-medium leading-4 bg-black mt-[-8px] pt-5 2xl:mt-[0px]'>
                                                        Rentals include 30 days to start watching this video and 48 hours to finish once started.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='movie_description_wrapper mb-5'>
                                                <p className='leading-[0.6cm] lg:leading-7 lg:tracking-wide pb-2 md:text-[18px] lg:text-[21px] movie_detail_page_desciption'>{data.Plot}</p>
                                                <div className='flex flex-wrap items-center gap-2 pr-9'>
                                                    <div className=' text-azongray font-bold pb-2'><span className='mr-4'>{data.Runtime}</span> <span>{data.Year}</span> </div>
                                                    <div className='movie_badges flex items-center gap-1 font-bold pb-2'>
                                                        <span className=' bg-inputbgcolor text-[13px] p-1 rounded-md'>X-RAY</span>
                                                        <span className=' bg-inputbgcolor text-[13px] p-1 rounded-md'>HDR</span>
                                                        <span className=' bg-inputbgcolor text-[13px] p-1 rounded-md'>UHD</span>
                                                        <span className=' bg-inputbgcolor text-[13px] p-[3px] rounded-md'><title>Subtitles Cc</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.503 4.042 C 3.487 4.214,2.556 4.976,2.202 5.925 C 1.996 6.477,2.001 6.315,2.001 11.992 C 2.000 17.780,1.991 17.556,2.234 18.151 C 2.521 18.857,3.143 19.479,3.849 19.766 C 4.453 20.012,4.024 20.000,12.000 20.000 C 19.974 20.000,19.547 20.012,20.150 19.767 C 20.850 19.482,21.482 18.850,21.767 18.150 C 22.008 17.556,22.000 17.777,22.000 12.000 C 22.000 6.221,22.008 6.444,21.766 5.849 C 21.499 5.193,20.964 4.633,20.296 4.312 C 19.636 3.994,20.412 4.023,12.120 4.015 C 8.039 4.012,4.611 4.024,4.503 4.042 M19.340 6.066 C 19.455 6.105,19.603 6.201,19.701 6.299 C 20.021 6.619,20.000 6.217,20.000 12.000 C 20.000 17.783,20.021 17.381,19.701 17.701 C 19.377 18.025,20.023 18.000,12.000 18.000 C 3.977 18.000,4.623 18.025,4.299 17.701 C 3.979 17.381,4.000 17.783,4.000 12.000 C 4.000 6.216,3.979 6.619,4.300 6.298 C 4.616 5.982,3.975 6.007,11.983 6.003 C 18.550 6.000,19.162 6.006,19.340 6.066 M7.811 12.278 C 7.536 12.345,7.316 12.587,7.260 12.885 C 7.197 13.220,7.450 13.624,7.781 13.715 C 8.005 13.778,15.995 13.778,16.219 13.715 C 16.431 13.657,16.660 13.422,16.719 13.204 C 16.808 12.873,16.689 12.566,16.395 12.372 L 16.226 12.260 12.083 12.254 C 9.804 12.250,7.882 12.261,7.811 12.278 M5.811 15.278 C 5.535 15.346,5.316 15.587,5.260 15.885 C 5.197 16.220,5.450 16.624,5.781 16.715 C 5.995 16.775,8.005 16.775,8.219 16.715 C 8.431 16.657,8.660 16.422,8.719 16.204 C 8.808 15.873,8.689 15.566,8.395 15.372 L 8.226 15.260 7.083 15.253 C 6.454 15.249,5.882 15.260,5.811 15.278 M10.811 15.278 C 10.536 15.345,10.316 15.587,10.260 15.885 C 10.197 16.220,10.450 16.624,10.781 16.715 C 11.004 16.777,17.996 16.777,18.219 16.715 C 18.431 16.657,18.660 16.422,18.719 16.204 C 18.808 15.873,18.689 15.566,18.395 15.372 L 18.226 15.260 14.583 15.254 C 12.579 15.250,10.882 15.261,10.811 15.278 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg>
                                                        </span>
                                                        <span className='bg-inputbgcolor text-[13px] p-2 rounded-md'><svg width="28" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.404 10.986V1.003c.725 0 3.265-.058 4.403.352 1.76.676 3.05 2.326 3.05 4.449 0 2.053-.736 3.579-2.244 4.55-1.179.84-4.508.613-5.209.632Zm-10.052 0h3.154l.832-1.283H9.25v1.283h2.21V1.003H8.734l-6.382 9.983Zm12.333-2.761c0 .061.046.113.107.118.064.006.129.008.194.008 1.308 0 2.368-1.076 2.368-2.404 0-1.328-1.06-2.405-2.368-2.405-.065 0-.13.003-.194.008a.118.118 0 0 0-.107.118v4.557Zm-7.33-.611H9.23v-3.24l-1.875 3.24ZM24.71 11c.834-1.52 1.439-3.191 1.439-4.953 0-1.798-.549-3.501-1.416-5.047h-1.46c1.008 1.544 1.626 3.257 1.626 5.047 0 1.754-.671 3.434-1.64 4.953h1.451Zm-2.269 0c.979-1.488 1.677-3.165 1.677-4.953 0-1.826-.647-3.536-1.664-5.047H20.9c1.223 1.505 1.968 3.232 1.968 5.047 0 1.777-.793 3.47-1.968 4.953h1.541Zm-2.478 0c1.201-1.431 2.051-3.12 2.051-4.953 0-1.873-.806-3.596-2.055-5.047h-2.006c1.904 1.313 2.811 3.191 2.811 5.047 0 1.816-.741 3.656-2.709 4.953h1.908Z" fill="currentColor"></path></svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='movie_genre'>
                                                    <span className='font-bold'>
                                                        {data.Genre}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-2 w-[120%] bg-black text-white' >
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className='additional_detail_section relative bg-black text-white z-[0]'>
                    <div className='flex justify-center font-bold gap-5 md:text-[18px] lg:text-[20px] lg:tracking-wider'>
                        <p onClick={() => relatedMovies(0)} className={`cursor-pointer ${activeindex === 0 ? "border-b-[3px]" : ''}`}>Related</p>
                        <p onClick={() => relatedMovies(1)} className={`cursor-pointer ${activeindex === 1 ? "border-b-[3px]" : ''}`}>Details</p>
                    </div>
                    {activeindex === 0 && (<div>
                        <div className='cutomers_watched pl-5 pt-5 md:pl-[28px] lg:pl-[65px]'>
                            <h1 className='font-bold md:text-[18px] lg:text-[20px]'>Customers also Watched</h1>
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
                            className="mySwiperpagination md:mb-[0px] pl-5 pt-5 md:pl-[28px] lg:pl-[65px]"
                        >
                            {info && info.map((data, index) => (
                                <SwiperSlide className='swiper_slide relative mt-5 md:mt-0' key={data.imdbID} onMouseEnter={() => handleclick(data.imdbID)} ><img src={data.Poster} onClick={() => handledetail(data.imdbID)} />
                                    <div className='movies_data absolute hidden md:block bg-black text-white w-[111%] flex-col py-1 rounded-md '>
                                        <div>
                                            {data && ((
                                                <>
                                                    <div className='flex items-center gap-1 lg:gap-0 pb-2 lg: p-2 '>
                                                        <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" className='w-4 lg:w-10 lg:h-5' viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                                        <p className='text-[12px] lg:text-[16px] font-bold text-left leading-4 lg:leading-5 tracking-wide lg:max-w-48'>Watch with a free Prime trial </p>
                                                    </div>
                                                    <div className='flex justify-between text-[15px] lg:text-[18px] font-bold gap-3 px-2 lg:px-5'>
                                                        <div className='min-w-7 text-left overflow-x-auto mb-3'><p className=''>{data.Title} </p></div>
                                                        <div className='flex items-center gap-2 pb-6'>
                                                            <Link to="/signinpage"><span className='plusicon '><svg class="fbl-icon _3UMk3x _1a_Ljt" className='plusicion bg-gray-800 hover:bg-white hover:text-primarycolor rounded-full  p-1 lg:h-[29px] lg:w-[29px] ' viewBox="0 0 24 24" height="20" width="20" role="img" aria-hidden="true "><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg> <span className='watchlist_blower'>Watchlist</span></span></Link>
                                                            <span className='movie_icon_wrapper' onClick={() => handledetail(data.imdbID)}>
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
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>)}
                    {activeindex === 1 && (<div className='movie_additional_details px-5 pt-5 md:pl-[28px] lg:px-[65px]'>
                        {info && info.map((data, index) => (<div className='flex flex-col gap-3 pb-10 lg:gap-8'>
                            <div className='font-bold  md:text-[18px] lg:text-[20px]'>
                                More Info
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h1 className=' text-[14px] font-bold tracking-wider  md:text-[18px] '>Content advisory</h1>
                                <p className='text-azongray font-bold'>{data.Genre}</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className=' text-[14px] font-bold tracking-wider md:text-[18px] '>Audio Languages</h2>
                                <p className='text-azongray font-bold'>{data.Language}</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className=' text-[14px] font-bold tracking-wider md:text-[18px] '>Subtitles</h2>
                                <p className='text-azongray font-bold'>Not Provided</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className=' text-[14px] font-bold tracking-wider md:text-[18px] '>Directors</h2>
                                <p className=' underline font-bold'>{data.Director}</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className=' text-[14px] font-bold tracking-wider md:text-[18px] '>Producers</h2>
                                <p className=' underline font-bold'>{data.Writer}</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className=' text-[14px] font-bold tracking-wider md:text-[18px] '>Starring</h2>
                                <p className=' underline font-bold'>{data.Actors}</p>
                            </div>
                            <div className='pb-8 flex flex-col gap-4'>
                                <h2 className=' text-[14px] font-bold tracking-wider md:text-[18px] '>
                                    Studio
                                </h2>
                                <p className='text-azongray font-bold'>{data.Genre}</p>
                            </div>
                            <div>
                                <h2 className=' text-[14px] font-bold tracking-wider text-azongray leading-4  md:text-[17px]'>By clicking play ,you agree to our<span className='underline text-white'> Terms of Use</span>.</h2>
                            </div>
                        </div>))}
                        <div className='feeback flex flex-col gap-5 pt-10 border-t-[3px] border-[gray]'>
                            <div className='flex flex-col gap-2'>
                                <h2 className=' text-[15px] font-bold tracking-wider md:text-[18px] '>Feedback</h2>
                                <a href="#" className='underline text-[14px]  md:text-[16px] font-bold lg:tracking-wide'>Send Us Feedback</a>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className=' text-[15px] font-bold tracking-wider md:text-[18px] '>Support</h2>
                                <a href="#" className='underline text-[14px]  md:text-[16px] font-bold lg:tracking-wide'>Get Help</a>
                            </div>
                        </div>
                    </div>)}
                </div>
                {/* popup of purchase option button */}
                {openPurchasebox && (<div className='purchase_Popup fixed  top-0  h-full z-50 w-full'>
                    <div className='purchase_Popup_container absolute w-full bg-secondary bottom-0 px-6 py-[12px] flex flex-col gap-3 z-50'>
                        <div className='purchase_Popup_header flex items-center justify-between z-50 text-white font-bold pt-[4px]' >
                            <h2 className='md:text-[18px] xl:text-[20px]' >More Purchase options</h2>
                            <span onClick={()=>closePurchase()}><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Close</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.758 4.054 C 4.416 4.147,4.160 4.395,4.061 4.729 C 3.985 4.987,3.985 5.053,4.063 5.323 C 4.125 5.534,4.219 5.632,7.353 8.770 L 10.579 12.000 7.371 15.210 C 4.893 17.690,4.145 18.461,4.083 18.600 C 3.984 18.819,3.975 19.182,4.062 19.391 C 4.144 19.587,4.381 19.831,4.580 19.924 C 4.798 20.025,5.166 20.022,5.400 19.917 C 5.539 19.855,6.310 19.107,8.790 16.629 L 12.000 13.421 15.230 16.647 C 18.368 19.781,18.466 19.875,18.677 19.937 C 18.949 20.016,19.013 20.016,19.283 19.936 C 19.581 19.847,19.847 19.581,19.936 19.283 C 20.016 19.013,20.016 18.949,19.937 18.677 C 19.875 18.466,19.781 18.368,16.647 15.230 L 13.421 12.000 16.647 8.770 C 19.781 5.632,19.875 5.534,19.937 5.323 C 20.015 5.053,20.016 4.987,19.938 4.725 C 19.768 4.154,19.088 3.855,18.558 4.119 C 18.431 4.182,17.462 5.124,15.190 7.393 L 12.000 10.580 8.810 7.394 C 6.729 5.315,5.564 4.180,5.460 4.129 C 5.243 4.023,4.977 3.994,4.758 4.054 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                        </div>
                        <div className='purchase_Popup_main flex flex-col   gap-2 z-50 text-white font-bold'>
                            <div className='flex items-center gap-1'> <svg class="fbl-icon _3UMk3x _1a_Ljt NbhXwl" viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Store Filled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.503 2.041 C 8.483 2.217,7.556 2.976,7.202 3.925 C 7.027 4.393,7.001 4.639,7.001 5.849 L 7.000 6.998 4.869 7.009 L 2.738 7.020 2.539 7.122 C 2.312 7.239,2.102 7.491,2.040 7.720 C 2.011 7.828,2.002 9.427,2.011 12.809 C 2.024 17.275,2.031 17.766,2.092 18.013 C 2.358 19.085,2.821 19.909,3.550 20.605 C 4.122 21.152,4.727 21.515,5.465 21.754 C 6.194 21.990,5.896 21.980,12.000 21.980 C 18.104 21.980,17.806 21.990,18.535 21.754 C 20.034 21.268,21.241 20.077,21.737 18.593 C 21.990 17.837,21.974 18.211,21.989 12.804 C 22.004 7.245,22.024 7.622,21.702 7.300 C 21.400 6.998,21.420 7.000,19.073 7.000 L 17.000 7.000 17.000 5.858 C 17.000 4.609,16.970 4.349,16.766 3.849 C 16.499 3.193,15.964 2.633,15.296 2.312 C 14.674 2.013,14.813 2.026,12.120 2.016 C 10.789 2.011,9.611 2.023,9.503 2.041 M14.340 4.066 C 14.593 4.153,14.847 4.407,14.934 4.660 C 14.989 4.822,15.000 5.033,15.000 5.927 L 15.000 7.000 16.000 7.000 L 17.000 7.000 17.000 9.573 C 17.000 12.477,17.008 12.394,16.701 12.701 C 16.521 12.881,16.242 13.000,16.000 13.000 C 15.758 13.000,15.479 12.881,15.299 12.701 C 14.992 12.394,15.000 12.477,15.000 9.573 L 15.000 7.000 12.000 7.000 L 9.000 7.000 9.000 9.573 C 9.000 12.477,9.008 12.394,8.701 12.701 C 8.310 13.092,7.690 13.092,7.299 12.701 C 6.992 12.394,7.000 12.477,7.000 9.573 L 7.000 7.000 8.000 7.000 L 9.000 7.000 9.000 5.927 C 9.000 4.691,9.021 4.577,9.300 4.298 C 9.596 4.002,9.550 4.007,11.983 4.003 C 13.897 4.000,14.168 4.008,14.340 4.066 " fill="yellow" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                <div className='text-[12px] tracking-wider md:text-[16px] xl:text-[17px]'>Watch for ₹0 with Prime</div>
                            </div>
                            <div>
                                <Link to="/signinpage"> <div className='movie_options_trial_btn_popup py-1 md:p-2 rounded-lg tracking-widest bg-inputbgcolor flex flex-col justify-center items-center font-bold hover:scale-[1.1] hover:text-gray hover:bg-white transition-all text-white hover:text-black     '>
                                    <button className=' text-[15px] md:text-[18px] tracking-wider mt-[-2px]'>Watch with Prime</button>
                                    <span className='text-[12px] md:text-[16px] tracking-normal'>Start your 30-day free trial</span>
                                </div></Link>
                            </div>
                            <h2 className='md:text-[18px] xl:text-[19px] lg:tracking-wide'>Rent</h2>
                            <div className='purchase_btns flex gap-3 flex-col z-50'>
                                <div className='movie_options_rent_btn py-[14.5px] md:p-2 rounded-lg tracking-widest bg-inputbgcolor hover:scale-[1.1] hover:text-black hover:bg-white transition-all text-white flex flex-col justify-center items-center font-bold'>
                                    <Link to="/signinpage"> <button className=' text-[15px] md:text-[16px] tracking-wider mt-[-2px]'>Rent <span className='uhd_badge'>UHD ₹119</span></button></Link>
                                </div><div className='movie_options_rent_btn py-[14.5px] md:p-2 rounded-lg tracking-widest bg-inputbgcolor hover:scale-[1.1] hover:text-black hover:bg-white transition-all text-white flex flex-col justify-center items-center font-bold'>
                                    <Link to="/signinpage"> <button className=' text-[15px] md:text-[16px] tracking-wider mt-[-2px]'>Rent <span className='uhd_badge'>UHD ₹119</span></button></Link>
                                </div><div className='movie_options_rent_btn py-[14.5px] md:p-2 rounded-lg tracking-widest bg-inputbgcolor hover:scale-[1.1] hover:text-black hover:bg-white transition-all text-white flex flex-col justify-center items-center font-bold'>
                                    <Link to="/signinpage"> <button className=' text-[15px] md:text-[16px] tracking-wider mt-[-2px]'>Rent <span className='uhd_badge'>UHD ₹119</span></button></Link>
                                </div>
                            </div>
                        </div>
                        <div className='text-[14px] font-bold leading-[16px] text-azongray md:text-[18px] xl:text-[18px] md:leading-[18px]    '>
                            Rentals include 30 days to start watching this video and 48 hours to finish once started.
                        </div>
                    </div>
                </div>)}
                <Footer />
            </div>
        </>
    );
}
