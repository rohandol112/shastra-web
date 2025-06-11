import React from "react"
import { LinkedIn } from "@mui/icons-material"
import { motion } from "framer-motion"

export default function TeamCard(props) {
    return (
        <motion.div
            id={props.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)", borderColor: props.eventHover ? '#ff9100' : undefined }}
            transition={{ duration: 0.4, type: "spring" }}
            className={`aspect-auto w-64 h-80 md:w-72 md:h-96 rounded-xl mx-auto my-auto col-span-2 bg-gray-300 border ${props.eventHover ? 'border-[#0057ff] group hover:border-[#ff9100] transition-colors duration-300' : 'border-black'} cursor-pointer overflow-hidden group`}
        >
            <div className="rounded-t-xl relative h-3/5 overflow-hidden">
                <img src={props.image} className="inline-block h-full w-full rounded-t-xl object-cover object-center group-hover:scale-105 transition-transform duration-300" alt="core image"/>
                <a
                    href={props.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#ff9100] hover:scale-110 active:scale-95"
                    style={{ outline: 'none' }}
                    tabIndex={0}
                    aria-label={`LinkedIn profile of ${props.name}`}
                >
                    <LinkedIn
                        sx={{
                            height: 40,
                            width: 40,
                            transition: 'color 0.3s',
                        }}
                        className="text-[#0e76a8] group-hover:text-white"
                    />
                </a>
            </div>
            <div className="bg-[#ffffffcc] h-2/5 flex flex-col justify-center">
                <h1 className="capitalize text-center text-xl font-bold text-gray-900 mb-1">{props.name}</h1>  
                <h1 className="uppercase text-center text-base text-[#0057ff] font-semibold tracking-wide">{props.designation}</h1>
            </div>
        </motion.div>
    )
}