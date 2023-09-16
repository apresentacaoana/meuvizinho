import { Typography } from "@material-tailwind/react"
import Image from "next/image"

const Nothing = () => {
    return (
        <div className="">
            <div className="absolute flex w-[80%] flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image src={"/assets/images/nothing.svg"} alt="Nada por aqui" width={850} height={718} />
                <Typography className="text-center" variant="h3">Nada por aqui...</Typography>
            </div>
        </div>
    )
}

export default Nothing