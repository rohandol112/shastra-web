import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"

import Carousel from "../components/home/Carousel"
import Landing from "../components/home/Landing"
import Vision from "../components/home/Vision"
import CorePeeps from "../components/home/CorePeeps"
import FAQ from "../components/home/FAQ"

import CarouselImg1 from "../assets/home/carousel1.png"
import CarouselImg2 from "../assets/home/carousel2.png"
import CarouselImg3 from "../assets/home/Frame 45.png"
import CarouselImg4 from "../assets/home/carousel4.png"

export default function Home() {
    const [carouselImg, setCarouselImg] = useState(null)

    useEffect(() => {
        setCarouselImg([CarouselImg1, CarouselImg2, CarouselImg3, CarouselImg4])
    }, [])

    return (
        <div className="relative min-h-full">
            <div className="relative -z-10 bg-gradient-to-r from-[#000778] from-[40%] via-slate-500 via-30% to-[#FF9201] to-60%">
                <Landing 
                    key={nanoid()}
                />
            </div>

            <Carousel 
                slides={carouselImg}
            />

            <div className="relative z-10 h-max w-full flex flex-col justify-center space-y-5">
                <Vision />
                <CorePeeps />
            </div>

            <FAQ />
        </div>
    )
}