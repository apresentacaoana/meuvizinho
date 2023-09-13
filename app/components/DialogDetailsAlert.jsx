import { Button, Dialog, DialogBody, DialogFooter, Option, Select, Textarea, Typography } from "@material-tailwind/react"
import { AiOutlineClose } from "react-icons/ai"

const DialogDetailsAlert = ({ id }) => {
    
    return (
        <div>
            
            <Dialog className={"bg-[#fff] text-black"} open={open} handler={handler}>
                <div className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                        <Typography variant="small">
                            Alerta #4923 - Tentativa de Furto
                        </Typography>
                        <Typography variant="h4" color="black" className="text-center text-black"> 
                            Relatório
                        </Typography>
                    </div>
                    <AiOutlineClose size={25} onClick={handler} />
                </div>
                <DialogBody>
                    <div className="mt-2" />
                    <Typography className='text-black'>O que ocorreu?</Typography>
                    <Textarea label="relato" />
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleEmit} variant="filled">
                        Enviar
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default DialogDetailsAlert