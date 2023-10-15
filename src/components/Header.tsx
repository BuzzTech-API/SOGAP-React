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
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { IonicLogo } from './IonicLogo'
import { useEffect, useState } from 'react'
import { getUser } from '../services/users'
import { verifyTokenFetch } from '../services/token'
import { DrawerCadastro } from './Drawer/Cadastro'



export const Header = () => {

    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [is_enable2fa, setIs_enable2fa] = useState(false)

    useEffect(() => {
        (async () => {
            verifyTokenFetch()
            const data = await getUser()
            if (data) {
                setName(data.name)
                setRole(data.role)
                setIs_enable2fa(data.is_2fa_enable)
            }

        })();



    }, [])


    return (

        <Flex
            flexDirection={'row'}
            padding='0rem'
            width="120rem"
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

            >
                <Menu>
                    <MenuButton
                        as={Button}
                        size="lg"
                        bg={'#292A2D'}
                        width="3.5rem"
                        height="3.5rem"
                        marginRight={'2rem'}
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
                    <MenuList color={'#FFF'} bg={'#58595B'}>
                        <MenuItem bg={'#58595B'}><DrawerCadastro /></MenuItem>
                        <Link to={'/'}>
                            <MenuItem bg={'#58595B'}>
                                <Button
                                    bg={'#58595B'}
                                    color={'#FFF'}
                                    width={'100%'}
                                    _hover={{ background: '#FFF', color: '#58595B' }}
                                >Meus Processos</Button>
                            </MenuItem>
                        </Link>
                        <MenuItem bg={'#58595B'}>
                            <Button
                                bg={'#58595B'}
                                color={'#FFF'}
                                width={'100%'}
                                _hover={{ background: '#FFF', color: '#58595B' }}
                            >Sair</Button>
                        </MenuItem>

                    </MenuList>
                </Menu>
                <Link to={'/'}>
                    <IonicLogo />
                </Link>
            </Flex>
            <Spacer />
            <Flex
                flexDirection={'row'}
                width="15rem"
                marginLeft={0}
            >
                <Box flexDirection={'column'}
                    marginRight={'0.2rem'}
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
                    <MenuButton>
                        <Avatar
                            name=""
                            src="https://i.pinimg.com/originals/10/7a/97/107a97ca5bd4a571edcebec54a66fc32.jpg"
                            size="xs"
                            width="3.5rem"
                            height="3.5rem"
                            marginLeft={'1rem'}
                        >
                        </Avatar>
                    </MenuButton>
                    <MenuList>
                        {is_enable2fa ===true ? 
                        <MenuItem as='a' href='#'>Link 1</MenuItem> : 
                        <MenuItem as='a' href='#'>Link 2</MenuItem>}
                        
                        
                    </MenuList>
                </Menu>

            </Flex>
        </Flex>
    )

}