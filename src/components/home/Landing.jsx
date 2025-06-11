import React from "react"

import Logo from "../../assets/home/logo.png"

export default function Landing() {
    return (
        <div className="h-64 min-[360px]:h-60 sm:h-72 md:h-[17rem] lg:h-80 bg-home rounded-b-[76px] md:rounded-b-[94px] lg:rounded-b-[114px]">
            <div className="relative top-28 flex flex-row justify-around items-center mx-2">

                <span className="uppercase font-bold text-lg min-[360px]:text-xl min-[500px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    <h1 className="text-[#000778]">Welcome to the</h1>
                    <h1 className="text-[#000778]">Official Page of</h1>
                    <h1 className="gradient-txt text-xl min-[360px]:text-2xl min-[500px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Coding Club</h1>
                </span>

                <span className="">
                    <img src={Logo} className="inline-block mx-auto h-14 w-28 min-[500px]:h-20 min-[500px]:w-40 sm:h-24 sm:w-48 lg:h-28 lg:w-56 xl:h-36 xl:w-72" />
                    <h1 className="mx-auto text-center text-lg sm:text-xl md:text-2xl">
                        <span className="tracking-wider">TCET's शSTRA</span>
                    </h1>
                </span>

            </div>
        </div>
    )
}