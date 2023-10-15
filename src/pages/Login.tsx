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
    useDisclosure

} from '@chakra-ui/react'
import { useState } from "react";
import { loginToken, verifyCode } from "./../services/token";
import { Navigate } from 'react-router-dom';
import { ModalGeneric } from '../components/Modal/Modal';

// const QRCodeGenerator: React.FC = () => {
//   const [text, setText] = useState<string>(''); // O texto que você deseja codificar

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Insira o texto para gerar o QR Code"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       {text && <QRCode value={text} size={300} />}
//     </div>
//   );
// };

export const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [is_enable, setIs_enable] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [refresh_token, setRefresh_token] = useState(localStorage.getItem('refresh_token'))
    const handleClick = () => setShow(!show)
    const submit = async (e: any) => {
        e.preventDefault();

        try {
            const is_enable = await loginToken(email, senha)
            if(is_enable === false){
                setIs_enable(true)
                onOpen()
            }else{
                setToken(localStorage.getItem('access_token'))
                setRefresh_token(localStorage.getItem('refresh_token'))
            }
            } catch (error) {
            
            }
    }
    
    const submitVerification =async (e:any) => {
        e.preventDefault()
    
        try {
            await verifyCode(verificationCode)
        } catch (error) {
            
        } finally{
            setToken(localStorage.getItem('access_token'))
            setRefresh_token(localStorage.getItem('refresh_token'))
        }
    }

    return <Card backgroundColor={'#58595B'} margin={'10rem auto'} textColor={'white'} width='40rem'>
        {token && (
          <Navigate to="/" replace={true} />
        )}
        {refresh_token && (
          <Navigate to="/" replace={true} />
        )}
        <form onSubmit={submit}>
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
        {is_enable && (<ModalGeneric isOpen={isOpen} onClose={onClose} >
            <form onSubmit={submitVerification}>
            <Box width={'30rem'} height={'30rem'} margin={'1rem auto'} justifyContent={'center'} padding={'1rem'}>
                <Center>
                    <FormControl margin={'1rem'}>
                        <FormLabel textAlign={'center'}>Digite o Código de Autenticação</FormLabel>
                        <Input
                            type='text'
                            value={verificationCode}
                            onChange={e => setVerificationCode(e.target.value)}
                        />
                    </FormControl>
                </Center>
                <Center>
                    <Button type='submit' textColor={'white'} backgroundColor={'#4fb3bb'}>Logar</Button>
                </Center>
            </Box>
            </form>
        </ModalGeneric>)}
    </Card>
}