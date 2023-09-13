'use client'
import { useRouter } from "next/navigation"


const Card = ({ children, url, color, text_color, icon }) => {
    const router = useRouter()
    return (
        <div onClick={() => router.push(url)} style={{ background: color, color: text_color }} className={`p-5 hover:shadow-lg cursor-pointer gap-3 flex justify-between flex-col min-w-[150px] w-fit rounded-[8px] bg-[${color}] text-[${text_color}]`}>
            {icon}

            <div style={{ whiteSpace: "nowrap" }} className="justify-self-end flex-grow">{children}</div>
        </div>
    )
}

export default Card