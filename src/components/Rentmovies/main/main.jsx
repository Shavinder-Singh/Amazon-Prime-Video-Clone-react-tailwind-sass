import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './main.scss';
import Header from '../../header/header'
import { Navigation } from 'swiper/modules';

export default function App() {
    const [punjabi, setpunjabi] = useState();
    console.log(punjabi);
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=rent&apikey=eae86d55")
            .then(function (response) {
                setpunjabi(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
    return (
        <>
        <Header/>
            <div className='movies_section pb-5 bg-primary'>
                <div className='movies_page_nav bg-primary text-white'>
                    <div className='flex items-center gap-6 pl-9 pt-2 pb-[20px] md:pb-[17px]'>
                        <div className='flex items-center gap-4 md:gap-5'>
                            <span className='mr-2'><svg class="fbl-icon _3UMk3x _1a_Ljt" className='w-4 md:w-[17px] text-azongray' viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Home</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.648 2.070 C 11.552 2.110,9.467 3.704,6.858 5.734 C 2.942 8.780,2.223 9.355,2.130 9.514 L 2.020 9.700 2.009 15.414 C 2.002 19.278,2.012 21.177,2.041 21.282 C 2.102 21.509,2.313 21.761,2.539 21.878 L 2.738 21.980 5.936 21.991 C 9.548 22.003,9.387 22.015,9.700 21.702 C 10.002 21.400,10.000 21.420,10.000 19.073 L 10.000 17.000 11.999 17.000 L 13.997 17.000 14.009 19.150 L 14.020 21.300 14.131 21.489 C 14.192 21.592,14.301 21.723,14.374 21.778 C 14.672 22.006,14.578 22.000,17.998 22.000 C 21.546 22.000,21.389 22.013,21.702 21.700 C 22.024 21.378,22.002 21.848,21.991 15.418 L 21.980 9.700 21.870 9.514 C 21.778 9.356,21.059 8.781,17.170 5.755 C 14.646 3.790,12.509 2.147,12.422 2.103 C 12.209 1.996,11.866 1.981,11.648 2.070 M16.020 7.395 L 20.000 10.491 20.000 15.245 L 20.000 20.000 18.000 20.000 L 16.000 20.000 16.000 17.500 L 16.000 15.000 12.000 15.000 L 8.000 15.000 8.000 17.500 L 8.000 20.000 6.000 20.000 L 4.000 20.000 4.000 15.246 L 4.000 10.491 7.990 7.386 C 10.184 5.679,11.993 4.286,12.010 4.291 C 12.026 4.296,13.831 5.693,16.020 7.395 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                            <a href='#' className='text-[15px] md:text-[16px] tracking-wider font-bold text-azongray'>Movies</a>
                        </div>
                        <div className='font-bold text-azongray'>
                            <a href="#" className='text-[15px] md:text-[16px] tracking-wider'>TV shows</a>
                        </div>
                    </div>
                </div>
                <div className='movies_heading pl-6 md:pl-8 pb-3 bg-primary text-azonwhite font-bold'>
                    <h1 className='text-[24px] md:text-[27px] xl:pl-[22px] xl:pt-[11px] lg:tracking-[2.4px] xl:text-[34px] lg:text-[32px] tracking-wider'>Rent</h1>
                </div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {punjabi && punjabi.map((details) => (
                        <SwiperSlide className='relative' key={details.imdbID}>
                            <div className='movie_main_content bottom-0 left-0 flex gap-2 text-white font-bold absolute'>
                                <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                <p>Watch Free Trial</p>
                            </div>
                            <img src={details.Poster} className='rounded-2xl max-h-92' />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
            {/* <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Add</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.664 2.063 C 11.436 2.146,11.257 2.297,11.131 2.511 L 11.020 2.700 11.009 6.850 L 10.999 11.000 6.924 11.000 C 2.491 11.000,2.677 10.991,2.374 11.222 C 2.301 11.277,2.192 11.408,2.131 11.511 C 2.036 11.672,2.020 11.744,2.020 12.000 C 2.020 12.256,2.036 12.328,2.131 12.489 C 2.192 12.592,2.301 12.723,2.374 12.778 C 2.677 13.009,2.491 13.000,6.925 13.000 L 11.000 13.000 11.000 17.070 C 11.000 19.750,11.015 21.191,11.042 21.289 C 11.103 21.509,11.315 21.762,11.531 21.874 C 11.932 22.080,12.390 22.012,12.700 21.702 C 13.018 21.385,13.000 21.656,13.000 17.073 L 13.000 13.000 17.073 13.000 C 21.654 13.000,21.385 13.017,21.701 12.701 C 22.092 12.310,22.092 11.690,21.701 11.299 C 21.385 10.983,21.654 11.000,17.073 11.000 L 13.000 11.000 13.000 6.927 C 13.000 2.346,13.017 2.615,12.701 2.299 C 12.429 2.027,12.018 1.933,11.664 2.063 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>   
            <svg class="fbl-icon _3UMk3x _1a_Ljt NbhXwl" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Store Filled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.503 2.041 C 8.483 2.217,7.556 2.976,7.202 3.925 C 7.027 4.393,7.001 4.639,7.001 5.849 L 7.000 6.998 4.869 7.009 L 2.738 7.020 2.539 7.122 C 2.312 7.239,2.102 7.491,2.040 7.720 C 2.011 7.828,2.002 9.427,2.011 12.809 C 2.024 17.275,2.031 17.766,2.092 18.013 C 2.358 19.085,2.821 19.909,3.550 20.605 C 4.122 21.152,4.727 21.515,5.465 21.754 C 6.194 21.990,5.896 21.980,12.000 21.980 C 18.104 21.980,17.806 21.990,18.535 21.754 C 20.034 21.268,21.241 20.077,21.737 18.593 C 21.990 17.837,21.974 18.211,21.989 12.804 C 22.004 7.245,22.024 7.622,21.702 7.300 C 21.400 6.998,21.420 7.000,19.073 7.000 L 17.000 7.000 17.000 5.858 C 17.000 4.609,16.970 4.349,16.766 3.849 C 16.499 3.193,15.964 2.633,15.296 2.312 C 14.674 2.013,14.813 2.026,12.120 2.016 C 10.789 2.011,9.611 2.023,9.503 2.041 M14.340 4.066 C 14.593 4.153,14.847 4.407,14.934 4.660 C 14.989 4.822,15.000 5.033,15.000 5.927 L 15.000 7.000 16.000 7.000 L 17.000 7.000 17.000 9.573 C 17.000 12.477,17.008 12.394,16.701 12.701 C 16.521 12.881,16.242 13.000,16.000 13.000 C 15.758 13.000,15.479 12.881,15.299 12.701 C 14.992 12.394,15.000 12.477,15.000 9.573 L 15.000 7.000 12.000 7.000 L 9.000 7.000 9.000 9.573 C 9.000 12.477,9.008 12.394,8.701 12.701 C 8.310 13.092,7.690 13.092,7.299 12.701 C 6.992 12.394,7.000 12.477,7.000 9.573 L 7.000 7.000 8.000 7.000 L 9.000 7.000 9.000 5.927 C 9.000 4.691,9.021 4.577,9.300 4.298 C 9.596 4.002,9.550 4.007,11.983 4.003 C 13.897 4.000,14.168 4.008,14.340 4.066 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg> */}
        </>
    );
}
