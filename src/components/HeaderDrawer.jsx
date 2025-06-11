import React from "react"
import { NavLink } from "react-router-dom"
import { nanoid } from "nanoid"

import MenuIcon from "@mui/icons-material/Menu"
import { Box, Drawer } from "@mui/material"

export default function HeaderDrawer({redirect, drawer, setDrawer}) {
    return (
        <>
            <button 
                className="ml-auto mr-2 border-2 border-black h-min my-auto rounded-lg md:hidden"
                onClick={() => setDrawer(true)}
            >
                <MenuIcon 
                    fontSize="large" 
                    sx={{color: "#FF9201"}}    
                />
            </button>

            <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)} className="md:hidden">
                <Box width="100px" m={5} textAlign="center" role="presentation">
                    {   
                        redirect.length &&
                        redirect.map(item => (
                            <NavLink 
                                key={nanoid()}
                                to={`${item.link}`} 
                                className={({isActive}) => isActive ? "header-btn-drawer header-btn-drawer-act transition-all duration-200" : "header-btn-drawer"}
                            >
                                {item.page}
                            </NavLink>
                        ))
                    }
                </Box>
            </Drawer>
        </>
    )
}