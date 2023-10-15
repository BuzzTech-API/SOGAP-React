import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Card,
  CardHeader,
  CardBody,                                      //Importação das Bibliotecas
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Flex,
  IconButton,
  Grid,
  Center,
  useDisclosure,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon,} from "@chakra-ui/icons";
import QRCode from "qrcode.react";
import User from "../models/User";
import { codeVerified, enableTwoFactor } from "../services/token";

export interface UriFormat {
    uriCode: string;
  }

const TwoAuthModal = () => {

    const [verificationCode, setVerificationCode] = useState('');
    const [uriCode, setUriCode] = useState<string>('');
    useEffect(()=> {
        (async () => {
            const data = await enableTwoFactor()
            setTimeout(()=>{
                setUriCode(data.qr_code_image);
            }, 1000); 
        })();    
    }, []);

const handleVerification = async () => {
        const verify_code = await codeVerified(verificationCode)
        if (verify_code == true) {
          alert('Código válido!');
          console.log("OnClose")
        } else {
          alert('Código inválido!');
        }
    };
    
    return (
      <Modal size="lg" isOpen={true} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent >
        <Card bg="#58595B" margin="0">
          <ModalHeader color="#ffffff" textAlign="left"  borderBottom="1px solid #e1e1e1">Autenticação de Dois Fatores (2FA)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <Text mt="20px" sx={{color: '#53C4CD', fontSize: 'lg', fontWeight: 'bold',}} borderBottom="1px solid #e1e1e1">
                Configurando o Google Autenticator
                </Text>
            <Center>   
                <Box style={{ margin: '20px'}}>
                    <ul style={{ textAlign: 'left', listStyleType: 'disc', color: 'white'  }}>
                    <li >
                        <Text color="white">Instale o Google Autenticador (IOS - Android).</Text>
                    </li>
                    <li>
                        <Text color="white">Na aplicação app, selecione o ícone de "+".</Text>
                    </li>
                    <li>
                        <Text color="white">Selecione "Escanear QR Code" e use a câmera do seu telefone celular para escanear o QR Code.</Text>
                    </li>
                    </ul>
                </Box>
            </Center>
                <Text sx={{color: '#53C4CD', fontSize: 'lg', fontWeight: 'bold',}} borderBottom="1px solid #e1e1e1">
                Escaneie o QR Code
                </Text>   
            <Center>
                <Box padding='2rem' bg="white" borderRadius="1rem" mt="4" mb="3">
                <QRCode value={uriCode} size={300} />
                </Box>
            </Center>
            <FormControl>
            <FormLabel>
                <Text sx={{color: '#53C4CD', fontSize: 'lg', fontWeight: 'bold',}} borderBottom="1px solid #e1e1e1">
                Verifique o seu Código
                </Text>
                <Text color="white" sx={{fontSize: 'sm', }}>
                Para confirmar as alterações, por favor verifique o seu código de autenticação:
                </Text>
            </FormLabel>
            
            <Grid templateColumns="1fr 1fr" gap={4}>
             <Input color="white" style={{ width: '100%' }} type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}/>
                <Button bg="#53C4CD" onClick={handleVerification} ml="auto">
                Verificar e Ativar
                </Button>
            </Grid>
            </FormControl>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Card>
        </ModalContent>
      </Modal>
    );
  };

export default TwoAuthModal;