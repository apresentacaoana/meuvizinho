'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserContextProvider } from './auth/appContext'
import {CookiesProvider, useCookies} from 'react-cookie'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {

  const [cookies, setCookie] = useCookies(['location'])
  
  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async ({coords}) => {
        await setCookie('location', {latitude: coords.latitude, longitude: coords.longitude})

        console.log(cookies.location)
      })
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Meu Vizinho Produção</title>
        <meta name='description' content='Description' />
      </head>
      
      <body className={`${inter.className} `}>
        <CookiesProvider>
          <UserContextProvider>
            {children}
          </UserContextProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}
