import React from "react"
import { Link, useRouteError } from "react-router-dom"

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"

export function ErrorElement() {
    const error = useRouteError()
    return (
        <div className="flex justify-center h-screen items-center">
            <h1 className="text-xl sm:text-2xl  md:text-4xl font-bold ">An Error occurred: {error.message}</h1>
        </div>
    )
}

export default function URLNotFound() {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="mx-3">
                <span className="text-lg font-[400] text-center sm:text-2xl">
                    <strong className="text-xl">OOPS!!</strong>, the page you are looking for is not found
                </span>
                <SentimentVeryDissatisfiedIcon className="ml-1 relative bottom-1" fontSize="medium"/>
            </h1>
            <Link to="/" className="mt-5 rounded-3xl overflow-hidden border-2 border-black text-lg flex 
                    hover:bg-gradient-to-br from-[#030B98] from-[16.16%] to-[#FF9201] to-[43.13%]
                    transition-all ease-in"
            >
                <button className="mx-1 my-1  px-2 py-1 rounded-3xl bg-white hover:border-black hover:border-[1px] transition-all ease-in">Return To Home</button>
            </Link>
        </div>
    )
}