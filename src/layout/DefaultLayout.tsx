
import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"
import { useOutletContext } from "react-router";
import { getUser } from "../services/users";
import NotificationClass from "../models/Notification";
import { refreshTokenFetch } from "../services/token";
import Cookies from "universal-cookie";

type ContextType = { socket: WebSocket | null 
    notifications: NotificationClass[]
    setNotifications: React.Dispatch<React.SetStateAction<NotificationClass[]>>
};

export default function DefaultLayout() {

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [notifications, setNotifications] = useState(new Array<NotificationClass>())



    return (
        <Flex flexDirection="column">
            <Header notifications={notifications} setNotifications={setNotifications} socket={socket} setSocket={setSocket} />
            <Outlet context={{ socket, notifications, setNotifications } satisfies ContextType} />
        </Flex>
    )
}


export function useSocket() {
    return useOutletContext<ContextType>();
}
export function useNotifications() {
    return useOutletContext<ContextType>();
}
