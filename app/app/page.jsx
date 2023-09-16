'use client'
import { useRouter } from "next/navigation"
import UI from "./components/UI"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { getComunities, getUserByUID } from "../auth/authentication"

const App = () => {
    const [cookies, setCookie] = useCookies(['user', 'groupId'])
    const router = useRouter()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user || !cookies.user) router.push('/credentials')
        }, (error) => {})
    
        const getData = async () => {
            setCookie('groupId', null)
            await getUserByUID(cookies.user.uid).then(async (userLoggedIn) => {
                await getComunities().then((res) => {
                    res.forEach((comunity) => {
                        if(comunity.creator.uid == userLoggedIn.uid) return setCookie('groupId', comunity.id)
                        comunity.members.forEach((member) => {
                            console.log("TESTANDO 2: ", member.uid == userLoggedIn.uid)
                            if(member.uid == userLoggedIn.uid) return setCookie('groupId', comunity.id)
                            else setCookie('groupId', null)
                        })
                    })
                    console.log(cookies.groupId)
                    return
                })
            })
        }
        getData()
    }, [])
    return (
        <UI />
    )
}

export default App