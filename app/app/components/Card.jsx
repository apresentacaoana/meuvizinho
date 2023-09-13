'use client'
import { useRouter } from "next/navigation"


const Card = ({ children, url, onClick, color, text_color, icon }) => {
    const router = useRouter()
    return (
        <div onClick={() => {
            if(url !== "none") router.push(url)
            if(onClick !== null) onClick()
        }} style={{ background: color, color: text_color }} className={`p-5 hover:shadow-lg cursor-pointer gap-3 flex justify-between flex-col min-w-[150px] w-fit rounded-[8px] bg-[${color}] text-[${text_color}]`}>
            {icon}

            <div style={{ whiteSpace: "nowrap" }} className="justify-self-end flex-grow">{children}</div>
        </div>
    )
}

export default Card