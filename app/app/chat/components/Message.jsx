'use client'
import { Typography } from "@material-tailwind/react"
import { useCookies } from "react-cookie"
import { setState } from 'react'
import moment from "moment/moment"

const Message = ({ text, uid, createdAt }) => {
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])
    if(!cookies.user) return
    const itsMe = uid === cookies.user.uid
    let timestamp = moment.unix(createdAt).format('LT')

    return (
        <div className="self-end justify-self-end  flex-col flex">
            <div className="bg-[#A1C7FF] text-[13px]  flex items-start self-end justify-self-end  rounded-t-[24px]  rounded-bl-[24px] text-white">
                <div className="w-[100%] py-[10px] text-start px-[25px]">
                    {text}
                </div>
            </div>
            <Typography variant="small" className="ml-[15px] justify-self-start self-end mt-[6px] text-[#757575]">{timestamp}</Typography>
        </div>
    )
}

export default Message  