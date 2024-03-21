import React from 'react'
import './platforms.scss';
import platformimages from './platformimages'


const platforms = () => {
    return (
        <div>
            <section className='platforms_section p-[10px] mb-5'>
                <div className='platforms_wrapper text-center xl:px-[46px]'>
                    <div className='platforms_content pr-4 pb-3'>
                        <div>
                            <h1 className='text-[45px] leading-[49px] xl:max-w-[540px] 2xl:max-w-[none]'>Your favorite channels all in one place</h1>
                        </div>
                        <div className='mt-6'>
                            <p className='text-[20.8px] leading-6 xl:tracking-wider xl:max-w-[540px] 2xl:max-w-[none] '>With Prime Video Channels, find shows and movies from your favorite channels all in one place. Enjoy with an add-on subscription to Channels of your choice</p>
                        </div>
                    </div>
                    <div className='platforms_media_wrapper grid grid-cols-2 gap-2 px-3 lg:grid-cols-3 '>
                        {platformimages.map((images, index) =>
                            <img src={images.src} alt={index} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default platforms
