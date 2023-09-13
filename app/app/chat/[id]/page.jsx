'use client'
import { getAlertByID } from "@/app/auth/authentication"
import { useEffect, useState } from "react"

const AlertChat = ({ params }) => {
    const [alert, setAlert] = useState({})
    useEffect(() => {
        async function getAlert() {
            const response = await getAlertByID(params.id)
            setAlert(await response)
        }
        getAlert()
        console.log(alert)
    }, [])
    return (
        <div>Ainda em desenvolvimento</div>
    )
}

export default AlertChat