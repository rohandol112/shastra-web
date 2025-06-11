import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { nanoid } from "nanoid"

import HeaderDrawer from "./HeaderDrawer"

import Logo from "../assets/header/shastra-logo-home.png"
import Text from "../assets/header/shastra-logo-home-text.png"  

export default function Header() {
    const [drawer, setDrawer] = useState(false)
    const [redirect, setRedirect] = useState([
        {"page": "Home", "link": "/"},
        {"page": "Team", "link": "team"},
        {"page": "Events", "link": "events"},
        {"page": "Learn", "link": "learn"},
        {"page": "Contact us", "link": "contact"}
    ])

    return (
        <header className="fixed select-none z-50 backdrop-filter backdrop-blur-sm top-0 flex flex-row w-full px-1 text-black bg-transparent sm:px-5 pt-3 pb-2 sm:justify-between">
            <Link to="/" className="w-max flex items-center outline-none">
                <img src={Logo} className="inline-block h-[43px] w-[86px] sm:h-[63px] sm:w-[126px]"/>
                {/* <img src={Text} className="h-[43px] w-[63px] inline-block my-auto"/> */}        {/* If the text is need in img, then use this */}
                <span className="text-base font-[500] my-auto mt-auto ml-1 inline-block sm:font-medium sm:text-xl md:ml-2 ">
                    <h1 className="tracking-wider">TCET's</h1>
                    <h1 className="tracking-normal">शSTRA</h1>
                </span>
            </Link>

            <HeaderDrawer 
                redirect={redirect}
                drawer={drawer}
                setDrawer={setDrawer}
            />

            <nav className="hidden my-auto uppercase font-medium text-[20px] md:block md:space-x-2 lg:space-x-6 xl:space-x-8">
                {
                    redirect.length &&
                    redirect.slice(0, redirect.length - 1).map(item => (           
                        <NavLink 
                            key={nanoid()}
                            to={`${item.link}`} 
                            className={({isActive}) => isActive ? "header-btn header-btn-act transition-all duration-200" : "header-btn"}
                        >
                            {item.page}
                        </NavLink>
                    ))
                }
            </nav>

            <NavLink
                to="contact"
                className={({isActive}) => isActive ? "header-btn-ctc header-btn-act" : "header-btn-ctc"}
            >
                Contact us
            </NavLink>
        </header>
    )
}