'use client'
import { getUserByUID, logout } from '@/app/auth/authentication'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import HorizontalCards from './HorizontalCards'
import Navbar from './Navbar'
import Alerts from './Alerts'
import Welcome from './Welcome'

const Home = () => {
    const [cookies, setCookie] = useCookies(['user, isAuth'])
    const [person, setPerson] = useState({})
    let userHavePhoto = null

    useEffect(() => {
        async function getUser() {
            const response = await getUserByUID(cookies.user.uid)
            setPerson(await response)   
            if(cookies.user) {
                userHavePhoto = cookies.user.providerData[0].photoURL
            }
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