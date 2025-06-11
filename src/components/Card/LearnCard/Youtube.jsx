import React, { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { motion } from "framer-motion"
import axios from "axios"

import "swiper/css"
import "swiper/css/navigation"

const CHANNEL_ID = "UCEN1zrNRo7Bs2phoDQ3fh1w" // Correct channel ID from user
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY // For Vite: .env should have VITE_YOUTUBE_API_KEY

export default function YouTube({ handleClick }) {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const prevRef = useRef(null)
    const nextRef = useRef(null)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
                )
                console.log("YouTube API response:", response.data)
                
                const videoData = response.data.items
                    .filter(item => item.id.videoId)
                    .map(item => ({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        image: item.snippet.thumbnails.high.url,
                        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                        uploadDate: item.snippet.publishedAt
                    }))
                
                setVideos(videoData)
                setLoading(false)
            } catch (err) {
                console.error("YouTube API error:", err, err?.response?.data)
                setError("Failed to fetch videos")
                setLoading(false)
            }
        }

        fetchVideos()
    }, [])

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

    const handleVideoClick = (video) => {
        window.open(video.url, '_blank')
        if (handleClick) {
            handleClick(video.id)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        })
    }

    if (loading) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-72 w-[90%] mx-auto mt-24 md:mt-32 flex items-center justify-center"
            >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </motion.div>
        )
    }

    if (error) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-72 w-[90%] mx-auto mt-24 md:mt-32 flex items-center justify-center text-red-500"
            >
                {error}
            </motion.div>
        )
    }
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-auto w-[95%] mx-auto mt-16 md:mt-24 flex flex-col justify-center items-center bg-gradient-to-br from-[#1a2233] to-[#232946] shadow-xl rounded-2xl p-6"
        >
            <div className="flex items-center justify-between w-full px-2 md:px-6 mb-4">
                <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="uppercase font-bold md:text-2xl text-lg text-white tracking-wide drop-shadow"
                >
                    TCET SHASTRA YOUTUBE
                </motion.h1>
                <motion.a 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    href="https://www.youtube.com/@tcetsshastra-codingclub5841" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#ff9100] hover:text-[#0057ff] font-semibold transition-colors text-base flex items-center gap-2"
                >
                    View Channel 
                    <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="inline-block"
                    >
                        →
                    </motion.span>
                </motion.a>
            </div>
            <div className="relative w-full flex items-center">
                <button ref={prevRef} className="yt-custom-prev yt-arrow-btn absolute left-0 top-1/2 -translate-y-1/2 z-20" aria-label="Previous">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="currentColor"/>
                        <path d="M19.5 24L12.5 16L19.5 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <Swiper 
                    spaceBetween={32}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    modules={[Navigation]}
                    breakpoints={breakpoints}
                    className="w-full rounded-xl py-4"
                >
                    {videos.map((video, index) => (
                        <SwiperSlide 
                            key={video.id} 
                            className="flex flex-col items-center"
                        >
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#232946] border-2 border-[#0057ff] rounded-2xl shadow-lg overflow-hidden w-72 cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
                                onClick={() => handleVideoClick(video)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="relative">
                                    <img 
                                        src={video.image} 
                                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300 bg-[#121629]"
                                        alt={video.title}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-[#ff9100] bg-opacity-90 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#121629] p-4 flex flex-col gap-2 border-t-2 border-[#0057ff]">
                                    <h3 className="text-white text-base font-bold line-clamp-2 mb-1 tracking-tight">
                                        {video.title}
                                    </h3>
                                    <p className="text-[#ff9100] text-xs font-semibold">
                                        {formatDate(video.uploadDate)}
                                    </p>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button ref={nextRef} className="yt-custom-next yt-arrow-btn absolute right-0 top-1/2 -translate-y-1/2 z-20" aria-label="Next">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="16" fill="currentColor"/>
                        <path d="M12.5 8L19.5 16L12.5 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </motion.div>
    )
}
