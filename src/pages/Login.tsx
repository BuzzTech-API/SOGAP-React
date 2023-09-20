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
    Heading

} from '@chakra-ui/react'
import { useState } from "react";
import { loginToken } from "./../services/token";

export const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const handleClick = () => setShow(!show)

    const submit = async (e: any) => {
        e.preventDefault();

        loginToken(email, senha)

    }

    return <Card backgroundColor={'#58595B'} margin={'10rem auto'} textColor={'white'} width='40rem'>
        <form onSubmit={submit}>
            <Center padding='2rem'>
                <Heading>Login</Heading>
            </Center>
            <Box width={'30rem'} height={'30rem'} margin={'1rem auto'} padding={'1rem'}>
                <Center>

                <FormControl margin={'1rem'}>
                    <FormLabel textAlign={'center'}>Email</FormLabel>
                    <Input
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        />
                </FormControl>
                </Center>
                <FormControl margin={'1rem auto'} width='26rem'>
                    <FormLabel textAlign={'center'}>Senha</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='8.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            onChange={e => setSenha(e.target.value)}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button textColor={'white'} backgroundColor={'#4fb3bb'} h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Center>
                    <Button type='submit' textColor={'white'} backgroundColor={'#4fb3bb'}>Logar</Button>
                </Center>
            </Box>
        </form>
    </Card>
}