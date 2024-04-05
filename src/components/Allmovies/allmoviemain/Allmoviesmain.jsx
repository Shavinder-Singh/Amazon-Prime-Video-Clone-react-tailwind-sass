import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';

export default function Allmoviesmain() {
    const { genre } = useParams();
    console.log(genre);
    const [punjabi, setpunjabi] = useState();
    console.log(punjabi);
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?s=${genre}&apikey=eae86d55`)
            .then(function (response) {
                setpunjabi(response.data.Search)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [genre])
    return (
        <>
            <div className='movies_section pb-5 bg-primary'>
                <div className='movies_page_nav bg-primary text-white'>
                    <div className='flex items-center gap-6 pl-9 pt-2 pb-[20px] md:pb-[17px]'>
                        <div className='flex items-center gap-4 md:gap-5'>
                            <span className='mr-2'><svg class="fbl-icon _3UMk3x _1a_Ljt" className='w-4 md:w-[17px] text-azongray' viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Home</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.648 2.070 C 11.552 2.110,9.467 3.704,6.858 5.734 C 2.942 8.780,2.223 9.355,2.130 9.514 L 2.020 9.700 2.009 15.414 C 2.002 19.278,2.012 21.177,2.041 21.282 C 2.102 21.509,2.313 21.761,2.539 21.878 L 2.738 21.980 5.936 21.991 C 9.548 22.003,9.387 22.015,9.700 21.702 C 10.002 21.400,10.000 21.420,10.000 19.073 L 10.000 17.000 11.999 17.000 L 13.997 17.000 14.009 19.150 L 14.020 21.300 14.131 21.489 C 14.192 21.592,14.301 21.723,14.374 21.778 C 14.672 22.006,14.578 22.000,17.998 22.000 C 21.546 22.000,21.389 22.013,21.702 21.700 C 22.024 21.378,22.002 21.848,21.991 15.418 L 21.980 9.700 21.870 9.514 C 21.778 9.356,21.059 8.781,17.170 5.755 C 14.646 3.790,12.509 2.147,12.422 2.103 C 12.209 1.996,11.866 1.981,11.648 2.070 M16.020 7.395 L 20.000 10.491 20.000 15.245 L 20.000 20.000 18.000 20.000 L 16.000 20.000 16.000 17.500 L 16.000 15.000 12.000 15.000 L 8.000 15.000 8.000 17.500 L 8.000 20.000 6.000 20.000 L 4.000 20.000 4.000 15.246 L 4.000 10.491 7.990 7.386 C 10.184 5.679,11.993 4.286,12.010 4.291 C 12.026 4.296,13.831 5.693,16.020 7.395 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                            <Link to='/movies' className='text-[15px] md:text-[16px] tracking-wider font-bold text-azongray'>Movies</Link>
                        </div>
                        <div className='font-bold text-azongray'>
                            <Link to="/allmovies/:genre" className='text-[15px] md:text-[16px] tracking-wider' >TV shows</Link>
                        </div>
                    </div>
                </div>
                <div className='movies_heading pl-6 md:pl-8 pb-3 bg-primary text-azonwhite font-bold'>
                    <h1 className='text-[24px] md:text-[27px] xl:pl-[22px] xl:pt-[11px] lg:tracking-[2.4px] xl:text-[34px] lg:text-[32px] tracking-wider'>Movies</h1>
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
        </>
    );
}

