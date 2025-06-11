import React from "react"
import { nanoid } from "nanoid"
import { Swiper, SwiperSlide } from "swiper/react"
import { Grid, Navigation,Pagination } from "swiper"


import "swiper/css"
import "swiper/css/grid"

export default function TipsTrick({tips, handleClick}) {
    const breakpoints = {
        320: {
            slidesPerView: 'auto',
            slidesPerGroup: 3,
        },
        560: {
            slidesPerView: 2,
            slidesPerGroup: 3,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
    }
    
    return (
        // <div className=" h-[70%] w-[70%] py-2.5 mx-auto bg-transparent backdrop-filter backdrop-blur-[10px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-xl">  
        <div style={styles} >          
            <Swiper 
                slidesPerView={1}
                grid={{
                rows: 2,
                }}
                spaceBetween={20}
                navigation={true}
                modules={[Grid, Navigation,Pagination]}
                breakpoints={breakpoints}
                className="w-[98%] h-[100%] flex flex-row rounded-xl self-center"
            >
                {
                    tips &&
                    tips.map(item => (
                        <SwiperSlide 
                            key={nanoid()} 
                            className="h-max flex  justify-center items-center" 
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
const styles = {
    height: '500px',
    width: '70%',
    padding: '50px',
    margin: '0 auto',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    borderRadius: '0.75rem',
    flexDirection: "row",
    display: "flex"
    
};
