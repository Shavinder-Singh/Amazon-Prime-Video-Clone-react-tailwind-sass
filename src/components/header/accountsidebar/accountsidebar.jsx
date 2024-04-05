import React from 'react'
import { Link } from 'react-router-dom'
import './accountsidebar.scss'
import { useState } from 'react'

const accountsidebar = ({ closeSidebar }) => {

    return (
        <div>
            <div className='header_account_sidebar z-50 '>
                <div className='sidebar_wrapper text-white'>
                    <ul className='pt-3 pl-6 flex flex-col gap-[27px]  font-extralight  text-[14px] tracking-wide'>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="/signinpage" onClick={closeSidebar}>Try For Free</Link>
                        </li>
                        <li className='text-azongray flex flex-col items-start EN_sidebar_content EN_item'>
                            <div className='flex items-center justify-start gap-[6px]'>
                                <Link to="/movies" className='mr-[-8px]' >EN</Link>
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
                                <li className='p-3 pt-[13px] pl-[26px]'><a href="#" onClick={closeSidebar}>Bahasa Indonesia</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Bahasa Melayu</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Dansk</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Deutsch</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>English</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Espanol</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Francais</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Italiano</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Magyar</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Nederlands</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Norsk</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Polaski</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Portugues (Brasil) </a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Portugues (Portugal)</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Romana</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Suomi</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Svenska</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Turkce</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Wikang Filipino</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Cestina</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Ελληνικά</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>Русский</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>עברית</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>العربية</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>हिन्दी</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>தமிழ்</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>తెలుగు</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>ไทย</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>日本語</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>简体中文</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>繁體中文</a></li>
                                <li className='p-3 pl-[26px]'><a href="#" onClick={closeSidebar}>한국어</a></li>
                            </ul>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="/signinpage" onClick={closeSidebar}>Sign In</Link>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="/signinpage" onClick={closeSidebar}>Help</Link>
                        </li>
                        <li className='text-azongray flex items-center justify-start'>
                            <Link to="/signinpage" onClick={closeSidebar}>Watch Anywhere</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div >

    )
}

export default accountsidebar
