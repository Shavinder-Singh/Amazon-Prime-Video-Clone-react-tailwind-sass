import React, { useState } from 'react'
import logo from '../../assets/image/signInPrimeLogoimage.png'
import { Link } from 'react-router-dom'
import Footer from '../footer/footer'
import './signuppagee.scss'
import CountryCode from './CountryCodedata'
const signuppage = () => {
    const defualtitem = { name: 'India', code: '+91' };
    const [selectedItem, setSelectedItem] = useState(defualtitem);
    // accordian
    const [activeindex, setactiveindex] = useState(1);
    const handleClick = (index) => {
        setactiveindex(index === activeindex ? null : index)
    }
    // change form button
    const [currentbutton, setcurrentbutton] = useState(true);
    const [inputtype, setinputtype] = useState(false);
    // 
    const openBoxEvent = () => {
        var numberContainer = document.querySelector(".telephonenum_list_wrapper");
        numberContainer.style.display = "block";
    }
    const closeboxevent = () => {
        var numberContainer = document.querySelector(".telephonenum_list_wrapper");
        numberContainer.style.display = "none";
    }
    const phonedata = (item) => {
        const shortenedName = `${item.name.substring(0, 3).toLowerCase()} `;
        setSelectedItem({ name: shortenedName, code: item.code });
    }
    const changeinput = () => {
        setcurrentbutton(!currentbutton);
        setinputtype(!inputtype);
    }
    return (
        <>
            <div className='signinpage '>
                <div className='lg:hidden mb-10'>
                    <div className='signinpage_logo flex justify-center'>
                        <img src={logo} />
                    </div>
                    <div className='flex justify-center items-center border-none'>
                        <div className='signinmain pt-[10px] px-[0.9rem]'>
                            <h6 className='text-[21px] font-thin tracking-wide pb-2'>Welcome</h6>
                            <div className='signin_form_container border rounded-t-md w-[354px]'>
                                <div className='createaccount_mobile flex flex-col items-start pt-[10px] pb-[6px] px-[18px]  ' >
                                    <div className='flex items-center gap-4'>
                                        <input type='radio' className={`w-[22px] h-6  ${activeindex === 0 ? "active" : ''}`} onClick={() => handleClick(0)} checked={activeindex === 0} />
                                        <span className='font-bold text-[15px] '>Create account
                                            <span className='text-[13px] font-thin ml-1'>New to Amazon?</span>
                                        </span>
                                    </div>
                                    {activeindex === 0 && (
                                        <div className='signup_form_mobile mt-[8px] flex flex-col gap-[12px]'>
                                            <div className='w-full px-2 pt-3 pb-2 rounded-[4px] border'>
                                                <input type="text" placeholder='First and last name' />
                                            </div>
                                            {inputtype ? (
                                                <div className='w-full'>
                                                    <div className='flex items-center justify-between gap-3'>
                                                        <div className='flex items-center border gap-3 px-3 py-2 rounded-md w-[120px]'>
                                                            <div>
                                                                <span className='choose_number text-[15px] text-nowrap' onClick={() => openBoxEvent()}><span>{selectedItem.name}{selectedItem.code}</span></span>
                                                                <div className='telephonenum_list_wrapper fixed border-2 border-emerald-500 w-full h-full top-0 left-0 hidden'>
                                                                    <div className='telephonenum_list_wrapper_container absolute w-[63%] h-[380px] rounded-md overflow-scroll bg-white'>
                                                                        <div className='border w-full py-3 flex items-center justify-between sticky top-0 bg-gray-100'>
                                                                            <span className='pl-2 font-bold'>Country/Region Code</span>
                                                                            <span className='pr-6 w-2' onClick={() => closeboxevent()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="17px" height="17px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg></span>
                                                                        </div>
                                                                        <div className='telephonenum_list list-none text-[15px]'>
                                                                            {CountryCode && CountryCode.map((data, index) =>
                                                                                <li className='border px-3 py-3 hover:bg-gray-100' onClick={() => phonedata(data)} key={index}>{data.name} {data.code} </li>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span>
                                                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                                    width="10" height="10" viewBox="0 0 16.000000 16.000000"
                                                                    preserveAspectRatio="xMidYMid meet">
                                                                    <metadata>
                                                                        Created by potrace 1.10, written by Peter Selinger 2001-2011
                                                                    </metadata>
                                                                    <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)"
                                                                        fill="#000000" stroke="none">
                                                                        <path d="M52 127 l-22 -32 25 -3 c14 -2 36 -2 50 0 l25 3 -22 32 c-13 18 -25 33 -28 33 -3 0 -15 -15 -28 -33z" />
                                                                        <path d="M39 53 c6 -10 17 -27 26 -37 15 -20 15 -20 30 0 40 51 40 54 -15 54 -46 0 -50 -2 -41 -17z" />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <div className='max-w-[179px] px-2 pt-3 pb-[12px] rounded-[4px] border'>
                                                            <input type='telephone' placeholder='Mobile number' />
                                                        </div>
                                                    </div>
                                                </div>
                                            ): <div className='w-full px-2 pt-3 pb-2 rounded-[4px] border'>
                                            <input type="text" placeholder='Enter your email Passsword' />
                                        </div>}

                                           
                                            <div className='signin_continue_btn w-full flex'>
                                                <a href="#" className='border p-3 pb-[11px] w-full  text-center rounded-lg text-[13px]' onClick={() => changeinput()}>{currentbutton ? "Use Your email Instead" : "Use your mobile instead"}</a>
                                            </div>
                                            <div className='w-full px-2 pt-3 pb-2 rounded-[4px] border'>
                                                <input type="text" placeholder='Create a Password' />
                                            </div>
                                            <div className='mt-[-8px] flex flex-col gap-4'>
                                                <div className='flex items-center gap-2'>
                                                    <span>
                                                        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                                            width="13" height="13" viewBox="0 0 416.979 416.979"
                                                            xml:space="preserve">
                                                            <g>
                                                                <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
            c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
            c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
            c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
            c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    <span className='text-[15px]'>Passwords must be at least 6 characters.</span></div>
                                                <div className='flex items-start'>
                                                    <input type='checkbox' />
                                                    <span className='text-[13px]'>Show password</span>
                                                </div>
                                                <div>
                                                    <p className='leading-5 max-w-[300px]'>To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.</p>
                                                </div>
                                                <div className='signin_continue_btn w-full flex mt-[-2px]'>
                                                    <a href="#" className='border p-3 pb-[11px] mb-4 w-full bg-yellowcolor text-center rounded-lg text-[13px]'>Verify mobile number</a>
                                                </div>
                                                <div className='signin_terms_conditions mt-[-12px]'>
                                                    <p className='text-[11px] leading-4 block mb-4 max-w-[365px]'>By creating an account, you agree to the Amazon <span className=' text-blue-400'>Conditions of Use and Privacy Notice</span>.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className='signin_mobile border flex flex-col items-start '>
                                    <div className='flex items-center gap-3 pt-[10px] pb-[11px] px-4'>
                                        <input type='radio' className={`w-[22px] h-6 mr-[4px] ${activeindex === 0 ? "active" : ''}`} onClick={() => handleClick(1)} checked={activeindex === 1} />
                                        <span className='font-bold text-[14px] tracking-wider'>Sign in</span>
                                        <span className='text-[13px] ml-[-8px] font-thin'>Already a customer?</span>
                                    </div>

                                    {activeindex === 1 && (<div className='signinbyuser_form px-[14.5px]'>
                                        <div className='border px-3 pt-3 pb-[8px] mb-[18px]'>
                                            <input type='email' placeholder='Email or phone number' className='text-black outline-none' />
                                        </div>
                                        <div className='signin_continue_btn w-full flex'>
                                            <a href="#" className='border p-3 pb-[11px] mb-4 w-full bg-yellowcolor text-center rounded-lg text-[13px]'>Continue</a>
                                        </div>
                                        <div className='signin_terms_conditions'>
                                            <p className='text-[11px] leading-4 block mb-4'> By continuing, you agree to the Amazon <span className=' text-blue-400'>Conditions of Use and Privacy Notice</span>.</p>
                                            <div className='flex items-center mb-3'>
                                                <span className='mr-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 24 24" id="play"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path></svg>
                                                </span>
                                                <span className='text-[15px]'>Need help?</span>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* bigscreen */}
                <div className='signin_bigscreen justify-center flex flex-col items-center '>
                    <div className='pt-[14px]'>
                        <div className='signinpage_logo flex justify-center'>
                            <img src={logo} />
                        </div>
                        <div className='flex justify-center items-center border-none'>
                            <div className='signinmain pt-[19px]  '>
                                <div className='signin_form_container border-[1px] rounded-lg pt-[15px] pr-[32.5px] pl-[29.5px] '>
                                    <div>
                                        <h1 className='text-[28px] pb-[6px]'>Sign in</h1>
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        <div className='signinbyuser_form'>
                                            <div>
                                                <span className='text-[13px] font-bold pl-[2px] tracking-wide'>Email or mobile phone number</span>
                                                <div className='border px-3 pt-1 pb-[2px] mb-[13px]'>
                                                    <input type='email' className='text-black' />
                                                </div>
                                            </div>
                                            <div className='signin_continue_btn w-full flex'>
                                                <a href="#" className='border p-[6px] pb-[5px] mb-[16.5px] w-full bg-yellowcolor text-center rounded-lg text-[13px]'>Continue</a>
                                            </div>
                                            <div className='signin_terms_conditions'>
                                                <p className='text-[12px] leading-[18px] block mb-[23px] '> By continuing, you agree to the Amazon <span className=' text-blue-400'>Conditions of <br /> Use and Privacy Notice</span>.</p>
                                                <div className='flex items-center mb-5'>
                                                    <span className='mr-1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 24 24" id="play"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"></path></svg>
                                                    </span>
                                                    <span className='text-[13px]'>Need help?</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='new_to_amazon mt-[18px] font-medium mb-[6px]'>
                        <span className='text-[12px]'>New to Amazon?</span>
                    </div>
                    <div className='border ml- w-[350px] pt-[2px] pb-[4px] rounded-lg text-center mb-5'>
                        <button className='text-[13px] tracking-normal'>Create your Amazon account</button>
                    </div>
                </div>
                {/* signupbigscreen */}
                <div className='signup_form_mobile px-[17px] mt-[2px] flex flex-col gap-[12px] hidden    '>
                    <div className='signinpage_logo flex justify-center mt-3 mb-[6px]'>
                        <img src={logo} />
                    </div>
                    <div className='signup_form_big_screen rounded-md pt-[9px] pr-[26px] pl-[14px] flex flex-col gap-[8px]'>
                        <h1 className='text-[28px]'>Create Account</h1>
                        <div className='mb-[2px]'>
                            <span className='text-[13px] font-bold pl-1 tracking-wide'>Your name</span>
                            <div className=' w-full pl-1 pr-2 pt-[6px] pb-[3px] rounded-[4px] border text-[14px]'>
                                <input type="text" placeholder='First and last name' />
                            </div>
                        </div>
                        <div className='w-full'>
                            <span className='text-[13px] pl-1 font-bold'>Mobile number</span>
                            <div className='flex items-center justify-between gap-4 mt-0'>
                                <div className='flex items-center border gap-3 px-3 py-1 rounded-md w-[100px]'>
                                    <div>
                                        <span className='text-[14px] text-nowrap'>Ind +903</span>

                                    </div>
                                    <span>
                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                            width="10" height="10" viewBox="0 0 16.000000 16.000000"
                                            preserveAspectRatio="xMidYMid meet">
                                            <metadata>
                                                Created by potrace 1.10, written by Peter Selinger 2001-2011
                                            </metadata>
                                            <g transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)"
                                                fill="#000000" stroke="none">
                                                <path d="M52 127 l-22 -32 25 -3 c14 -2 36 -2 50 0 l25 3 -22 32 c-13 18 -25 33 -28 33 -3 0 -15 -15 -28 -33z" />
                                                <path d="M39 53 c6 -10 17 -27 26 -37 15 -20 15 -20 30 0 40 51 40 54 -15 54 -46 0 -50 -2 -41 -17z" />
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <div className=' max-w-[179px] px-2 pt-1 pb-[4px] rounded-[4px] border'>
                                    <input type='telephone' placeholder='Mobile number' />
                                </div>
                            </div>
                            <span className='font-thin text-[12px]'>Use your email instead</span>
                        </div>
                        <div>
                            <span className='text-[12px] font-bold tracking-wide pl-1'>Password</span>
                            <div className='w-full px-2 pt-1 pb-1 rounded-[4px] border'>
                                <input type="password" placeholder='At least 6 characters' />
                            </div>
                        </div>
                        <div className='mt-[-8px] flex flex-col gap-4'>
                            <div className='flex items-center gap-2'>
                                <span>
                                    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="13" height="13" viewBox="0 0 416.979 416.979"
                                        xml:space="preserve">
                                        <g>
                                            <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85
            c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786
            c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576
            c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765
            c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"/>
                                        </g>
                                    </svg>
                                </span>
                                <span className='text-[12px] mt-1'>Passwords must be at least 6 characters.</span></div>

                            <div>
                                <p className='leading-5 max-w-[300px] text-[13px] font-thin'>To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.</p>
                            </div>
                            <div className='signin_continue_btn w-full flex mt-[5px]'>
                                <Link to="Otppage" className='border px-2 pt-[5px] pb-[4px] mb-4 w-full bg-yellowcolor text-center rounded-lg text-[13px]'>Continue</Link>
                            </div>
                            <div className='signin_terms_conditions mt-[-12px] pt-8'>
                                <p className='text-[14px] leading-4 block mb-4 max-w-[365px]'>Already have an account?<span className='pl-1'>Sign in</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default signuppage
