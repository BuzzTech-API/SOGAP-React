import {
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Box,
    Card,
    FormControl,
    FormLabel,
    Center,
    Heading,
    Select,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Stack,
    useDisclosure

} from '@chakra-ui/react'
import { useState } from "react";
import { refreshTokenFetch } from "../../services/token";
import { createUser } from '../../services/users';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';


export function DrawerCadastro() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [team, setTeam] = useState('')
    const [senha, setSenha] = useState('')

    const handleClick = () => setShow(!show)
    const submit = async (e: any) => {
        e.preventDefault();
        await refreshTokenFetch()

        try {
            console.log(

                await createUser(name, email, role, team, senha)
            );
        } catch (error) {

        } finally {
            onClose()
        }

    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value)

    }


    return (
        <><Center width={'100%'}>
            <Button bg={'#58595B'} _hover={{ background: '#FFF', color: '#58595B' }} color={'#FFF'} onClick={onOpen} width={'100%'}>
                Cadastrar Usuário
            </Button>
        </Center>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={'lg'}
            >
                <DrawerOverlay />
                <DrawerContent bg={'#58595B'} textColor={'white'}>
                    <DrawerCloseButton />
                    <form onSubmit={submit}>
                        <DrawerHeader borderBottomWidth='1px'>
                            Criar novo Usuário
                        </DrawerHeader>

                        <DrawerBody>
                            <Stack spacing='24px'>
                                <Center padding='2rem'>
                                    <Heading>Cadatrar Usuário</Heading>
                                </Center>
                                <Box width={'30rem'} height={'30rem'} margin={'1rem auto'} padding={'1rem'}>

                                    <FormControl margin={'1rem'}>
                                        <FormLabel textAlign={'center'}>Nome</FormLabel>
                                        <Input
                                            type='text'
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl margin={'1rem'}>
                                        <FormLabel textAlign={'center'}>Email</FormLabel>
                                        <Input
                                            type='email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl margin={'1rem auto'} paddingLeft={'1rem'} width='28rem'>
                                        <FormLabel textAlign={'center'}>Senha</FormLabel>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='8.5rem'
                                                value={senha}
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                onChange={e => setSenha(e.target.value)}
                                            />
                                            <InputRightElement width='5.5rem'>
                                                <Button textColor={'white'} backgroundColor={'#53C4CD'} h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl margin={'1rem'}>
                                        <FormLabel textAlign={'center'}>Cargo</FormLabel>
                                        <Select
                                            value={role}
                                            onChange={handleSelectChange}>
                                            <option value="Gerente">Gerente</option>
                                            <option value="Lider">Lider</option>
                                            <option value="Colaborador">Colaborador</option>
                                            <option value="C-Level">C-Level</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl margin={'1rem'}>
                                        <FormLabel textAlign={'center'}>Equipe</FormLabel>
                                        <Input
                                            value={team}
                                            type='text'
                                            onChange={e => setTeam(e.target.value)}
                                        />
                                    </FormControl>

                                </Box>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter borderTopWidth='1px' display={'flex'} justifyContent={'center'}>
                            <Button bg={'red'} textColor={'white'} mr={3} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button bg={'#53C4CD'} textColor={'white'} type='submit'>Cadastrar</Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    )
}


export const Cadastro = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [team, setTeam] = useState('')
    const [senha, setSenha] = useState('')

    const handleClick = () => setShow(!show)
    const submit = async (e: any) => {
        e.preventDefault();
        await refreshTokenFetch()

        try {
            console.log(

                await createUser(name, email, role, team, senha)
            );
        } catch (error) {

        } finally {

        }

    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value)

    }


    return <Card backgroundColor={'#58595B'} margin={'5rem auto'} textColor={'white'} width='50rem' height={'50rem'}>

        <form onSubmit={submit}>
            <Center padding='2rem'>
                <Heading>Cadatrar Usuário</Heading>
            </Center>
            <Box width={'30rem'} height={'30rem'} margin={'1rem auto'} padding={'1rem'}>

                <FormControl margin={'1rem'}>
                    <FormLabel textAlign={'center'}>Nome</FormLabel>
                    <Input
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl margin={'1rem'}>
                    <FormLabel textAlign={'center'}>Email</FormLabel>
                    <Input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl margin={'1rem auto'} paddingLeft={'1rem'} width='28rem'>
                    <FormLabel textAlign={'center'}>Senha</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='8.5rem'
                            value={senha}
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            onChange={e => setSenha(e.target.value)}
                        />
                        <InputRightElement width='5.5rem'>
                            <Button textColor={'white'} backgroundColor={'#4fb3bb'} h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl margin={'1rem'}>
                    <FormLabel textAlign={'center'}>Cargo</FormLabel>
                    <Select
                        value={role}
                        onChange={handleSelectChange}>
                        <option value="Gerente">Gerente</option>
                        <option value="Lider">Lider</option>
                        <option value="Colaborador">Colaborador</option>
                        <option value="C-Level">C-Level</option>
                    </Select>
                </FormControl>
                <FormControl margin={'1rem'}>
                    <FormLabel textAlign={'center'}>Equipe</FormLabel>
                    <Input
                        value={team}
                        type='text'
                        onChange={e => setTeam(e.target.value)}
                    />
                </FormControl>
                <Center>
                    <Button type='submit' textColor={'white'} backgroundColor={'#4fb3bb'}>Cadastrar</Button>
                </Center>
            </Box>
        </form>
    </Card>
}