'use client'
import { Typography } from "@material-tailwind/react"
import Header from "./components/Header"
import Details from "./components/Details"

const Alert = () => {
    return (
        <div className="w-screen h-screen bg-[#ff3333] ">
            <Header />
            <div className="xl:px-80 p-5 md:py-[20px]">
                <Details />
            </div>
        </div>
    )
}

export default Alert