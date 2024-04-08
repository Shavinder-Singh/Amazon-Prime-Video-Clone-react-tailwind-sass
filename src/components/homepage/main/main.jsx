import React from 'react'
import './Main.scss'

const main = () => {
    return (
        <div>
            <section className='home_main_section '>
                <div className='home_main_media'>
                    <div></div>
                </div>
                <div className='home_main_content bg-black text-azonwhite h-[90vh] px-[14px] md:px-[30px] lg:px-[30px] xl:px-[20px] pb-20'>
                    <h1 className='text-[44px] leading-[3.1rem] '>Welcome to Prime Video</h1>
                    <p className='text-[21px] mb-3 mt-6 lg:mt-5 leading-6 md:text-[22px] lg:-tracking-tighter'>Watch the latest movies, TV shows, and award-winning Amazon Originals</p>
                    <a href="#" className='text-[16px] font-bold lg:text-[16px] py-[12.5px] px-[20px] lg:pt-3 rounded-[4px] bg-azonblue w-full block  tracking-tighter'>Sign in to join Prime</a>
                </div>
            </section>
        </div>
    )
}

export default main
