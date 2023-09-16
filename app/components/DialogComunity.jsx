import { Button, Dialog, DialogBody, DialogFooter, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

const DialogComunity = ({ open, handler }) => {
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    return (
        <div>
            
            <Dialog className={"bg-[#fff] text-black"} open={open} handler={handler}>
                <div className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                        <Typography variant="h4" color="black" className="text-center text-black"> 
                            Criar Comunidade
                        </Typography>
                    </div>
                    <AiOutlineClose size={25} onClick={handler} />
                </div>
                <DialogBody>
                    <div className="mt-2" />
                    <Typography className='text-black'>Como se chama?</Typography>
                    <Input value={nome} onChange={(e) => setNome(e.target.value)} type="text" label="relato" />
                    <div className="mt-2" />
                    <Typography className='text-black'>Onde se localiza?</Typography>
                    <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} type="text" label="relato" />
                </DialogBody>
                <DialogFooter>
                    <Button onClick={handleCreate} variant="filled">
                        Criar
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default DialogComunity