'use client'
import { useEffect, useState } from "react"
import Header from "../../../components/Header"
import { useCookies } from "react-cookie"
import { getUserByUID } from "../../../auth/authentication"
import Loading from "../../../components/Loading"
import { Button, Input, Select, Typography } from "@material-tailwind/react"

const AddressSettings = () => {
    const [userLoggedIn, setUser] = useState({})
    const [cookies, setCookie] = useCookies(['isAuth', 'user'])
    const [loading, setLoading] = useState(true)
    const [city, setCity] = useState()
    const [bairro, setBairro] = useState()
    const [street, setStreet] = useState()
    const [number, setNumber] = useState()
    const [country, setCountry] = useState()
    const [state, setState] = useState()
    
    useEffect(() => {
        const getData = async () => {
            await getUserByUID(cookies.user.uid).then(res => {
                setUser(res)
                setBairro(res.bairro)
                setStreet(res.street)
                setNumber(res.address_number)
                setCity(res.ciy)
                setState(res.state)
                setLoading(false)
            })
        }
        getData()
    }, [])

    return (
        <div>
            {loading ? (
                <Loading />
            ): (
                
                <div>
                    <Header title={userLoggedIn.nickname} />
                    <div className="xl:mx-80 md:my-[70px] m-5 mt-[7rem]  flex flex-col justify-center items-center">
                        <div className="w-full flex flex-col gap-3">
                            <Typography variant="h3">Endereço</Typography>
                            <Input value={bairro} onChange={(e) => setName(e.target.value)} size="lg" label="Bairro" />
                            <Input value={street} onChange={(e) => setStreet(e.target.value)} size="lg" label="Endereço" />
                            <Input value={number} onChange={(e) => setNumber(e.target.value)} size="lg" label="Nº da Cara/Apartamento" />
                            <Input value={city} onChange={(e) => setCity(e.target.value)} size="lg" label="Cidade" />
                            <Input value={state} onChange={e => setState(e.target.value)} size="lg" label="Estado" />
                            <Button size="lg" color="green" variant="gradient">EDITAR</Button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default AddressSettings