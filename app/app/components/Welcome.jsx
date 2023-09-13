'use client'
import { Typography } from "@material-tailwind/react"

const Welcome = ({ user }) => {
    return (
        <Typography className='mt-3 mb-3 w-full' variant='h4'>
            Olá, {user.name}.
        </Typography>
    )
}

export default Welcome