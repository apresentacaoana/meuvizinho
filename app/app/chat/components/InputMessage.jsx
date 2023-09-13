'use client'
import { IconButton } from "@material-tailwind/react"
import {BsSendFill} from 'react-icons/bs'
import {useEffect, useState} from 'react'
import { useCookies } from "react-cookie"
import { FieldValue, serverTimestamp } from "firebase/firestore"
import { addDoc } from "firebase/firestore"

const InputMessage = ({ messageRef }) => {
    const [message, setMessage] = useState('')
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])

    const sendMessage = async() => {
        if(!cookies.user || !message) return
        const payload = {
            text: message,
            createdAt: new Date(),
            uid: cookies.user.uid,
            photoURL: cookies.photoURL || "",
            groupId: ""
        }
        setMessage('')
        await addDoc(messageRef, payload)
    }

    return (
        <div className="fixed xl:px-80 bg-white  flex p-[20px] border-t border-gray-200 justify-between items-center w-full bottom-0 ">
            <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Fale sobre o ocorrido" type="text" className="px-4 py-2 xl:w-[95%] w-[95%] placeholder:text-[#757575] rounded-full bg-[#F5F5F5] text-[black]   focus:outline-none" />    
            <IconButton onClick={sendMessage} variant="text">
                <BsSendFill size={25} />
            </IconButton>
        </div>
    )
}

export default InputMessage