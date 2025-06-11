import React from "react"

import Thumbnail from "../../assets/home/thumbnail.png"
import Quote from "../../assets/home/quote.png"

export default function Vision() {
    return (
        <>
            <div className="pt-5 md:py-10 w-[90%] flex self-center flex-col items-center">
                <span className="uppercase select-none inline-block mx-auto w-max font-bold text-2xl md:text-4xl pb-3 gradient-txt">Our Club's Vision</span>
                <p className="text-sm text-justify md:text-base block sm:px-10 md:px-20"> 
                As a Data Structures and Algorithms (DSA) oriented coding club, under the training and placement cell, our vision is to cultivate a strong problem-solving culture among students. We aim to empower individuals with essential DSA skills, fostering a community of proficient coders ready to tackle real-world challenges and excel in technical interviews. Our goal is to bridge the gap between academic learning and industry requirements, ensuring our members are well-prepared for successful careers in technology.
                </p>
            </div>

            <div className="flex flex-col relative">
                <span className="capitalize ml-5 md:ml-10 my-auto inline-block font-bold w-max text-xl md:text-3xl pb-5 gradient-txt">Scoops from the Club</span>
                <div className="grid grid-cols-4 gap-1 pl-5 md:pl-10">
                    <div className="col-span-4 sm:col-span-1 my-auto mr-2 flex h-full justify-center sm:justify-normal sm:items-center mb-3 sm:mb-0">
                        <img src={Thumbnail} className="inline-block h-28 sm:h-32 md:h-44 lg:h-60"/>
                    </div>
                    <p className="text-xs text-justify relative z-[5] md:text-xl my-auto md:pr-20 sm:pr-5 col-span-4 sm:col-span-3 mx-5 sm:mx-0">
                        <img src={Quote} className="inline-block absolute -z-[5] aspect-square h-8 w-10 md:h-16 md:w-20 -left-5 md:-left-10 -top-2 md:-top-5"/>
                        At our club, we regularly host coding contests, workshops on advanced data structures, and mock interview sessions. We provide a collaborative environment where members can learn from experienced peers, participate in competitive programming, and contribute to open-source projects. Our recent achievements include several members securing internships at top tech companies and excelling in national coding competitions.
                    </p>
                </div>
            </div>
        </>
    )
}