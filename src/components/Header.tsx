import {
    Button,
    Icon,
    Avatar,
    Text,
    Box,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Spacer,
    useDisclosure,
    Checkbox,
    flexbox,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IonicLogo } from './IonicLogo'
import { useEffect, useState } from 'react'
import { getUser } from '../services/users'
import { disable2FA, } from '../services/token'
import { DrawerCadastro } from './Drawer/Cadastro'
import TwoAuthModal from "../components/Modal/QrCodeModal"
import { BellIcon } from '@chakra-ui/icons'
import { useSocket } from '../layout/DefaultLayout'
import NotificationClass from '../models/Notification'


interface PropsH{

    notifications: NotificationClass[]
    setNotifications: React.Dispatch<React.SetStateAction<NotificationClass[]>>
}

export const Header = ({notifications, setNotifications}:PropsH) => {
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [photo_link, setPhoto_link] = useState('')
    const [is_enable2fa, setIs_enable2fa] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    useEffect(() => {
        (async () => {
            const data = await getUser()
            if (data) {
                setName(data.name)
                setRole(data.role)
                setIs_enable2fa(data.is_2fa_enable)
                setPhoto_link(data.photo_link)
            }

        })();



    }, [])


    
    const deactivated2FA = async () => {
        const data = await disable2FA()
        if (data.deactivated === true) {
            setIs_enable2fa(false)
        }
    }

    function handleCheckboxClick(event: { stopPropagation: () => void }) {
        // Evitar o fechamento do MenuList quando o Checkbox é clicado.
        event.stopPropagation()
        }


    return (

        <Flex
            flexDirection={'row'}
            padding='0rem'
            width={["120rem", "100%"]}
            maxWidth="100%"
            height='5rem'
            background="#292A2D"
            boxShadow={'0 4px 4px 0 rgba(0,0,0,0.25)'}
            alignItems={'center'}
        >
            <Flex
                flexDirection={'row'}
                padding='0.5rem'
                background="#292A2D"
                alignItems={'center'}
            >
                <Menu>
                    <MenuButton
                        as={Button}
                        size="lg"
                        bg={'#292A2D'}
                        width="3.5rem"
                        height="3.5rem"
                        marginRight={['0.5rem', '2rem']}
                        marginTop={'0.2rem'}
                        padding={'0.5rem 0.5rem 0rem 0.7rem'}
                        leftIcon={
                            <Icon
                                width={'2.5rem'}
                                height={'2.5rem'}
                                margin={'0'}
                                padding={'0'}

                            >
                                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.875 2.1875C0.875 1.5144 1.42065 0.96875 2.09375 0.96875H28.9062C29.5793 0.96875 30.125 1.5144 30.125 2.1875C30.125 2.8606 29.5793 3.40625 28.9062 3.40625H2.09375C1.42065 3.40625 0.875 2.8606 0.875 2.1875ZM0.875 9.5C0.875 8.8269 1.42065 8.28125 2.09375 8.28125H28.9062C29.5793 8.28125 30.125 8.8269 30.125 9.5C30.125 10.1731 29.5793 10.7188 28.9062 10.7188H2.09375C1.42065 10.7188 0.875 10.1731 0.875 9.5ZM0.875 16.8125C0.875 16.1394 1.42065 15.5938 2.09375 15.5938H28.9062C29.5793 15.5938 30.125 16.1394 30.125 16.8125C30.125 17.4856 29.5793 18.0312 28.9062 18.0312H2.09375C1.42065 18.0312 0.875 17.4856 0.875 16.8125Z" fill="white" />
                                </svg>
                            </Icon>
                        } >
                    </MenuButton>
                    <MenuList
                        color={'#FFF'} bg={'#58595B'} padding={'1rem'}>
                        {role === 'Administrador' && <DrawerCadastro />
                            }
                        <Link to={'/'}>
                            <MenuItem
                                bg={'#58595B'}
                                color={'#FFF'}
                                width={'100%'}
                                _hover={{ background: '#FFF', color: '#58595B' }}
                                as={Button}
                            >
                                Meus Processos
                            </MenuItem>
                        </Link>
                        <MenuItem
                            as={Button}
                            bg={'#58595B'}
                            color={'#FFF'}
                            width={'100%'}
                            _hover={{ background: '#FFF', color: '#58595B' }}
                            onClick={() => {
                                localStorage.removeItem('access_token')
                                localStorage.removeItem('refresh_token')
                                window.location.reload();
                            }}
                        >
                            Sair
                        </MenuItem>

                    </MenuList>
                </Menu>
                <Link to={'/'}>
                    <IonicLogo />
                </Link>
            </Flex>
            <Spacer />
            <Menu onClose={() => {}} closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    bg="transparent"
                    size="lg"
                    width="3.5rem"
                    height="3.5rem"
                    marginRight={['0', '0', '2rem']}
                    marginTop={'0.2rem'}
                    marginLeft={['1rem', '0']}
                    padding={'0.5rem 1rem 0.7rem 0.5rem'}
                    rightIcon={<BellIcon
                        width={'2.5rem'}
                        height={'2.5rem'}
                        margin={'0'}
                        padding={'0'}
                        color={"#FFFFFF"}
                    /> } 
                    >
                    </MenuButton>
                    <MenuList
                        bg={'#58595B'}
                        w={'20rem'}
                    >
                        <Box bg={'#58595B'} width={'19rem'}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Text fontWeight="semibold" fontSize="18px" marginLeft={'0.5rem'}>Notificações</Text>
                            <Text fontWeight="semibold" fontSize="14px" marginRight={'0.5rem'} textAlign="right">Marcar<br />como lida</Text>
                            </Box>
                            {notifications.map((notification) => (
                                <MenuItem key={notification.id} bg={'#58595B'} color={'#FFFFFF'} w={'18rem'} h={'5rem'} overflowY={'auto'}>
                                {notification.mensage}<Checkbox onClick={handleCheckboxClick} marginLeft={'4.5rem'}></Checkbox></MenuItem>
                            ))}
                        </Box>
                    </MenuList>
                </Menu>
            <Flex
                flexDirection={'row'}
                width={['4rem', '4rem', "15rem"]}
                marginLeft={0}
            >
                <Box flexDirection={'column'}
                    marginRight={['0', '0.2rem']}
                    display={['none', 'none', 'flex']}
                >

                    <Text
                        fontFamily="Inter"
                        lineHeight="1.56"
                        fontWeight="semibold"
                        fontSize="18px"
                        color="#FFFFFF"
                        textAlign="center"
                    >
                        {name}
                    </Text>
                    <Text
                        fontFamily="Inter"
                        lineHeight="1.56"
                        fontWeight="semibold"
                        fontSize="18px"
                        color="#FFFFFF"
                        textAlign="center"
                    >
                        {role}
                    </Text>
                </Box>
                <Menu>
                    <MenuButton
                        width={['2.5rem', "3.5rem"]}
                        height={['2.5rem', "3.5rem"]}
                        display={['none', 'inherit']}
                    >
                        <Avatar
                            name={name}
                            src={photo_link}
                            size="xs"
                            width={['2.5rem', "3.5rem"]}
                            height={['2.5rem', "3.5rem"]}
                            marginLeft={'0.5rem'}

                        >
                        </Avatar>
                    </MenuButton>
                    <MenuList
                        color={'#FFF'}
                        bg={'#58595B'}
                        padding={'1rem'}
                    >
                        {is_enable2fa === true ?
                            <MenuItem as={Button} bg={'#58595B'}
                                color={'#FFF'}
                                width={'100%'}
                                _hover={{ background: '#FFF', color: '#58595B' }}
                                onClick={deactivated2FA}
                            >Desativar Autenticação 2 Fatores</MenuItem> :
                            <MenuItem
                                as={Button}
                                onClick={onOpen}
                                bg={'#58595B'}
                                color={'#FFF'}
                                width={'100%'}
                                _hover={{ background: '#FFF', color: '#58595B' }}
                            >Ativar Autenticação 2 Fatores</MenuItem>}
                        <TwoAuthModal isOpen={isOpen} onClose={onClose} setIs_enable2fa={setIs_enable2fa} />
                    </MenuList>
                </Menu>

            </Flex>
        </Flex>
    )

}