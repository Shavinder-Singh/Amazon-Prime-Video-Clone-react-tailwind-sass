import React, { useEffect } from 'react'
import { useState } from 'react';
import './firestick.scss'

const firestick = () => {
    const [feedbackup, setFeedbackUp] = useState(false);
    const [showsdeco, setshowdeco] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setFeedbackUp(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const closeFeedback = () => {
        setFeedbackUp(false);
    };


    const submitfeedback = (e) => {
        e.preventDefault();
        if (formdata.movie_name.trim() === '') {
            alert('Please enter a movie name.');
            return;
        }


        localStorage.setItem('UserData', JSON.stringify(formdata));
        setformdata({ movie_name: '' });
        setTimeout(() => {
            setshowdeco(true)
            setTimeout(() => {
                setshowdeco(false)
            }, 2000);
        }, 1000);
        setTimeout(() => {
            setFeedbackUp(false);
            
        }, 600);

    }
    const [formdata, setformdata] = useState({
        movie_name: " "
    })


    const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata(() => ({
            [name]: value,
        }));
    }
    return (
        <div>
            <section className='firestick_section'>
                <div className='firestick_media '>
                    <div></div>
                </div>
                <div className='firestick_content bg-black text-azonwhite h-[80vh] px-[10px] md:px-[20px] pt-4 pr-4'>
                    <div>
                        <h1 className='text-[40px] leading-[3.1rem]'>Even better with Fire TV Stick</h1>
                        <p className='text-[20px] mb-[48px] mt-5 leading-7 md:text-[25px] lg:-tracking-tighter lg:text-[23px] xl:pb-5'>The biggest movies and TV shows are always better on a big screen. Simply plug in your Amazon Fire TV Stick and stream on any HDTV. Press the voice button on the remote and say the name of the title you want to watch to find it in seconds.</p>
                        <div className='firesticklink w-full'><a href="#" className='text-[18px] py-[9px] px-[20px] rounded-[4px] bg-azonblue w-full block xl:text-[16px] tracking-tighter max-w-72'>Get started</a></div>
                    </div>
                </div>
            </section>
            {feedbackup && (
                <div className='feedback_wrapper fixed bottom-0 h-[100px] w-full text-white z-10  transition-all duration-1000 transform translate-y-0'>
                    <div className='absolute w-full bg-inputbgcolor rounded-t-lg h-full p-3 flex flex-col gap-5 lg:w-[40%]'>
                        <div className='flex items-center justify-between'>
                            <h2>Which Movies do you Like?</h2>
                            <span className='close_icon_feedback'>
                                <svg onClick={() => closeFeedback()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="17px" fill='white' height="17px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path></svg>
                            </span>
                        </div>
                        <div className='flex items-start '>
                            <form onSubmit={submitfeedback} className='flex w-full items-center'>
                                <input type='text' name='movie_name' value={formdata.movie_name} onChange={handlechange} className='feedback_input bg-transparent outline-none border-b w-full' />
                                <span className='feedback_send_button'>
                                    <button type='submit'>  <svg data-name="Layer 21" height="24" id="Layer_21" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><title /><polygon points="3 12 8.61 14.992 17 8 9 17.455 9 21 12.164 16.887 18 20 21 3 3 12" /></svg></button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showsdeco && (<div className='thanks_decorative_button absolute top-0  bg-white z-10 border-2 p-3 max-w-64 text-center text-black font-bold tracking-wider rounded-lg  transition-all duration-1000 transform translate-y-0'>
                <div className='relative w-full'>
                    <div className='absolute top-[-11px] rounded-lg w-full h-1 bg-green-900'></div>
                    <div className='absolute bottom-[-35px] rounded-lg w-full h-1 bg-green-900'></div>
                </div>
                <h1>Thanks For feedback</h1>
            </div>
            )}
        </div>
    )
}

export default firestick
