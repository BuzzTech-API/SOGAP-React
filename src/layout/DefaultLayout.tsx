
import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router";
import { getUser } from "../services/users";
import NotificationClass from "../models/Notification";
import { refreshTokenFetch } from "../services/token";
import Cookies from "universal-cookie";

type ContextType = { socket: WebSocket | null };

export default function DefaultLayout() {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [notifications, setNotifications] = useState(new Array<NotificationClass>())

    useEffect(() => {
        // Substitua 'seu_host' e 'sua_rota' pelas informações reais do seu servidor WebSocket

        (async () => await refreshTokenFetch())();


        const cookie = new Cookies()
        cookie.remove('access_token')
        cookie.set('access_token', localStorage.getItem('access_token'), { sameSite: 'strict' })

        const socket = new WebSocket(`ws://${window.location.hostname}/notification/ws?access_token=${localStorage.getItem('access_token')}`);

        socket.onopen = () => {
            console.log('Conexão WebSocket aberta.');

        };

        socket.onmessage = (event) => {
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


            setNotifications(notifications.concat(notification))


        }


        socket.onclose = (event) => {
            console.log('Conexão WebSocket fechada:', event);

        };

        setSocket(socket);

        // Certifique-se de fechar a conexão ao desmontar o componente ou quando não for mais necessário.
        return () => {
            socket.close();
        };

    }, []);


    return (
        <Flex flexDirection="column">
            <Header notifications={notifications} setNotifications={setNotifications} socket={socket} />
            <Outlet context={{ socket } satisfies ContextType} />
        </Flex>
    )
}


export function useSocket() {
    return useOutletContext<ContextType>();
}
