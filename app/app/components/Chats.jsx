import { db } from "../../../app/firebase"
import { Alert, Avatar, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import { collection, orderBy, query } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useCookies } from "react-cookie"
import { useCollection } from "react-firebase-hooks/firestore"
import Nothing from "../../components/Nothing"
import calcularDistancia from '../../actions/location'

const Chats = ({ groupId }) => {
    const router = useRouter()
    const alertRef = collection(db, "alerts")
    const q = query(alertRef, orderBy('createdAt', 'desc'))
    const [alerts] = useCollection(q, {idField: 'id'})
    const [cookies, setCookie] = useCookies(['location'])

    const tipo = {
        "tentativa": "Tentativa de ",
        "suspeita": "Suspeita de ",
        "ocorrendoagora": "Ocorrendo "
    }

    const situacao = {
        "assalto": "Assalto",
        "invasao": "Invasão",
        "furto": "Furto"
    }

    const isInRadiusArea = (alert) => {
        const distancia = calcularDistancia(cookies.location.latitude, cookies.location.longitude, alert.data().author.latitude, alert.data().author.longitude)
        if(distancia.metros <= 300) return true
        return false
    }
    

    return (
        <div className="flex flex-grow flex-col h-full gap-3">
            <List className="gap-4">
                {alerts && alerts.docs.length > 0 ? alerts.docs.map(alert => (
                    <>
                        {isInRadiusArea && (
                        
                            <ListItem key={Math.floor(Math.random() * 9999) + 1000} className="bg-[#FFC9C6] border border-red-800 shadow-md" onClick={() => router.push(`/app/chat/${alert.data().id}`)}>
                                <ListItemPrefix>
                                    <Avatar variant="circular" alt="foto de grupo" src="https://img.freepik.com/fotos-premium/sino-de-notificacao-vermelho-e-ponto-de-exclamacao-em-fundo-vermelho_968898-434.jpg?w=360"  />
                                </ListItemPrefix>
                                <div>
                                    <Typography className="text-[12px] -mb-1" color="red">Alerta #{alert.data().id}</Typography>
                                    <Typography variant="h6" color="red">
                                        {tipo[alert.data().tipo]}{situacao[alert.data().situacao]}
                                    </Typography>
                                    <Typography className="-mt-1 ml-[2px] text-[11px]">
                                        {alert.data().author.street}, {alert.data().author.address_number}. {alert.data().author.city}, {alert.data().author.state}.
                                    </Typography>
                                </div>
                            </ListItem>  
                        )}
                    </>
                )): (
                    <>
                        <Alert color="light-blue">Atualmente não há nenhum alerta emitido em sua vizinhança.</Alert>
                    </>
                )}
            </List>
        </div>
    )
}

export default Chats