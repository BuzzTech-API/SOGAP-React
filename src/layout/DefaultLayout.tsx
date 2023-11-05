
import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router";
import { getUser } from "../services/users";
import NotificationClass from "../models/Notification";
import { refreshTokenFetch } from "../services/token";

type ContextType = { socket: WebSocket | null };

export default function DefaultLayout() {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [notifications, setNotifications] = useState(new Array<NotificationClass>())

    useEffect(() => {
        // Substitua 'seu_host' e 'sua_rota' pelas informações reais do seu servidor WebSocket
        try{
            (async ()=>await refreshTokenFetch())();

        }finally{

            const socket = new WebSocket(`ws://${window.location.hostname}/notification/ws`);
            
            socket.onopen = () => {
                console.log('Conexão WebSocket aberta.');
                
            };
            
            socket.onmessage =(event)=>{
                const data = JSON.parse(event.data)
                const notification = new NotificationClass(
                    data.notification.id,
                data.notification.typeOfEvent,
                data.notification.title,
                data.notification.mensage,
                data.notification.addressed,
                data.notification.sender,
                data.notification.is_visualized
                )
                
                notifications.push(notification)
                setNotifications(notifications)
                
            }
            
            
            socket.onclose = (event) => {
                console.log('Conexão WebSocket fechada:', event);
                
            };
            
            setSocket(socket);
            
            // Certifique-se de fechar a conexão ao desmontar o componente ou quando não for mais necessário.
            return () => {
                socket.close();
            };
        }
    }, []);


    return (
        <Flex flexDirection="column">
            <Header notifications={notifications} setNotifications={setNotifications} />
            <Outlet context={{ socket } satisfies ContextType} />
        </Flex>
    )
}


export function useSocket() {
    return useOutletContext<ContextType>();
}
