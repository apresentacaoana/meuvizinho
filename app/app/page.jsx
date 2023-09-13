'use client'
import { useRouter } from "next/navigation"
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