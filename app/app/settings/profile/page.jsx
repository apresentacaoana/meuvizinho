'use client'
import { useCookies } from "react-cookie"
import Header from "../../../components/Header"
import Loading from "../../../components/Loading"
import { useEffect, useRef, useState } from "react"
import { getUserByUID, updateUser, verificarNickname } from "../../../auth/authentication"
import { Alert, Avatar, Button, Input, Option, Select } from "@material-tailwind/react"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { app } from "../../../firebase"
import { DropzoneArea } from 'material-ui-dropzone'
import { BiSolidUserCircle } from "react-icons/bi"

const SettingsPage = () => {
    const [cookies, setCookie] = useCookies(["user", "isAuth"])
    const [userLoggedIn, setUser] = useState({})
    const inputFile = useRef(null)
    const [nickname, setNickname] = useState('')
    const [name, setName] = useState('')
    const [alerta, setAlerta] = useState('')
    const [genero, setGenero] = useState('')
    const [nacionalidade, setNacionalidade] = useState('')
    const [dataDeNascimento, setDataDeNascimento] = useState('')
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(0)
    const [files, setFiles] = useState([])


    useEffect(() => {
        const getData = async () => {
            await getUserByUID(cookies.user.uid).then(async (res) => {
                setUser(await res)
                setName(await res.name)
                console.log(res.photoURL, "useEffects")
                setNickname(await res.nickname.replace('@', ''))
                setGenero(await res.gender),
                setNacionalidade(await res.nacionality)
                setDataDeNascimento(await res.birthofday)
                setLoading(false)
            })
        }
        getData()
    }, [reload])

    let handleChange = (e) => {
        let regex = /^[a-zA-Z0-9]*$/
        if(regex.test(e.target.value)) setNickname(e.target.value)
    }

    const handleSave = async () => {
        setAlerta('')
        if(!name || !nickname) return setAlerta("Não pode conter campos vazios")
        if(await verificarNickname("@" + nickname) && userLoggedIn.nickname == nickname) return setAlerta("Este @ não está disponível")
        if (files.length > 0) {
          try {
            const storage = getStorage(app); // Obtenha a referência do armazenamento
            const filename = `/profiles/${userLoggedIn.uid}/photo.jpg`;
            const storageRef = ref(storage, filename);
            await uploadBytes(storageRef, files[0]);
    
            const photoURL = await getDownloadURL(storageRef);
            await updateUser(userLoggedIn, {
                photoURL,
                name,
                nickname: nickname.toLowerCase(),
                nacionality: nacionalidade,
                birthofday: dataDeNascimento,
                gender: genero.toLowerCase()
            })
            setReload(reload + 1)
          } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            setAlerta("Erro ao fazer upload da imagem.");
          }
        } else {
            await updateUser(userLoggedIn, {
                name,
                nickname: nickname.toLowerCase(),
                nacionality: nacionalidade,
                birthofday: dataDeNascimento,
                gender: genero.toLowerCase()
            })
            setReload(reload + 1)
        }
      };
    
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Header title={`${userLoggedIn.nickname}`} />
                    <div className="xl:mx-80 md:my-[70px] m-5 mt-[7rem]  flex flex-col justify-center items-center">
                        <div className="p-5 w-full flex flex-col items-center">
                            <div className="w-40 h-40 rounded-full">
                                {userLoggedIn.photoURL != "" ? (
                                    <Avatar src={userLoggedIn.photoURL} className="w-full z-50 h-full" />

                                ) : (
                                    <BiSolidUserCircle size={160} />
                                )} 
                            </div>
                            {alerta && (
                                <div className="fixed z-[999] p-5 top-[8%]">
                                    <Alert className="bg-[#DF5545]">{alerta}</Alert>
                                </div>
                            )}
                            <div className="flex w-full flex-col mt-10 gap-5">
                                <div className="">
                                <DropzoneArea 
                                    filesLimit={1}
                                    showAlerts={false}
                                    dropzoneText="Escolha sua foto de perfil"
                                    acceptedFiles={['image/*']}
                                    dropzoneClass="p-5 border-blue-500"
                                    showPreviewsInDropzone={false}
                                    onChange={(files) => {
                                        setFiles(files)
                                        handleSave()
                                    }}

                                />
                                </div>
                                <Input value={name} onChange={(e) => setName(e.target.value)} size="lg" label="Nome" />
                                <Input value={nickname} onChange={handleChange} size="lg" label="Identificador" />
                                <Select value={genero} label="Qual o seu gênero?" onChange={(e) => setGenero(e)}>
                                    <Option value="male">Masculino</Option>
                                    <Option value="famela">Feminino</Option>
                                    <Option value="nonbinary">Não Binário</Option>
                                </Select>
                                <Input value={nacionalidade} onChange={(e) => setNacionalidade(e.target.value)} size="lg" label="Nacionalidade" />
                                <Input value={dataDeNascimento} onChange={(e) => setDataDeNascimento(e.target.value)} size="lg" label="Data de Nascimento" />
                                <Button onClick={handleSave} variant="gradient" size="lg" color="green">Salvar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SettingsPage