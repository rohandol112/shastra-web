import React from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"


export default function MainLayout() {
    return (
        <div className="relative font-Ubuntu h-screen" data-theme="light">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
} 