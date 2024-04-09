import React from 'react'
import logo from '../../assets/image/signInPrimeLogoimage.png'
import { Link } from 'react-router-dom'
import CountryCode from '../../components/signinpage/CountryCodedata'
import { useState } from 'react'
import '../../components/signinpage/signuppagee.scss'
import Footer from '../../components/footer/footer'
const SignupPage = () => {
    // phone numbers
    const defualtitem = { name: 'India', code: '+91' };

    const [selectedItem, setSelectedItem] = useState(defualtitem);

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


    const [currentbutton, setcurrentbutton] = useState(false);
    const [inputtype, setinputtype] = useState(true);

    // form box
    const [emaileerror, setemailerror] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        mobilenumber: "",
    })
    const changeinput = () => {
        setcurrentbutton(!currentbutton);
        setinputtype(!inputtype);

        setformData((prevData) => ({
            ...prevData,
            email: "",
            mobilenumber: "",
        }));
        setemailerror(false);
        setMobileError(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let hasError = false;


        const namePattern = /^[A-Za-z][^\d]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+s?$/;
        const passwordPattern = /^[A-Za-z0-9]{8}$/;
        const mobilePattern = /^[0-9]{10}$/;
        // if use your mobile number button clicked
        if (inputtype) {
            if (!mobilePattern.test(formData.mobilenumber)) {
                alert("hey wrong number")
                setMobileError(true);
                hasError = true;

            }
        }
        else {
            // Email input type
            if (!emailPattern.test(formData.email)) {
                alert("hey wrong email")
                setemailerror(true);
                hasError = true;
            }
        }

        if (!namePattern.test(formData.name)) {
            alert("hey wrong name")
            hasError = true;

        }

        if (!passwordPattern.test(formData.password)) {
            alert("hey wrong Password")
            hasError = true;

        }
        if (hasError) {
            return;
        }
        setformData({
            name: "",
            email: "",
            password: "",
            mobilenumber: "",
        });
        setemailerror(false);
        setMobileError(false);
        console.log(formData);
        alert("form submit successfully")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <div className=' signup_form_mobile_big_page border-2 '>
            <div className='signup_form_mobile_big px-[17px] mt-[2px] flex flex-col gap-[12px] '>
                <div className='signinpage_logo flex justify-center mt-[10px] mb-[6px]'>
                    <img src={logo} />
                </div>
                <div className='signup_form_big_screen rounded-md pt-[9px] pr-[26px] pl-[14px] flex flex-col gap-[8px] lg:max-w-[28%] border lg:mx-[auto]'>
                    <h1 className='text-[28px]'>Create Account</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-[3px]'>
                            <span className='text-[13px] font-bold pl-1 tracking-wide'>Your name</span>
                            <div className='blue_input w-full rounded-[4px] border text-[14px]'>
                                <input type="text" placeholder='' name="name" onChange={handleChange} value={formData.name} className='pl-1 pr-2 pt-[6px] pb-[3px]' />
                            </div>
                        </div>
                        <div className='w-full'>
                            <span className='text-[13px] pl-1  font-bold'>Mobile number</span>
                            {inputtype ? (
                                <div className='w-full'>
                                    <div className='flex items-center justify-between gap-3'>
                                        <div className='flex items-center border gap-3 px-3 py-1 rounded-md w-[120px]  mt-[-2px]'>
                                            <div>
                                                <span className='choose_number text-[14px] text-nowrap' onClick={() => openBoxEvent()}><span>{selectedItem.name}{selectedItem.code}</span></span>
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
                                        <div className='max-w-[142px]  md:max-w-[179px] px-2 pt-1 pb-[4px] rounded-[4px] border'>
                                            <input type='telephone' placeholder='Mobile number' name='mobilenumber' onChange={handleChange} value={formData.mobilenumber} />
                                        </div>
                                    </div>
                                </div>
                            ) : <div className='w-full px-2 pt-3 pb-2 rounded-[4px] border'>
                                <input type="email" placeholder='Enter your email' name="email" onChange={handleChange} value={formData.email} />
                            </div>}
                            <span className='font-thin text-[12px] text-[#0066c0]' onClick={() => changeinput()}>{currentbutton ? "Use Your mobile instead" : "Use your email Instead"}</span>
                        </div>
                        <div>
                            <span className='text-[12px] font-bold tracking-wide pl-1'>Password</span>
                            <div className='w-full px-2 pt-1 pb-1 rounded-[4px] border'>
                                <input type="password" placeholder='At least 6 Characters' name='password' onChange={handleChange} value={formData.password} />
                            </div>
                        </div>
                        <div className='mt-[-8px] flex flex-col gap-4'>
                            <div className='flex items-center gap-2'>
                                <span className='mt-4'>
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
                                <span className='text-[12px] mt-4'>Passwords must be at least 6 characters.</span></div>
                            <div>
                                <p className='leading-5 max-w-[300px] text-[13px] font-thin'>To verify your number, we will send you a text message with a temporary code. Message and data rates may apply.</p>
                            </div>
                            <div className='signin_continue_btn w-full flex mt-[5px]'>
                                <button className='border px-2 pt-[5px] pb-[4px] mb-4 w-full bg-yellowcolor text-center rounded-lg text-[13px]'>Continue</button>
                            </div>
                            <div className='signin_terms_conditions mt-[-12px] pt-8'>
                                <p className='text-[14px] leading-4 block mb-4 max-w-[365px]'>Already have an account?<span className='pl-1 text-[#0066c0]'>Sign in</span></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignupPage
