
import { useDisclosure, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import React from "react";
import { ModalGeneric } from "./Modal";

export const ModalSolicitaEvidencia = () =>{
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        
            <>
            <Button bg='#53C4CD' onClick={onOpen} colorScheme="dark" variant='solid' color='dark'>Pedir evidência</Button>
                <ModalGeneric isOpen={isOpen} onClose={onClose}>
            <FormLabel textAlign="center" fontSize="large" color='white'><strong>Solicitação de evidência</strong></FormLabel>
                <FormLabel pt={3} color='white'>Documento requerido</FormLabel>
                <Input bg='white' placeholder='Digite o documento requerido' size='md' />

                <FormLabel pt={3} color='white'>Descrição</FormLabel>
                <Textarea bg='white' placeholder='Descreva a solicitação' />

                <FormLabel pt={3} color='white'>Data de entrega</FormLabel>
                <Input bg='white' placeholder="Selecione a data" size="md" type="datetime-local"/>

                <FormLabel pt={3} color='white'>Responsável</FormLabel>
                <Input bg='white' mb={4}placeholder='Digite o responsável pela solicitação' size='md' />
                
                <Button display="flex" mb={3} bg='#53C4CD' variant='solid' textColor='black' colorScheme="#58595B" width='100%'>Enviar</Button>
        </ModalGeneric></>
        
    );
};


// #53C4CD
// #58595B
// #292A2D
