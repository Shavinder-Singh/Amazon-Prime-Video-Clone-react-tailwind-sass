import React from 'react'
import Detailmain from '../components/detailpage/detailmain/detailmain'
import Detail_info from '../components/detailpage/detail_Info/detail_info'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
const detailpage = () => {
    return (
        <div>
            <Header />
            <Detailmain />
            <Detail_info />
        </div>
    )
}

export default detailpage
