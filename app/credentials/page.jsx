'use client'
import { useContext, useEffect, useRef, useState } from "react"
import UI from "./components/UI"
import { auth } from "../firebase"
import { useUserContext, userContext } from "../auth/appContext"
import { useRouter } from "next/navigation"
import { logout } from "../auth/authentication"
import { useCookies } from "react-cookie"

const Credentials = () => {
    const {authUser, setAuth} = useUserContext()
    const router = useRouter()
    const [reload, setRelaod] = useState(1)
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setAuth({
                isAuth: 1,
                user: user
            })
            console.log(user)
            setCookie('isAuth', 1)
            setCookie('user', user)
            if(user) router.push('/app')
        }, (error) => {})
    }, [])
    return (
        <UI reload={reload} setReload={setRelaod} />
    )
}

export default Credentials