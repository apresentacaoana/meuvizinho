'use client'
import { Button } from '@material-tailwind/react'
import Image from 'next/image'
import { logout } from './auth/authentication'
import { useUserContext } from './auth/appContext'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

export default function Home() {
  const [cookies, setCookie] = useCookies(['user'])
  const router = useRouter()

  function encerrarSessao() {
    logout()
    setCookie("user", null)
  }

  useEffect(() => {
    if(cookies.user == null) {
      router.push('/credentials')
      return
    }
  }, [])
  return (
    <div>
      <Button size='lg' onClick={encerrarSessao} className=''>Encerrar sessão</Button>
    </div>
  )
}
