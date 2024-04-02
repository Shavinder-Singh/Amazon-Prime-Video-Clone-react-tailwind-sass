import React from 'react'
import { Link } from 'react-router-dom'
import './accountsidebar.scss'

const accountsidebar = () => {
    return (
        <div>
            <div className='header_account_sidebar z-50 '>
                <div className='sidebar_wrapper text-white'>
                    <ul className='pt-3 pl-6 flex flex-col gap-[27px]  font-extralight  text-[14px] tracking-wide'>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="/">Try For Free</Link>
                        </li>
                        <li className='text-azongray flex flex-col items-start EN_sidebar_content'>
                            <div className='flex items-center justify-start gap-[6px]'>
                                <Link to="/movies" className='mr-[-8px]'>EN</Link>
                                <div className='menu_bar_arrow w-5 h-6'>
                                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className='w-full'
                                        viewBox="0 0 64.000000 64.000000"
                                        preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                                            fill="white" stroke="none" >
                                            <path d="M160 397 c0 -7 36 -48 80 -92 l80 -80 80 80 c71 71 95 105 73 105 -4
0 -40 -33 -80 -72 l-73 -72 -73 72 c-73 73 -87 82 -87 59z" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <ul className='EN_dropdown_sidebar flex flex-col items-start bg-inputbgcolor mt-[13px] gap-[3px]  text-azongray  w-[100vw] ml-[-24px] z-10 '>
                                <li className='p-3 pt-[13px] pl-[26px]'><a href="#">Bahasa Indonesia</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Bahasa Melayu</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Dansk</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Deutsch</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">English</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Espanol</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Francais</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Italiano</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Magyar</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Nederlands</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Norsk</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Polaski</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Portugues (Brasil) </a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Portugues (Portugal)</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Romana</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Suomi</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Svenska</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Turkce</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Wikang Filipino</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Cestina</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Ελληνικά</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">Русский</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">עברית</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">العربية</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">हिन्दी</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">தமிழ்</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">తెలుగు</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">ไทย</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">日本語</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">简体中文</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">繁體中文</a></li>
                                <li className='p-3 pl-[26px]'><a href="#">한국어</a></li>
                            </ul>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="Tvshows">Sign In</Link>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="Tvshows">Help</Link>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="Tvshows">Watch Anywhere</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div >

    )
}

export default accountsidebar
