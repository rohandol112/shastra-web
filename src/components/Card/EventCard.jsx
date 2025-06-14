import React from "react"
import { motion } from "framer-motion"

const EventCard = ({ name, criteria, image, date, time, description }) => {
    return (
        <motion.div
            className="block bg-[#1A1A1A] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
            whileHover={{ y: -5 }}
        >
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={image} 
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
                <p className="text-gray-400 mb-4">{description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{criteria}</span>
                    {(date || time) && (
                        <div className="text-sm text-gray-500">
                            {date && <span className="block">{date}</span>}
                            {time && <span className="block">{time}</span>}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default EventCard