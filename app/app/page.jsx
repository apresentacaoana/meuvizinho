'use client'
import { useRouter } from "next/navigation"
import UI from "./components/UI"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { getComunities, getUserByUID, updateUser } from "../auth/authentication"

const App = () => {
    const [cookies, setCookie] = useCookies(['user', 'groupId', 'location', 'groups'])
    const router = useRouter()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user || !cookies.user) router.push('/credentials')
        }, (error) => {})
    
        const getData = async () => {
            setCookie('groupId', null)
            if(cookies.user) {
                setCookie('groups', [])
                await getUserByUID(cookies.user.uid).then(async (userLoggedIn) => {
                    if(userLoggedIn.latitude != cookies.location.latitude && userLoggedIn.longitude != cookies.location.longitude) {
                        await updateUser(userLoggedIn, {latitude: cookies.location.latitude, longitude: cookies.location.longitude})
                    }
                    await getComunities().then((res) => {
                        res.forEach((comunity) => {
                            if(comunity.creator.uid == userLoggedIn.uid) {
                                setCookie('groupId', comunity.id)
                                setCookie('groups', [...cookies.groups].push(comunity.id))
                                return 
                            }
                            comunity.members.forEach((member) => {
                                if(member.uid == userLoggedIn.uid) {
                                    setCookie('groupId', comunity.id)
                                    setCookie('groups', [...cookies.groups].push(comunity.id))
                                    return 
                                }
                                else setCookie('groupId', null)
                            })
                        })
                    })
                    console.log(cookies.groups)
                })
            }
        }
        getData()
    }, [])
    return (
        <UI />
    )
}

export default App