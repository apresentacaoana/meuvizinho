'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserContextProvider } from './auth/appContext'
import {CookiesProvider} from 'react-cookie'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <head>
        <title>Meu Vizinho Produção</title>
        <meta name='description' content='Description' />
      </head>
      
      <body className={inter.className}>
        <CookiesProvider>
          <UserContextProvider>
            {children}
          </UserContextProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}
