'use client'
import { useRouter } from "next/navigation"
import { useUserContext } from "../auth/appContext"
import { Button } from "@material-tailwind/react"
import { logout } from "../auth/authentication"
import UI from "./components/UI"
import { useCookies } from "react-cookie"
import { useEffect } from "react"

const App = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const router = useRouter()
    useEffect(() => {
        if(!cookies.user) router.push('/credentials')
    }, [])
    return (
        <UI />
    )
}

export default App