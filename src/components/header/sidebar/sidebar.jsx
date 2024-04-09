import React, { useState } from 'react'
import './sidebar.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const sidebar = () => {
    const navigate = useNavigate();

    const handleRedirect = async (genre) => {
        try {
            const response = await fetch(`https://omdbapi.com/?s=${genre}&apikey=eae86d55`);
            const data = await response.json();

            if (data.Response === 'True') {
                navigate(`/allmovies/${genre}`);

            } else {
                // setSelectedMovie(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //open dobule links in sidebar
    const [arrow, setcategoryArrow] = useState();
    const [open, setopenLinks] = useState();
    const openSidebarDoubleLinks = () => {
        setopenLinks(!open);
        setcategoryArrow(!arrow)
    }
    //open sidebar link
    const [genre, setgenre] = useState();
    const [featuredCollection, setFeaturedCollections] = useState();
    const genreopen = () => {
        setgenre(!genre)
    }
    const featuredCollectionsOpen = () => {
        setFeaturedCollections(!featuredCollection);
    }
    return (
        <div>
            <div className='header_sidebar z-50 '>
                <div className='sidebar_wrapper text-white'>
                    <ul className='pt-3 pl-6 flex flex-col gap-[27px]  font-extralight  text-[14px] tracking-wide'>
                        <li className='text-azongray flex items-center justify-start'>
                            <span className='mr-2'><svg class="fbl-icon _3UMk3x _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Home</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.648 2.070 C 11.552 2.110,9.467 3.704,6.858 5.734 C 2.942 8.780,2.223 9.355,2.130 9.514 L 2.020 9.700 2.009 15.414 C 2.002 19.278,2.012 21.177,2.041 21.282 C 2.102 21.509,2.313 21.761,2.539 21.878 L 2.738 21.980 5.936 21.991 C 9.548 22.003,9.387 22.015,9.700 21.702 C 10.002 21.400,10.000 21.420,10.000 19.073 L 10.000 17.000 11.999 17.000 L 13.997 17.000 14.009 19.150 L 14.020 21.300 14.131 21.489 C 14.192 21.592,14.301 21.723,14.374 21.778 C 14.672 22.006,14.578 22.000,17.998 22.000 C 21.546 22.000,21.389 22.013,21.702 21.700 C 22.024 21.378,22.002 21.848,21.991 15.418 L 21.980 9.700 21.870 9.514 C 21.778 9.356,21.059 8.781,17.170 5.755 C 14.646 3.790,12.509 2.147,12.422 2.103 C 12.209 1.996,11.866 1.981,11.648 2.070 M16.020 7.395 L 20.000 10.491 20.000 15.245 L 20.000 20.000 18.000 20.000 L 16.000 20.000 16.000 17.500 L 16.000 15.000 12.000 15.000 L 8.000 15.000 8.000 17.500 L 8.000 20.000 6.000 20.000 L 4.000 20.000 4.000 15.246 L 4.000 10.491 7.990 7.386 C 10.184 5.679,11.993 4.286,12.010 4.291 C 12.026 4.296,13.831 5.693,16.020 7.395 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                            <Link to="/">Home</Link>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>
                            <span className='mr-2'><svg class="fbl-icon _3UMk3x _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Store</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.503 2.041 C 8.483 2.217,7.556 2.976,7.202 3.925 C 7.027 4.393,7.001 4.639,7.001 5.849 L 7.000 6.998 4.869 7.009 L 2.738 7.020 2.539 7.122 C 2.312 7.239,2.102 7.491,2.040 7.720 C 2.011 7.828,2.002 9.427,2.011 12.809 C 2.024 17.275,2.031 17.766,2.092 18.013 C 2.358 19.085,2.821 19.909,3.550 20.605 C 4.122 21.152,4.727 21.515,5.465 21.754 C 6.194 21.990,5.896 21.980,12.000 21.980 C 18.104 21.980,17.806 21.990,18.535 21.754 C 20.034 21.268,21.241 20.077,21.737 18.593 C 21.990 17.837,21.974 18.211,21.989 12.804 C 22.004 7.245,22.024 7.622,21.702 7.300 C 21.400 6.998,21.420 7.000,19.073 7.000 L 17.000 7.000 17.000 5.858 C 17.000 4.609,16.970 4.349,16.766 3.849 C 16.499 3.193,15.964 2.633,15.296 2.312 C 14.674 2.013,14.813 2.026,12.120 2.016 C 10.789 2.011,9.611 2.023,9.503 2.041 M14.340 4.066 C 14.593 4.153,14.847 4.407,14.934 4.660 C 14.989 4.822,15.000 5.033,15.000 5.927 L 15.000 7.000 12.000 7.000 L 9.000 7.000 9.000 5.927 C 9.000 4.691,9.021 4.577,9.300 4.298 C 9.596 4.002,9.550 4.007,11.983 4.003 C 13.897 4.000,14.168 4.008,14.340 4.066 M7.000 10.570 C 7.000 11.528,7.017 12.198,7.042 12.289 C 7.103 12.509,7.315 12.762,7.531 12.874 C 7.932 13.080,8.390 13.012,8.700 12.702 C 8.994 12.408,9.000 12.363,9.000 10.573 L 9.000 9.000 12.000 9.000 L 15.000 9.000 15.000 10.570 C 15.000 11.528,15.017 12.198,15.042 12.289 C 15.103 12.509,15.315 12.762,15.531 12.874 C 15.932 13.080,16.390 13.012,16.700 12.702 C 16.994 12.408,17.000 12.363,17.000 10.573 L 17.000 9.000 18.500 9.000 L 20.000 9.000 20.000 13.116 C 20.000 17.763,20.008 17.617,19.704 18.260 C 19.281 19.152,18.537 19.741,17.581 19.938 C 17.146 20.028,6.849 20.030,6.425 19.940 C 5.466 19.737,4.729 19.164,4.312 18.296 C 4.002 17.651,4.024 18.031,4.010 13.270 L 3.998 9.000 5.499 9.000 L 7.000 9.000 7.000 10.570 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                            </span>
                            <p onClick={() => handleRedirect('store')}>Store</p>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>   <span className='mr-2'>
                            <svg class="fbl-icon _3UMk3x _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Live</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.758 2.054 C 7.416 2.147,7.160 2.395,7.061 2.729 C 6.984 2.987,6.985 3.054,7.064 3.323 C 7.124 3.528,7.196 3.609,8.350 4.767 L 9.572 5.995 7.476 6.010 C 5.094 6.028,5.066 6.031,4.337 6.376 C 3.203 6.914,2.466 7.786,2.129 8.989 L 2.020 9.380 2.020 14.000 L 2.020 18.620 2.131 19.017 C 2.552 20.526,3.707 21.608,5.226 21.917 C 5.627 21.999,5.720 22.000,12.000 22.000 C 18.280 22.000,18.373 21.999,18.774 21.917 C 20.291 21.608,21.457 20.515,21.872 19.012 L 21.980 18.620 21.980 14.000 L 21.980 9.380 21.874 8.995 C 21.542 7.796,20.797 6.914,19.663 6.376 C 18.934 6.031,18.906 6.028,16.524 6.010 L 14.428 5.995 15.650 4.767 C 16.804 3.609,16.876 3.528,16.936 3.323 C 17.015 3.053,17.016 2.987,16.938 2.725 C 16.768 2.154,16.088 1.855,15.558 2.119 C 15.436 2.180,14.854 2.732,13.690 3.893 L 12.000 5.579 10.310 3.894 C 9.250 2.836,8.560 2.179,8.460 2.129 C 8.244 2.023,7.978 1.994,7.758 2.054 M18.383 8.043 C 19.151 8.184,19.816 8.849,19.957 9.617 C 20.017 9.948,20.017 18.052,19.957 18.383 C 19.819 19.138,19.170 19.797,18.408 19.956 C 18.109 20.018,5.891 20.018,5.592 19.956 C 4.830 19.797,4.181 19.138,4.043 18.383 C 3.983 18.052,3.983 9.948,4.043 9.617 C 4.180 8.868,4.847 8.187,5.580 8.047 C 5.875 7.991,18.077 7.987,18.383 8.043 M10.080 11.603 C 9.821 11.720,6.760 14.775,6.619 15.058 C 6.427 15.442,6.502 15.865,6.819 16.181 C 7.040 16.403,7.228 16.480,7.547 16.480 C 7.913 16.480,8.043 16.379,9.319 15.102 L 10.498 13.921 11.719 15.135 C 13.027 16.435,13.110 16.499,13.500 16.499 C 13.902 16.499,13.940 16.469,15.671 14.745 C 16.879 13.542,17.307 13.090,17.381 12.942 C 17.631 12.442,17.398 11.827,16.873 11.601 C 16.597 11.482,16.243 11.503,15.992 11.653 C 15.897 11.709,15.298 12.278,14.661 12.917 L 13.501 14.079 12.301 12.882 C 11.421 12.005,11.052 11.663,10.920 11.603 C 10.680 11.495,10.320 11.495,10.080 11.603 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                        </span>
                            <Link to="Tvshows">Live TV</Link>
                        </li>
                        <li className='text-azongray flex items-start justify-start flex-col categories_sidebar'>
                            <div className='categories_content'>
                                <span className='mr-2'><svg class="fbl-icon _3UMk3x _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Categories</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.664 2.063 C 2.436 2.146,2.257 2.297,2.131 2.511 L 2.020 2.700 2.020 6.500 L 2.020 10.300 2.131 10.489 C 2.192 10.592,2.301 10.723,2.374 10.778 C 2.675 11.008,2.531 11.000,6.498 11.000 C 10.604 11.000,10.387 11.015,10.701 10.701 C 11.015 10.387,11.000 10.604,11.000 6.500 C 11.000 2.396,11.015 2.613,10.701 2.299 C 10.386 1.984,10.606 2.000,6.483 2.003 C 3.408 2.005,2.795 2.015,2.664 2.063 M13.664 2.063 C 13.436 2.146,13.257 2.297,13.131 2.511 L 13.020 2.700 13.020 6.500 L 13.020 10.300 13.131 10.489 C 13.192 10.592,13.301 10.723,13.374 10.778 C 13.675 11.008,13.531 11.000,17.498 11.000 C 21.604 11.000,21.387 11.015,21.701 10.701 C 22.015 10.387,22.000 10.604,22.000 6.500 C 22.000 2.396,22.015 2.613,21.701 2.299 C 21.386 1.984,21.606 2.000,17.483 2.003 C 14.408 2.005,13.795 2.015,13.664 2.063 M9.000 6.500 L 9.000 9.000 6.500 9.000 L 4.000 9.000 4.000 6.500 L 4.000 4.000 6.500 4.000 L 9.000 4.000 9.000 6.500 M20.000 6.500 L 20.000 9.000 17.500 9.000 L 15.000 9.000 15.000 6.500 L 15.000 4.000 17.500 4.000 L 20.000 4.000 20.000 6.500 M2.664 13.063 C 2.436 13.146,2.257 13.297,2.131 13.511 L 2.020 13.700 2.020 17.500 L 2.020 21.300 2.131 21.489 C 2.192 21.592,2.301 21.723,2.374 21.778 C 2.675 22.008,2.531 22.000,6.498 22.000 C 10.604 22.000,10.387 22.015,10.701 21.701 C 11.015 21.387,11.000 21.604,11.000 17.500 C 11.000 13.396,11.015 13.613,10.701 13.299 C 10.386 12.984,10.606 13.000,6.483 13.003 C 3.408 13.005,2.795 13.015,2.664 13.063 M13.664 13.063 C 13.436 13.146,13.257 13.297,13.131 13.511 L 13.020 13.700 13.020 17.500 L 13.020 21.300 13.131 21.489 C 13.192 21.592,13.301 21.723,13.374 21.778 C 13.675 22.008,13.531 22.000,17.498 22.000 C 21.604 22.000,21.387 22.015,21.701 21.701 C 22.015 21.387,22.000 21.604,22.000 17.500 C 22.000 13.396,22.015 13.613,21.701 13.299 C 21.386 12.984,21.606 13.000,17.483 13.003 C 14.408 13.005,13.795 13.015,13.664 13.063 M9.000 17.500 L 9.000 20.000 6.500 20.000 L 4.000 20.000 4.000 17.500 L 4.000 15.000 6.500 15.000 L 9.000 15.000 9.000 17.500 M20.000 17.500 L 20.000 20.000 17.500 20.000 L 15.000 20.000 15.000 17.500 L 15.000 15.000 17.500 15.000 L 20.000 15.000 20.000 17.500 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                                </span>
                                <p onClick={() => openSidebarDoubleLinks()}>Categories</p>
                                <div className='categories_sidebar_arrow'>
                                    {arrow ?(<svg version="1.0" xmlns="http://www.w3.org/2000/svg" className='rotate-[180deg]'
                                        viewBox="0 0 64.000000 64.000000"
                                        preserveAspectRatio="xMidYMid meet">

                                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                            fill="white" stroke="none">
                                            <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                        </g>
                                    </svg>):(<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 64.000000 64.000000"
                                        preserveAspectRatio="xMidYMid meet">

                                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                            fill="white" stroke="none">
                                            <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                        </g>
                                    </svg>)}
                                </div>
                            </div>
                            {open && (
                                <ul className='pl-3 pt-7'>
                                    <li className='genre_dropdown_sidebar'>
                                        <div className='flex items-center gap-1'>
                                            <p onClick={() => genreopen()}>Genres</p>
                                            <div className='genre_sidebar_arrow'>
                                                {genre ? (<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 64.000000 64.000000" className='rotate-[180deg]'
                                                    preserveAspectRatio="xMidYMid meet">

                                                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                                        fill="white" stroke="none">
                                                        <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                                    </g>
                                                </svg>) : (<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 64.000000 64.000000"
                                                    preserveAspectRatio="xMidYMid meet">

                                                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                                        fill="white" stroke="none">
                                                        <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                                    </g>
                                                </svg>)}
                                            </div>
                                        </div>

                                        {genre && (<ul className=' mt-[13px] flex flex-col gap-[3px] bg-inputbgcolor text-azongray  w-[100vw] ml-[-36px] z-10 '>
                                            <li className='p-3 pt-[13px] pl-[48px]' onClick={() => handleRedirect('adventure')}>Action and adventure</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('Anime')}>Anime</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('comedy')}>Comedy</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('documentary')}>Documentary</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('drama')}>Drama</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('kids')}>Kids</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('mystery')}>Mystery and thrillers</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('romance')}>Romance</li>
                                            <li className='p-3 pl-[48px]' onClick={() => handleRedirect('science')}>Science fiction</li>
                                        </ul>)}
                                    </li>
                                </ul>
                            )}
                            {open && (<ul className='pl-3 pt-7  z-40'>
                                <li className='featured_dropdown_sidebar'>
                                    <div className='flex items-center gap-1'>
                                        <p onClick={() => featuredCollectionsOpen()}>Featured Collections</p>
                                        <div className='featured_sidebar_arrow'>
                                            {featuredCollection ? (<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 64.000000 64.000000" className=' rotate-[180deg]'
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                                    fill="white" stroke="none">
                                                    <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                                </g>
                                            </svg>) : (<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 64.000000 64.000000"
                                                preserveAspectRatio="xMidYMid meet">

                                                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                                    fill="white" stroke="none">
                                                    <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z"/>
                                                </g>
                                            </svg>)}
                                        </div>
                                    </div>
                                    {featuredCollection && (<ul className=' mt-[13px] flex flex-col gap-[3px] bg-inputbgcolor text-azongray  w-[100vw] ml-[-36px] z-10 '>
                                        <li className='p-3 pt-[13px] pl-[48px]' onClick={() => handleRedirect('hindi')}>Hindi</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('english')}>English</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('telugu')}>Telugu</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('tamil')}>Tamil</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('malaylam')}>Malayalam</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('kannada')}>Kannada</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('marathi')}>Marathi</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('punjabi')}>Punjabi</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('gujarati')}>Gujarati</li>
                                        <li className='p-3 pl-[48px]' onClick={() => handleRedirect('bengali')}>Bengali</li>
                                    </ul>)}
                                </li>
                            </ul>)}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default sidebar
