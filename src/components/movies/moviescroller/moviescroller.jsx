import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../footer/footer';
import rightarrow from '../../../assets/image/rightarrowicon.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './scroller.css';

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
    const [mystery, setmystries] = useState(null);
    const [romantic, setromantic] = useState(null);
    console.log(romantic)
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=movies&apikey=eae86d55")
            .then(function (response) {
                setmystries(response.data.Search)
            })
            .catch(function (error) {
                console.log("error");
            })
    }, [])
    useEffect(() => {
        axios.get("https://www.omdbapi.com/?s=movies&apikey=eae86d55")
            .then(function (response) {
                setromantic([response.data])
            })
            .catch(function (error) {
                console.log("error");
            })
    }, [])
    return (

        <>
            <div className='movies_scroller bg-black text-white pl-[25px] md:pl-[26px]'>
                <div className='font-bold flex gap-2 md:gap-4 pb-2  md:pb-0 text-[16px] md:text-[18px] tracking-wide'>
                    <div><h1><span className='text-azonblue'>Prime</span> Top movies </h1></div>
                    <div className='font-thin md:font-bold flex items-center gap-2'><span>See more</span><span>
                        <img src={rightarrow} width="13px" />
                    </span></div>
                </div>
                <Swiper
                    onSwiper={setSwiperRef}
                    slidesPerView={4}
                    centeredSlides={false}
                    spaceBetween={39}
                    pagination={{
                        type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiperpagination "
                >
                    {romantic && romantic.map((data, index) => (
                        <SwiperSlide className='swiper_slide relative z-0' key={data.imdbID}><Link to="#" className='w-full h-full'><img src={data.Poster} /></Link>
                            <div className='absolute bottom-[-33px] z-50 right-[-9px] bg-black text-white w-[111%] lg:right-[-13px] xl:right-[-14px] flex flex-col py-1 px-3 rounded-md '>
                                <div className='flex  items-center gap-3'>
                                    <span><svg class="fbl-icon _3UMk3x _1a_Ljt _3H1cN4" viewBox="0 0 24 24" height="18" width="18" role="img" aria-hidden="true"><title>Entitled</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.120 2.039 C 8.641 2.287,6.414 3.362,4.761 5.107 C 1.806 8.228,1.158 12.819,3.137 16.623 C 3.620 17.552,4.164 18.288,4.938 19.061 C 5.930 20.051,7.038 20.789,8.272 21.278 C 11.634 22.610,15.313 22.080,18.200 19.845 C 18.637 19.507,19.507 18.637,19.845 18.200 C 21.256 16.378,22.000 14.236,22.000 12.000 C 22.000 7.432,18.842 3.387,14.430 2.303 C 13.446 2.062,12.028 1.948,11.120 2.039 M17.092 8.191 C 17.410 8.341,17.660 8.592,17.816 8.920 C 17.926 9.151,17.940 9.221,17.940 9.541 C 17.940 9.869,17.928 9.927,17.805 10.181 C 17.679 10.443,17.480 10.651,14.545 13.588 C 11.578 16.558,11.406 16.723,11.140 16.848 C 10.888 16.967,10.824 16.980,10.500 16.980 C 10.176 16.980,10.112 16.967,9.860 16.848 C 9.604 16.726,9.466 16.600,8.193 15.328 C 6.915 14.051,6.794 13.918,6.672 13.660 C 6.554 13.408,6.540 13.344,6.540 13.020 C 6.540 12.700,6.554 12.631,6.664 12.400 C 6.821 12.070,7.070 11.821,7.400 11.664 C 7.631 11.554,7.700 11.540,8.020 11.540 C 8.343 11.540,8.408 11.554,8.654 11.670 C 8.891 11.782,9.036 11.907,9.714 12.578 L 10.500 13.356 13.020 10.843 C 15.629 8.240,15.687 8.188,16.110 8.081 C 16.380 8.013,16.817 8.061,17.092 8.191 " fill="blue" stroke="none" fill-rule="evenodd"></path></svg></svg></span>
                                    <p className='text-[13px] font-bold text-left leading-4'>Watch with a free Prime trial </p>
                                </div>
                                <div>
                                    s
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>




            <div className='text-white'>
                sadasd
            </div>
            <Footer />
        </>
    );
}
