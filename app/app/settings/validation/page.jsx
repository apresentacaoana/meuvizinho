'use client'
import { useState } from "react"
import Header from "../../../components/Header"
import Footer from "./components/Footer"

const ValidationPage = () => {
    const [page, setPage] = useState(0)
    return (
        <div>
            <Header title={`Validação`} />
            <div className="xl:mx-80 md:my-[20px]">
                <div className="mt-[5rem]">
                {
                    page === 0 && (
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-4xl font-bold">Validação</h1>
                            <p className="text-gray-500 text-lg">
                                Você pode validar seu cadastro clicando no botão abaixo.
                            </p>
                        </div>
                    )
                }
                {
                    page === 1 && (
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-4xl font-bold">Validação 2</h1>
                            <p className="text-gray-500 text-lg">
                                Você pode validar seu cadastro clicando no botão abaixo.
                            </p>
                        </div>
                    )
                }
                { page === 2 && (
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-4xl font-bold">Validação 3</h1>
                        <p className="text-gray-500 text-lg">
                            Você pode validar seu cadastro clicando no botão abaixo.
                        </p>
                    </div>
                )}
                </div>
                <Footer setPage={setPage} page={page} />
            </div>
        </div>
    )
}

export default ValidationPage