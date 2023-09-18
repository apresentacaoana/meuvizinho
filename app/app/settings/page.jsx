'use client'
import { useCookies } from "react-cookie"
import Header from "../../components/Header"
import {useEffect, useState} from 'react'
import { List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import {FaRegAddressCard, FaStreetView} from 'react-icons/fa'
import {BsPersonFillGear} from 'react-icons/bs'
import {useRouter} from 'next/navigation'


const SettingsPage = () => {
    const [cookies, setCookie] = useCookies(['user'])
    const router = useRouter()
    return (
        <div>
            <Header title={`Configurações`} />
            <div className="xl:mx-80 md:my-[70px] m-5">
                <List className="mt-[5rem] gap-3">
                    <ListItem onClick={(e) => router.push('/app/settings/profile')} className="items-center border border-gray-400 shadow-sm">
                        <ListItemPrefix>
                            <FaStreetView size={25} />
                        </ListItemPrefix>
                        <div>
                            <Typography variant="lead" className="font-bold text-[14px]">Editar Perfil</Typography>
                            <Typography variant="small">Altere sua foto de perfil, nome e outros detalhes.</Typography>
                        </div>
                    </ListItem>
                    <ListItem onClick={(e) => router.push('/app/settings/address')} className="items-center border border-gray-400 shadow-sm">
                        <ListItemPrefix>
                            <BsPersonFillGear size={25} />
                        </ListItemPrefix>
                        <div>
                            <Typography variant="lead" className="font-bold text-[14px]">Editar Endereço</Typography>
                            <Typography variant="small">Altere a sua rua, nº da casa, cidade, distrito.</Typography>
                        </div>
                    </ListItem>
                    <ListItem onClick={(e) => router.push('/app/settings/address')} className="items-center border border-gray-400 shadow-sm">
                        <ListItemPrefix>
                            <FaRegAddressCard size={25} />
                        </ListItemPrefix>
                        <div>
                            <Typography variant="lead" className="font-bold text-[14px]">Validar Documentos</Typography>
                            <Typography variant="small">Verifique a sua conta para usufruir 100% da aplicação.</Typography>
                        </div>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

export default SettingsPage