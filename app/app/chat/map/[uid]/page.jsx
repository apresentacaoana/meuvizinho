'use client'
import { useEffect, useRef, useState } from 'react'
import Header from '../../../../components/Header'
import {getUserByUID} from '../../../../auth/authentication'
import * as tt from '@tomtom-international/web-sdk-maps'
import "@tomtom-international/web-sdk-maps/dist/maps.css"
import Loading from '../../../../components/Loading'

const Map = ({ params }) => {
    
    const mapElement = useRef()
    const [userLoggedIn, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [map2, setMap] = useState({})

    useEffect(() => {
        const getMap = (user) => {
            let map = tt.map({
                key: "ld6uaAGvyo88qEHNzWbo2AFppm15Oe2A",
                container: mapElement.current.id,
                center: {lng: user.longitude, lat: user.latitude},
                zoom: 17,
                language: "pt-BR"
            })

            setMap(map)
            
        const popup = new tt.Popup().setText("Estado de Alerta").addTo(map)

            const marker = new tt.Marker({
                draggable: false
            }).setLngLat({lng: user.longitude, lat: user.latitude}).setPopup(popup).addTo(map)




            console.log(user.longitude, user.latitude)


            return () => map.remove()
        }
        const getUser = async () => {
            await getUserByUID(params.uid).then((res) => {
                console.log(res)
                setLoading(false)
                setUser(res)
                getMap(res)
            })
        }
        getUser()

    }, [])
    
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Header title={"Localização"} />
                </>
            )}
            <div id='div' ref={mapElement} className='h-screen w-full' />
        </div>
    )
}

export default Map