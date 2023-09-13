'use client'
import { getUserByUID, logout } from '@/app/auth/authentication'
import { Button, Typography } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {PiUserCircleFill} from 'react-icons/pi'
import HorizontalCards from './HorizontalCards'
import Navbar from './Navbar'
import Alerts from './Alerts'
import Welcome from './Welcome'

const Home = () => {
    const [cookies, setCookie] = useCookies(['user, isAuth'])
    const [person, setPerson] = useState({})
    console.log(cookies.user)
    let userHavePhoto = cookies.user.providerData[0].photoURL

    const encerrarSessao = () => {
        logout()
        setCookie('user', null)
        setCookie('isAuth', null)
    }

    useEffect(() => {
        async function getUser() {
            const response = await getUserByUID(cookies.user.uid)
            setPerson(await response)   
        }
        getUser()
    }, [])

    return (
        <div className='xl:mx-80 md:my-[20px] m-5'>
            <Navbar userHavePhoto={userHavePhoto} />
            <Welcome user={person} />
            <HorizontalCards />
            <Alerts />
            <div className='mb-[100px]'></div>
            {/* <Button size='lg' onClick={encerrarSessao}>Sair</Button> */}
        </div>
    )
}

export default Home