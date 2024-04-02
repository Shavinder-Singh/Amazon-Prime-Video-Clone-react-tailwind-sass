import React, { useState } from 'react'
import { useEffect } from 'react'
import logo from '../../assets/image/signInPrimeLogoimage.png'
import { Link } from 'react-router-dom'

const OtpPage = () => {
    const [enteredOTP, setenteredOTP] = useState("");
    const [OTP, sentOTP] = useState("");
    const [verificationOTP, setVerificationOTP] = useState("");


    const generateOTP = () => {
        return Math.floor(Math.random() * 1000000);
    };

    useEffect(() => {
        const storedItem = localStorage.getItem("key");
        if (storedItem) {
            generateandSendOTP();
        }
        else {
            console.log("there is no stored item");
        }
    }, []);

    const handleinputChange = (e) => {
        setenteredOTP(e.target.value);
    }

    const generateandSendOTP = () => {
        const newOTP = generateOTP();
        sentOTP(newOTP);
        alert(`Your OTP is : ${newOTP}`)
    }

    const handleSubmit = () => {
        if (enteredOTP == OTP) {
            setVerificationOTP('OTP Verified');
        }
        else {
            setVerificationOTP("OTP not Verified");
        }
        setenteredOTP('');

    };

    const handleResendOTP = () => {
        generateandSendOTP();
        setVerificationOTP("");
        setenteredOTP('');
    }

    return (
        <div>
            <h2>{verificationOTP}</h2>
            <div className='signup_form_mobile px-[17px] mt-[2px] flex flex-col gap-[12px] lg:max-w-[60%] lg:mx-auto'>
                <div className='signinpage_logo flex justify-center mt-3 mb-[6px]'>
                    <img src={logo} />
                </div>
                <div className='signup_form_big_screen rounded-md pt-[9px] pr-[14px] pl-[14px] flex flex-col gap-[8px] lg:w-[60%]'>
                    <h1 className='text-[20px] lg:text-[26px] font-bold'>Verify email address</h1>
                    <span className='leading-5 text-[16px] lg:text-[17px] lg:leading-6'>To verify email,we've sent a One Time Password (OTP) to example.gmail.com<span className='text-blue-900'> (Change)</span></span>
                    <div>
                        <span className='text-[13px] font-bold tracking-wide '>Enter OTP</span>
                        <div className='w-full px-10 pt-1 pb-1 rounded-[4px] border'>
                            <input type="text" className='outline-none' value={enteredOTP} onChange={handleinputChange} />
                        </div>
                    </div>
                    <div className='mt-[-8px] flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                        </div>
                        <div className='signin_continue_btn w-full flex mt-[5px]'>
                            <input type='submit' className='border px-2 pt-[5px] pb-[4px] mb-4 w-full bg-yellowcolor text-center rounded-lg text-[13px]' value="Verify" onClick={handleSubmit}></input>
                        </div>
                        <div className='signin_terms_conditions mt-[-12px] pb-[3px]'>
                            <p className='text-[13px] leading-4 block mb-4 max-w-[365px]'><span onClick={handleResendOTP}>Resend OTP</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpPage
