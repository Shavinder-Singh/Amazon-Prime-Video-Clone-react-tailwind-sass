import React from 'react'
import { Link } from 'react-router-dom'
import './overviewrental.scss'

const overviewrental = () => {
    return (
        <div>
            <section className='overviewrental_section'>
                <div className='overviewrental_media '>
                    <div></div>
                </div>
                <div className='overviewrental_content bg-black text-azonwhite h-[80vh] px-[10px] md:px-[20px] pt-4'>
                    <div>
                        <h1 className='text-[40px] leading-[2.8rem] '>Movie rentals on Prime Video</h1>
                        <p className='text-[18px] mb-[47px]  mt-[23px] leading-6 md:text-[25px] lg:-tracking-tighter lg:text-[23px]'>Early Access to new movies, before digital subscription</p>
                        <div className='overviewrentallink w-full'><Link to="/Rent" className='text-[15px] py-[12px] px-[20px] rounded-[4px] bg-azonblue w-full block font-bold tracking-tighter max-w-72 xl:tracking-wide xl:font-bold'>Rent now</Link></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default overviewrental
