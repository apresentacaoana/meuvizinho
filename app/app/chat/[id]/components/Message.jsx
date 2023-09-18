'use client'
import { Typography } from "@material-tailwind/react"
import { useCookies } from "react-cookie"
import { setState, useEffect, useState } from 'react'
import moment from "moment/moment"
import { getUserByUID } from "../../../../../app/auth/authentication"
import {MdLocalPolice} from 'react-icons/md'

const Message = ({ text, uid, photoURL, name, createdAt, role }) => {
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])
    if(!cookies.user) return
    const itsMe = uid === cookies.user.uid
    let timestamp = moment.unix(createdAt).format('LT')

    return (
        <div className={`${itsMe ? 'self-end justify-self-end' : 'self-start justify-self-start'} flex items-end gap-3 `}>
            {!itsMe && (
                <img src={photoURL} alt="" className="rounded-full w-[37px] h-[37px]" />
            )}
            <div className={`w-full flex-col flex`}>
                <div className={`${itsMe ? 'bg-[#A1C7FF] text-white' : 'bg-[#F5F5F5] text-black'} ${role === 'police' && 'bg-black text-white'} relative text-[13px] flex-col  flex items-start self-end justify-self-end  rounded-t-[24px] ${itsMe ? 'rounded-bl-[24px]' : 'rounded-br-[24px]'} `}>
                    {!itsMe && (<span className="font-bold px-[25px] pt-[10px]">{role === 'police' ? <div className="flex gap-1 items-center">{name} <MdLocalPolice color="#ffffff" /></div> : <>{name}</>}</span>)}
                    <div className={`w-[100%] ${itsMe ? 'py-[10px]' : 'pb-[10px]'} text-start px-[25px]`}>
                        {text}
                    </div>
                    <Typography variant="small" className={`${itsMe ? "right-0" : "left-0 ml-3"} w-[70px] absolute -bottom-6 justify-self-start self-end text-[#757575]`}>{timestamp}</Typography>
            
                </div>
            </div>
        </div>

    )
}

export default Message  