import React from 'react'
import './footer.scss'
import logo from '../../assets/image/footerlogo.png'
const footer = () => {
    return (
        <div>
            <footer className='text-center pt-6 h-[170px] px-[2px] md:h-[136px]'>
                <div className='footer_logo flex justify-center'>
                    <img src={logo} alt="footer" className='w-[110px]' />
                </div>
                <div className='append_lines'>
                    <div className='footer_links text-[#0f79af] mt-1 mb-[13px] text-[15px] lg:text-[14px] gap-3 md:gap-5'>
                        <p className='text-[15px]'>Terms and Privacy Notice</p>
                        <p className='text-[15px]'>Send us feedback</p>
                        <p className='text-[15px]'>Help</p>
                    </div>
                    <div className='copyright text-azongray text-sm text-[13px] lg:text-[13px]'>
                        <span className='text-[15px]'>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default footer
