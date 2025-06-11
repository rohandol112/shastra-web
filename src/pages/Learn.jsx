import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import YouTube from "../components/Card/LearnCard/Youtube"
import Articles from "../components/Card/LearnCard/Articles"

import BasicProgrammingImg from "../assets/learn/Basic Programming.png";
import DynamicProgrammingImg from "../assets/learn/Dynamic Programming.png";
import GreedyAlgorithmsImg from "../assets/learn/Greedy Algorithms.png";
import LinkedListImg from "../assets/learn/Linked List.png";
import OOPSImg from "../assets/learn/OOPS.png";
import StacksImg from "../assets/learn/Stacks .png";
import TreesImg from "../assets/learn/Trees.png";
import Prereq1Img from "../assets/learn/Basic Programming.png";
import Prereq2Img from "../assets/learn/OOPS.png";

const learningPDFs = [
    {
        topic: "Basic Programming",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
    {
        topic: "Dynamic Programming",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: DynamicProgrammingImg
    },
    {
        topic: "Greedy Algorithms",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: GreedyAlgorithmsImg
    },
    {
        topic: "Linked Lists",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: LinkedListImg
    },
    {
        topic: "OOPS",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: OOPSImg
    },
    {
        topic: "Stacks & Queue",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: StacksImg
    },
    {
        topic: "Trees",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: TreesImg
    },
];

const prerequisites = [
    {
        name: "Arrays",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
    {
        name: "Bit Manipulation",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
    {
        name: "Dynamic Programming",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: DynamicProgrammingImg
    },
    {
        name: "Graphs",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: TreesImg
    },
    {
        name: "Greedy Algorithms",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: GreedyAlgorithmsImg
    },
    {
        name: "Maths in DSA",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
    {
        name: "Number Theory and Maths",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
    {
        name: "Sliding Windows",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
    {
        name: "String",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
    {
        name: "Two Pointer",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg
    },
];

export default function () {
    const [youtube, setYoutube] = useState([])
    const [articles, setArticles] = useState([])

    useEffect(() => {
        setYoutube([]);
        setArticles([]);
    }, []);

    function handleClick(id) {
        console.log("clicked")
        setYoutube(prevState => {
            return prevState.map(item => {
                if(item.id === id) {
                    return { ...item, open: !item.open }
                }
                return item
            })
        })
    }
    
    return (
    <div className="relative z-10 min-h-[100%] ">

        <YouTube 
            youtube={youtube}
            handleClick={handleClick}
        />

        <div className="my-10 flex flex-col">
            <h1 className="uppercase mb-8 self-center font-bold md:text-xl text-[#0057ff]">Learning PDFs</h1>
            <Swiper
                spaceBetween={32}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="w-full rounded-xl py-4"
            >
                {learningPDFs.map((pdf, idx) => (
                    <SwiperSlide key={pdf.topic} className="flex flex-col items-center">
                        <a
                            href={pdf.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[#232946] border-2 border-[#0057ff] rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl hover:border-[#ff9100] transition-all duration-300 overflow-hidden w-72 mx-auto"
                        >
                            <img
                                src={pdf.image}
                                alt={pdf.topic + ' thumbnail'}
                                className="w-full h-40 object-cover bg-[#121629] group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="flex-1 w-full flex flex-col justify-between p-5 bg-[#121629]">
                                <span className="text-white font-bold text-lg mb-2 text-center group-hover:text-[#ff9100] transition-colors">{pdf.topic}</span>
                                <span className="mt-2 text-center text-xs text-[#ff9100] font-semibold group-hover:text-[#0057ff] transition-colors">View PDFs →</span>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        <div className="my-10 flex flex-col">
            <h1 className="uppercase mb-8 self-center font-bold md:text-xl text-[#ff9100]">Prerequisites</h1>
            <Swiper
                spaceBetween={32}
                navigation={true}
                modules={[Navigation]}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="w-full rounded-xl py-4"
            >
                {prerequisites.map((item, idx) => (
                    <SwiperSlide key={item.name} className="flex flex-col items-center">
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[#232946] border-2 border-[#ff9100] rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl hover:border-[#0057ff] transition-all duration-300 overflow-hidden w-72 mx-auto"
                        >
                            <img
                                src={item.image}
                                alt={item.name + ' thumbnail'}
                                className="w-full h-40 object-cover bg-[#121629] group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="flex-1 w-full flex flex-col justify-between p-5 bg-[#121629]">
                                <span className="text-white font-bold text-lg mb-2 text-center group-hover:text-[#ff9100] transition-colors">{item.name}</span>
                                <span className="mt-2 text-center text-xs text-[#ff9100] font-semibold group-hover:text-[#0057ff] transition-colors">View PDFs →</span>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
    )
}