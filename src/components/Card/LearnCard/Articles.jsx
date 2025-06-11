import React from "react"
import { nanoid } from "nanoid"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"

import "swiper/css"
import "swiper/css/navigation"

export default function Articles({articles, handleClick}) {
    const breakpoints = {
        320: {  
            slidesPerView: 'auto',
            slidesPerGroup: 1,
        },
        560: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
        1280: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
    }
    
    return (
        <div className="h-56 w-[90%] mx-auto my-20 flex flex-col justify-center items-center bg-transparent backdrop-filter backdrop-blur-[10px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-xl">
            <h1 className="uppercase self-start ml-1 md:ml-5 mb-1 font-bold md:text-xl">Our Articles!!</h1>
            
            <Swiper 
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                breakpoints={breakpoints}
                className="w-[98%] rounded-xl grid self-center"
            >
                {
                    articles &&
                    articles.map(item => (
                        <SwiperSlide 
                            key={nanoid()} 
                            className="flex justify-center items-center"
                        >
                            <img 
                                src={item.image} 
                                className="cursor-pointer inline-block aspect-video h-44 object-fill object-center rounded-xl" 
                                onClick={() => handleClick(item.id)}
                                alt="tcet shastra youtube video"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>   
        </div>
    )
} 