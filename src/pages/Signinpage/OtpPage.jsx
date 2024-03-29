import React from 'react'
import logo from '../../assets/image/signInPrimeLogoimage.png'
import { Link } from 'react-router-dom'

const OtpPage = () => {
    return (
        <div>
            <div className='signup_form_mobile px-[17px] mt-[2px] flex flex-col gap-[12px] '>
                <div className='signinpage_logo flex justify-center mt-3 mb-[6px]'>
                    <img src={logo} />
                </div>
                <div className='signup_form_big_screen rounded-md pt-[9px] pr-[14px] pl-[14px] flex flex-col gap-[8px] lg:w-[60%]'>
                    <h1 className='text-[20px] lg:text-[26px] font-bold'>Verify email address</h1>
                    <span className='leading-5 text-[16px] lg:text-[17px] lg:leading-6'>To verify email,we've sent a One Time Password (OTP) to example.gmail.com<span className='text-blue-900'> (Change)</span></span>
                    <div>
                        <span className='text-[13px] font-bold tracking-wide '>Enter OTP</span>
                        <div className='w-full px-10 pt-1 pb-1 rounded-[4px] border'>
                            <input type="password" className='outline-none' />
                        </div>
                    </div>
                    <div className='mt-[-8px] flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                        </div>
                        <div className='signin_continue_btn w-full flex mt-[5px]'>
                            <Link to="Otppage" className='border px-2 pt-[5px] pb-[4px] mb-4 w-full bg-yellowcolor text-center rounded-lg text-[13px]'>Verify</Link>
                        </div>
                        <div className='signin_terms_conditions mt-[-12px] pb-[3px]'>
                            <p className='text-[13px] leading-4 block mb-4 max-w-[365px]'><span>Resend OTP</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpPage
