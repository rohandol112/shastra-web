import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

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
        image: BasicProgrammingImg,
        description: "Master the fundamentals of programming with our comprehensive guide."
    },
    {
        topic: "Dynamic Programming",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: DynamicProgrammingImg,
        description: "Learn advanced problem-solving techniques with dynamic programming."
    },
    {
        topic: "Greedy Algorithms",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: GreedyAlgorithmsImg,
        description: "Understand greedy algorithms and their applications in problem-solving."
    },
    {
        topic: "Linked Lists",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: LinkedListImg,
        description: "Explore linked list data structures and their implementations."
    },
    {
        topic: "OOPS",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: OOPSImg,
        description: "Master Object-Oriented Programming concepts and principles."
    },
    {
        topic: "Stacks & Queue",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: StacksImg,
        description: "Learn about stack and queue data structures and their applications."
    },
    {
        topic: "Trees",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: TreesImg,
        description: "Understand tree data structures and their various implementations."
    },
];

const prerequisites = [
    {
        name: "Arrays",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg,
        description: "Master array operations and common algorithms."
    },
    {
        name: "Bit Manipulation",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg,
        description: "Learn efficient bit manipulation techniques."
    },
    {
        name: "Dynamic Programming",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: DynamicProgrammingImg,
        description: "Advanced problem-solving with dynamic programming."
    },
    {
        name: "Graphs",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: TreesImg,
        description: "Understand graph theory and algorithms."
    },
    {
        name: "Greedy Algorithms",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: GreedyAlgorithmsImg,
        description: "Learn greedy approach to problem-solving."
    },
    {
        name: "Maths in DSA",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg,
        description: "Mathematical concepts in data structures and algorithms."
    },
    {
        name: "Number Theory",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg,
        description: "Essential number theory concepts for competitive programming."
    },
    {
        name: "Sliding Windows",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg,
        description: "Master the sliding window technique for array problems."
    },
    {
        name: "String",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg,
        description: "String manipulation and pattern matching algorithms."
    },
    {
        name: "Two Pointer",
        link: "https://drive.google.com/drive/folders/1nvlZd20vDmFb6cWcig3B7Ae3cSZ8PEtB?usp=sharing",
        image: BasicProgrammingImg,
        description: "Efficient array processing with two pointer technique."
    },
];

export default function Learn() {
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
        <div className="relative z-10 min-h-[100%] bg-white py-20">
            <div className="container mx-auto px-4">
                <YouTube 
                    youtube={youtube}
                    handleClick={handleClick}
                />

                <div className="my-16 bg-[#232946] rounded-2xl shadow-xl p-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Learning Resources</h1>
                    <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
                        Explore our comprehensive collection of learning materials, from basic concepts to advanced topics.
                    </p>
                    
                    <div className="mb-20">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#0057ff]">Learning PDFs</h2>
                        <Swiper
                            spaceBetween={32}
                            navigation={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Autoplay]}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="w-full rounded-xl py-4"
                        >
                            {learningPDFs.map((pdf) => (
                                <SwiperSlide key={pdf.topic} className="flex flex-col items-center">
                                    <a
                                        href={pdf.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-[#1A1A1A] rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl transition-all duration-300 overflow-hidden w-full mx-auto transform hover:-translate-y-2"
                                    >
                                        <div className="relative w-full h-48 overflow-hidden">
                                            <img
                                                src={pdf.image}
                                                alt={pdf.topic + ' thumbnail'}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="p-6 w-full">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#0057ff] transition-colors">{pdf.topic}</h3>
                                            <p className="text-gray-400 text-sm mb-4">{pdf.description}</p>
                                            <span className="inline-block text-[#0057ff] font-semibold group-hover:translate-x-2 transition-transform">View PDFs →</span>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="mt-20">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#ff9100]">Prerequisites</h2>
                        <Swiper
                            spaceBetween={32}
                            navigation={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Autoplay]}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="w-full rounded-xl py-4"
                        >
                            {prerequisites.map((item) => (
                                <SwiperSlide key={item.name} className="flex flex-col items-center">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-[#1A1A1A] rounded-2xl shadow-lg flex flex-col items-center hover:shadow-2xl transition-all duration-300 overflow-hidden w-full mx-auto transform hover:-translate-y-2"
                                    >
                                        <div className="relative w-full h-48 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name + ' thumbnail'}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <div className="p-6 w-full">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff9100] transition-colors">{item.name}</h3>
                                            <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                            <span className="inline-block text-[#ff9100] font-semibold group-hover:translate-x-2 transition-transform">View PDFs →</span>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}