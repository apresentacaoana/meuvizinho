import { Avatar, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import { useRouter } from "next/navigation"

const Chats = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col flex-grow h-full gap-3">
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
                        {/* <Typography variant="small" color="gray" className="font-normal">
                            <span className="font-bold">@juniorrocha2:</span> Gente o que aconteceu?
                        </Typography> */}
                    </div>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Avatar variant="circular" alt="foto de grupo" src="https://random.imagecdn.app/400/400"  />
                    </ListItemPrefix>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Carla Andrade
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Eae como vai?
                        </Typography>
                    </div>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Avatar variant="circular" alt="foto de grupo" src="https://random.imagecdn.app/250/250"  />
                    </ListItemPrefix>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Carla Andrade
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Eae como vai?
                        </Typography>
                    </div>
                </ListItem>
            </List>
        </div>
    )
}

export default Chats