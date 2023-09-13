import { Avatar, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation"

const Chats = () => {
    const router = useRouter()
    return (
        <div className="flex flex-grow flex-col h-full gap-3">
            <List>
                <ListItem className="bg-[#FFC9C6] animate-pulse" onClick={() => router.push('/app/chat')}>
                    <ListItemPrefix>
                        <Avatar variant="circular" alt="foto de grupo" src="https://img.freepik.com/fotos-premium/sino-de-notificacao-vermelho-e-ponto-de-exclamacao-em-fundo-vermelho_968898-434.jpg?w=360"  />
                    </ListItemPrefix>
                    <div>
                        <Typography className="text-[12px] -mb-1" color="red">Alerta #4823</Typography>
                        <Typography variant="h6" color="red">
                            Tentativa de Assalto
                        </Typography>
                    </div>
                </ListItem>
            </List>
        </div>
    )
}

export default Chats