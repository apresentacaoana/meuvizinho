'use client'

import { Alert, Button, Card, CardBody, CardHeader, IconButton, Input, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from "@material-tailwind/react"
import { useRef, useState } from "react"
import {MdOutlineMailOutline, MdKey} from 'react-icons/md'
import {FcGoogle} from 'react-icons/fc'
import { entrarComGoogle, loginComEmailESenha, registrarComEmailESenha, verificarSeOEmailJaExiste, verificarSeOUsuarioJaExiste } from "@/app/auth/authentication"
import {TbAlertCircleFilled} from 'react-icons/tb'

const Form = ({ reload, setReload }) => {
    const [type, setType] = useState('signin')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alert, setAlert] = useState('')
    
    const isSignIn = type === 'signin'
    const isNullOrWhiteSpaces = (thing) => {
        if(thing === null || thing.replaceAll(' ', '').length < 1) return true
        return false
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setAlert('')

        console.log(isNullOrWhiteSpaces(name))
        console.log(isNullOrWhiteSpaces(email))
        console.log(isNullOrWhiteSpaces(password))
        console.log(isNullOrWhiteSpaces(confirmPassword))

        if(isNullOrWhiteSpaces(name)
           || isNullOrWhiteSpaces(email)
           || isNullOrWhiteSpaces(password)
           || isNullOrWhiteSpaces(confirmPassword)
        ) {
            setAlert('Você não pode deixar campos vazios.')
            return
        }

        if(password != confirmPassword) {
            setAlert('As senhas precisam ser iguais.')
            return
        }

        if(password.length < 7) {
            setAlert('A senha precisa ter ao menos 7 caracteres.')
            return
        }

        if(name.length < 5) {
            setAlert('O seu nome de usuário precisa ter ao menos 5 caracteres.')
            return
        }
        
        if(await verificarSeOEmailJaExiste(email)) {
            setAlert('Já existe uma conta com esse email')
            return
        }

        await registrarComEmailESenha(name, email, password)
        // await loginComEmailESenha(email, password)
        setReload(reload + 1)

    }

    
    const handleSignIn = async (e) => {
        e.preventDefault()
        setAlert('')

        if(isNullOrWhiteSpaces(email)
           || isNullOrWhiteSpaces(password)
        ) {
            setAlert('Insira suas credenciais.')
            return
        }
        
        if(!await verificarSeOEmailJaExiste(email)) {
            setAlert('Essa conta não existe.')
            return
        }

        await loginComEmailESenha(email, password)
        setReload(reload + 1)

    }

    return (
        
        <div className="w-full flex items-center justify-center lg:w-1/2">



            <div className='h-full md:h-[910px] sm:w-full md:max-w-[700px] sm:px-5 md:px-10 sm:py-[50px] md:py-20 rounded-3xl flex flex-col bg-white border-2 border-gray-100'>

                
                <Tabs value={type} className="overflow-visible w-full flex flex-col">

                    <TabsHeader className="relative z-0 mt-6 md:-mt-5 w-[15rem] md:w-[25rem] left-1/2 -translate-x-1/2">
                        <Tab value="signin" onClick={() => {setType("signin"); setAlert('')}}>
                            Entrar
                        </Tab>
                        <Tab value="signup" onClick={() => {setType("signup"); setAlert('')}}>
                            Cadastrar
                        </Tab>
                    </TabsHeader>

                    <TabsBody
                        className="!overflow-x-hidden !overflow-y-visible"
                        animate={{
                        initial: {
                            x: type === "signin" ? -400 : 400,
                        },
                        mount: {
                            x: 0,
                        },
                        unmount: {
                            x: type === "signup" ? -400 : 400,
                        },
                        }}
                    >
                        {isSignIn ? (
                            <TabPanel value={"signin"} className="!overflow-hidden">
                                {alert && (<Alert className="bg-[#F25C5C] mb-4" icon={<TbAlertCircleFilled size={24} />}>{alert}</Alert>)}
                                
                                <form action="">
                                    <h1 className='text-5xl font-semibold mt-4'>Bem vindo de volta!</h1>
                                    <p className='font-medium text-lg text-gray-500 mt-4'>Insira suas informações.</p>
                                    <div className='mt-8'>
                                        <div className='flex flex-col'>
                                            <label className='text-lg font-medium'>Email</label>
                                            <input 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                                placeholder="Insira seu email"
                                                type="email"/>
                                        </div>
                                        <div className='flex flex-col mt-4'>
                                            <label className='text-lg font-medium'>Senha</label>
                                            <input 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                                placeholder="Insira sua senha"
                                                type={"password"}
                                            />
                                        </div>
                                        <div className='mt-2 flex justify-between items-center'>
                                            <button className='font-medium text-base text-violet-500'>Esqueci a senha</button>
                                        </div>
                                        <div className='mt-2 flex flex-col gap-y-4'>
                                            <button 
                                                onClick={handleSignIn}
                                                className='active:scale-[.98] bg-green-400 active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Entrar</button>
                                            {/* <button 
                                                onClick={entrarComGoogle}
                                                className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 '>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                                        <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                                        <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                                        <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                                                    </svg>
                                                    Entrar com Google
                                            </button> */}
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                        ) : (
                            <TabPanel value={"signup"}>
                            {alert && (<Alert className="bg-[#F25C5C] mb-4" icon={<TbAlertCircleFilled size={24} />}>{alert}</Alert>)}
                            <h1 className='text-5xl font-semibold md:mt-6 sm:-mt-2'>Faça parte da vizinhança!</h1>
                            <p className='font-medium text-lg text-gray-500 mt-4'>Insira suas informações.</p>
                            <div className='mt-8'>
                                <div className="flex flex-col gap-2">
                                    <label className='text-lg font-medium'>Nome Completo</label>
                                    <input 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        placeholder="Insira seu nome"/>
                                </div>
                                <div className='flex flex-col mt-4 gap-2'>
                                    <label className='text-lg font-medium'>Email</label>
                                    <input 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        placeholder="Insira seu email"/>
                                </div>
                                <div className='flex flex-col mt-4 gap-2'>
                                    <label className='text-lg font-medium'>Senha</label>
                                    <input 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        placeholder="Insira sua senha"
                                        type={"password"}
                                    />
                                    <input 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        placeholder="Confirme sua senha"
                                        type={"password"}
                                    />
                                </div>
                                <div className='mt-2 flex justify-between items-center'>
                                    <button className='font-medium text-base text-violet-500 justify-self-end'>Esqueci a senha</button>
                                </div>
                                <div className='mt-2 flex flex-col gap-y-4'>
                                    <button 
                                        onClick={handleSignUp}
                                        className='active:scale-[.98] bg-green-400 active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Criar Conta</button>
                                </div>
                            </div>
                        </TabPanel>
                        )}
                        <button 
                            onClick={entrarComGoogle}
                            className='flex -mt-3 mx-4 w-[95%] items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 '>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                                </svg>
                                Entrar com o Google
                        </button>
                        
                    </TabsBody>

                </Tabs>





                
            </div>

            
        </div>
    )
}

export default Form