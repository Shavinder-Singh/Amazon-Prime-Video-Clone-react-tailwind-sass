import React from 'react'
import './footer.scss'
import logo from '../../assets/image/footerlogo.png'
const footer = () => {
    return (
        <div>
            <footer className='text-center p-6'>
                <div className='footer_logo flex justify-center'>
                    <img src={logo} alt="footer" />
                </div>
                <div className='footer_links text-azonblue font-bold mt-1 mb-[14px] text-[15px] lg:text-[14px] gap-2 md:gap-9'>
                    <p className=''>Terms and Privacy Notice</p>
                    <p className=''>Send us feedback</p>
                    <p className=''>Help</p>
                </div>
                <div className='copyright text-azongray font-bold text-sm text-[13px] lg:text-[14px]'>
                    <span className='tracking-wider'>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
                </div>
            </footer>
        </div>
    )
}

export default footer
