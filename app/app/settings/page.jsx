'use client'
import { useCookies } from "react-cookie"
import Header from "../../components/Header"
import Loading from "../../components/Loading"
import { useEffect, useRef, useState } from "react"
import { getUserByUID, uploadImage } from "../../auth/authentication"
import { Alert, Avatar, Button, Input } from "@material-tailwind/react"

const SettingsPage = () => {
    const [cookies, setCookie] = useCookies(["user", "isAuth"])
    const [userLoggedIn, setUser] = useState({})
    const inputFile = useRef(null)
    const [nickname, setNickname] = useState('')
    const [name, setName] = useState('')
    const [alerta, setAlerta] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getData = async () => {
            await getUserByUID(cookies.user.uid).then(async (res) => {
                setUser(await res)
                setName(await res.name)
                setNickname(await res.nickname.replace('@', ''))
                setEmail(await res.email)
                setLoading(false)
            })
        }
        getData()
    }, [cookies.user])

    const handleSave = async (e) => {
        if (e.target.files[0]) {
            await uploadImage(e.target.files[0], userLoggedIn);
        } else {
            console.error("Nenhum arquivo selecionado.");
        }
    }
    
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Header title={"Configurações"} />
                    <div className="xl:mx-80 md:my-[20px] m-5">
                        <div className="absolute w-full p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-40 h-40 rounded-full">
                                <Avatar src={userLoggedIn.photoURL} className="w-full z-50 h-full" />
                            </div>
                            {alerta && (
                                <div className="absolute p-5 top-[20%]">
                                    <Alert color="#DF5545">{alerta}</Alert>
                                </div>
                            )}
                            <div className="flex w-full flex-col mt-10 gap-5">
                                {/* <Input onChange={e => {
                                    handleSave(e)
                                }} ref={inputFile} type="file" label="Upar foto" /> */}
                                <Input value={name} onChange={(e) => setName(e.target.value)} size="lg" label="Nome" />
                                <Input value={nickname} onChange={(e) => setNickname(e.target.value)} size="lg" label="Nickname" />
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} size="lg" label="Email" />
                                <Button variant="gradient" size="lg" color="green">Salvar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SettingsPage