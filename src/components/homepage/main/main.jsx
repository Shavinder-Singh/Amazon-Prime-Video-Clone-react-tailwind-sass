import React from 'react'
import './Main.scss'


const main = () => {
    return (
        <div>
            <section className='home_main_section '>
                <div className='home_main_media'>
                    <div></div>
                </div>
                <div className='home_main_content bg-black text-azonwhite h-[90vh] px-[14px] md:px-[20px] pb-20'>
                    <h1 className='text-[44px] leading-[3.1rem] '>Welcome to Prime Video</h1>
                    <p className='text-[23px] mb-5 mt-6 leading-7 md:text-[28px] lg:-tracking-tighter'>Watch the latest movies, TV shows, and award-winning Amazon Originals</p>
                    <a href="#" className='text-[18px] py-[14px] px-[20px] rounded-[4px] bg-azonblue w-full block font-bold tracking-tighter'>Sign In to join Prime</a>
                </div>
            </section>
        </div>
    )
}

export default main
