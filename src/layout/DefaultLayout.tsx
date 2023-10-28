
import { Flex } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { useEffect, useState } from "react"

function DefaultLayout() {

    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        // Substitua 'seu_host' e 'sua_rota' pelas informações reais do seu servidor WebSocket
        const socket = new WebSocket(`ws://${window.location.hostname}/notification/ws`, );

        socket.onopen = () => {
            console.log('Conexão WebSocket aberta.');
            
        };

        socket.onmessage = (event) => {           
            console.log('Mensagem recebida:', event.data);

            
            // Faça o que for necessário com a mensagem recebida do servidor WebSocket
        };

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
            <Header />
            <Outlet />
        </Flex>
    )
}

export default DefaultLayout