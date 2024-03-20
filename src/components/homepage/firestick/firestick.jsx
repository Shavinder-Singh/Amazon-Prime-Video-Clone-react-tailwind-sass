import React from 'react'
import './firestick.scss'

const firestick = () => {
    return (
        <div>
        <section className='firestick_section'>
            <div className='firestick_media '>
                <div></div>
            </div>
            <div className='firestick_content bg-black text-azonwhite h-[80vh] px-[10px] md:px-[20px] pt-4 pr-4'>
                <div>
                    <h1 className='text-[40px] leading-[3.1rem]'>Even better with Fire TV Stick</h1>
                    <p className='text-[20px] mb-[48px] mt-5 font-semibold leading-7 md:text-[25px] lg:-tracking-tighter lg:text-[23px] xl:pb-5'>The biggest movies and TV shows are always better on a big screen. Simply plug in your Amazon Fire TV Stick and stream on any HDTV. Press the voice button on the remote and say the name of the title you want to watch to find it in seconds.</p>
                    <div className='firesticklink w-full'><a href="#" className='text-[18px] py-[14px] px-[20px] rounded-[4px] bg-azonblue w-full block font-bold tracking-tighter max-w-72'>Get started</a></div>
                </div>
            </div>
        </section>
    </div>
    )
}

export default firestick
