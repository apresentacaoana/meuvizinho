import { collection, limit, orderBy } from "firebase/firestore"
import Message from "./Message"
import { query } from "firebase/firestore"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import { useCookies } from "react-cookie"
import { db } from "@/app/firebase"
import InputMessage from "./InputMessage"
import { useEffect, useRef } from "react"

const ChatRoom = () => {
    
    const messageRef = collection(db, "messages")
    const queryRef = query(messageRef, orderBy("createdAt", "asc"))
    const [messages] = useCollection(queryRef, {idField: 'uid'})
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])

    const scrollTo = useRef(null)

    useEffect(() => {
        scrollTo.current.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return (
        <div>
            <div className="flex flex-col gap-5 md:mb-[80px] mb-[100px] xl:mx-80 md:my-[20px] m-5">
                {messages && messages.docs.map(msg => <Message key={msg.id} text={msg.data().text} createdAt={msg.data().createdAt} uid={cookies.user.uid} />)}
                <div ref={scrollTo}></div>
            </div>
            <InputMessage messageRef={messageRef} />
        </div>
    )
}

export default ChatRoom