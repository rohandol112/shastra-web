import React from "react"
import { motion } from "framer-motion"

export default function EventCard(props) {
    return (
        <motion.a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:w-72 min-[768px]:w-60 min-[980px]:w-72 rounded-2xl m-auto overflow-hidden bg-white shadow-lg pb-0 group border-2 border-transparent transition-all duration-300"
            whileHover={{ scale: 1.04, backgroundColor: "#FF9201", borderColor: "#0057ff", boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
        >
            <div className="relative min-h-[8rem] md:min-h-[10rem] lg:min-h-[13rem] overflow-hidden">
                <img src={props.image} className="aspect-square inline-block max-h-40 md:max-h-52 w-full object-cover object-center rounded-t-lg" alt="event image"/>
            </div>

            <div className="h-max p-3 sm:p-5 md:p-8">
                <h1 className="capitalize text-center text-lg font-bold group-hover:text-white transition-colors duration-300">{props.name}</h1>  
                <h1 className="capitalize text-center text-sm text-gray-600 group-hover:text-white transition-colors duration-300">{props.criteria}</h1>
                {
                    props.date && <h1 className="capitalize text-center text-sm text-gray-500 pb-1 group-hover:text-white transition-colors duration-300">{props.date}</h1>
                }
            </div>
        </motion.a>
    )
}