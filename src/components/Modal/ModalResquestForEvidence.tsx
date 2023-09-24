import { Box, Button, useDisclosure, Text, Heading, Center } from "@chakra-ui/react"
import { ModalGeneric } from "./Modal"
import RequestForEvidence from "../../models/RequestForEvidence"
import { ModalUploadEvidence } from "../UploadEvidence"

interface ViewRequestI{
    request: RequestForEvidence,
    process_id: number
}
export const ViewRequest  =({request, process_id}:ViewRequestI)=>{
    const {isOpen, onOpen, onClose} = useDisclosure()
    return(
        <>
        <Center 
        backgroundColor={'#58595B'}
        maxWidth={'10rem'}
        width={'10rem'}
        minHeight={'3rem'}
        padding={'0.1rem'}
        textAlign={'center'}
        fontSize={'1rem'}
        textColor={'white'}
        borderRadius={'1rem'}
        onClick={onOpen}
        >
            {request.evidences.length===0? <Text noOfLines={1} textColor={'red'}>{request.requiredDocument}</Text>: <Text noOfLines={1}  textColor={'white'}>{request.requiredDocument}</Text>}
        </Center>
        <ModalGeneric 
        widthModal="40rem"
        isOpen={isOpen} 
        onClose={onClose}
        bgColor="gray"
        header={'Adicionar Evidência'}
        
        footer={
        <Button textColor={'white'} colorScheme="teal" onClick={onClose}>
            Fechar
        </Button>}
        >
            <Box marginBottom={'2rem'}>
                <Heading size={'md'}>Documento Requirido: {request.requiredDocument}</Heading>
                <p>
                    {request.description}
                </p>
            </Box>
            <Box>
                <ModalUploadEvidence idRequestForEvidence={request.id} idProcess={process_id} />
            </Box>
        </ModalGeneric>
        </>
    )
}