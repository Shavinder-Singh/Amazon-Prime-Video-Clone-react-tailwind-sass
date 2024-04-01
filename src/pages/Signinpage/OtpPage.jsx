import React, { useState } from 'react'
import { useEffect } from 'react'
import logo from '../../assets/image/signInPrimeLogoimage.png'
import { Link } from 'react-router-dom'

const OtpPage = () => {
    const [otpinput, setOTPInput] = useState('');
    const [userEmail, setuserEmail] = useState('');

    const generateOTP = () => {
        return Math.floor(Math.random() * 1000000);
    };
    const sendOTP = (email, otp) => {
        alert(`OTP sent to ${email}: ${otp}`)
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        const enteredOTP = otpinput;
        const otp = generateOTP();
        sendOTP(userEmail, otp);
        if (enteredOTP === otp.toString()) {
            alert("OTP Verified Succesfully")
        }
        else {
            alert('Invalid OTP')
        }
    }

    useEffect(() => {
        try {
            const storedData = localStorage.getItem('key'); // Get the stored data
            if (storedData) {
                const parsedData = JSON.parse(storedData); // Parse the JSON data
                const loginEmail = parsedData.loginemail; // Get the login email from parsed data
                alert("Login Email retrieved from localStorage: " + loginEmail);
                setuserEmail(loginEmail)
            } else {
                console.log("No data found in localStorage for 'key'.");
                alert("No data found in localStorage for 'key'.");
            }
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            alert("Error accessing localStorage: " + error.message);
        }
    }, []);

    return (
        <div>
            <div className='signup_form_mobile px-[17px] mt-[2px] flex flex-col gap-[12px] lg:max-w-[60%] lg:mx-auto'>
                <div className='signinpage_logo flex justify-center mt-3 mb-[6px]'>
                    <img src={logo} />
                </div>
                <div className='signup_form_big_screen rounded-md pt-[9px] pr-[14px] pl-[14px] flex flex-col gap-[8px] lg:w-[60%]'>
                    <h1 className='text-[20px] lg:text-[26px] font-bold'>Verify email address</h1>
                    <span className='leading-5 text-[16px] lg:text-[17px] lg:leading-6'>To verify email,we've sent a One Time Password (OTP) to example.gmail.com<span className='text-blue-900'> (Change)</span></span>
                    <form onSubmit={verifyOTP}>
                        <div>
                            <span className='text-[13px] font-bold tracking-wide '>Enter OTP</span>
                            <div className='w-full px-10 pt-1 pb-1 rounded-[4px] border'>
                                <input type="password" className='outline-none' value={otpinput} onChange={(e) => setOTPInput(e.target.value)} />
                            </div>
                        </div>
                        <div className='mt-[-8px] flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                            </div>
                            <div className='signin_continue_btn w-full flex mt-[5px]'>
                                <input type='submit' className='border px-2 pt-[5px] pb-[4px] mb-4 w-full bg-yellowcolor text-center rounded-lg text-[13px]' value="Verify"></input>
                            </div>
                            <div className='signin_terms_conditions mt-[-12px] pb-[3px]'>
                                <p className='text-[13px] leading-4 block mb-4 max-w-[365px]'><span>Resend OTP</span></p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OtpPage
