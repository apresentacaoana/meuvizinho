'use client'
import { Button, Input, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import Header from "../../../components/Header"
import { BsFillHouseFill, BsSearch } from "react-icons/bs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getComunities, getComunityBySearch } from "../../../auth/authentication"
import Loading from "../../../components/Loading"
import Nothing from '../../../components/Nothing'

const FindPage = () => {
    const [search, setSearch] = useState('')
    const [comunities, setComunities] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let response = await getComunities()
        setComunities(await response)
        console.log(response)
        setLoading(false)
    }

    const handleSearch = async () => {
        console.log(search)
        let searchValue = " " + search
        if(!searchValue) return getData()
        const response = await getComunityBySearch(searchValue)
        setComunities(await response)
        console.log(response)
    }


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Header title={"Procurar Vizinhanças"} />
                    {
                        comunities ? (
                            <div className="xl:mx-80 md:my-[20px]">   
                                <div className="relative mt-20 flex  m-2">
                                <Input
                                    type="text"
                                    label="Informe o nome da comunidade"
                                    onChange={e => {setSearch(e.target.value)}}
                                    value={search}
                                    className="pr-20"
                                    size="lg"
                                    containerProps={{
                                        className: "min-w-0",
                                    }}
                                />
                                <Button
                                    size="sm"
                                    color={search ? "gray" : "blue-gray"}
                                    disabled={!search}
                                    onClick={handleSearch}
                                    className="!absolute right-1 top-[8px] rounded"
                                >
                                    <BsSearch />
                                </Button>
                                </div>
                                <List className="gap-3">
                                    <Typography variant="h4">Vizinhanças disponíveis</Typography>
                                    {comunities.map((comunity) => (
                                        <ListItem key={comunity.id} onClick={() => router.push(`/app/comunity/${comunity.id}`)} className="border border-blue-gray-500 shadow-md">
                                            <ListItemPrefix>
                                                <BsFillHouseFill color="#96FF81" size={30} />
                                            </ListItemPrefix>
                                            <Typography>
                                                {comunity.name}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        ) : (
                            <div className="xl:mx-80 md:my-[20px]">
                                <div className="relative mt-20 flex  m-2">
                                <Input
                                    type="text"
                                    label="Informe o nome da comunidade"
                                    value={search}
                                    onChange={e => {setSearch(e.target.value)}}
                                    className="pr-20"
                                    size="lg"
                                    containerProps={{
                                    className: "min-w-0",
                                    }}
                                />
                                <Button
                                    size="sm"
                                    color={search ? "gray" : "blue-gray"}
                                    disabled={!search}
                                    onClick={handleSearch}
                                    className="!absolute right-1 top-[8px] rounded"
                                >
                                    <BsSearch />
                                </Button>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default FindPage