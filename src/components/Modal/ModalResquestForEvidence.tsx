import { Box, Button, useDisclosure, Text, Heading, Center } from "@chakra-ui/react"
import { ModalGeneric } from "./Modal"
import RequestForEvidence from "../../models/RequestForEvidence"
import { ModalUploadEvidence } from "../UploadEvidence"
import { ModalUpdateRequestEvidence } from "./ModalEditarRequisiçãoEvidencia"
import { formatData } from "../../services/formatDate"
import { useEffect, useState } from "react"
import { verifyTokenFetch } from "../../services/token"
import { getAllUsers } from "../../services/users"
import { BtnDeleteEvidencia } from "../BtnDeleteEvidencia"

interface ViewRequestI{
    request: RequestForEvidence,
    process_id: number
}

export const ViewRequest:React.FC<ViewRequestI>  =({
    request, process_id
})=>{
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [responsibleName, setResponsibleName] = useState('')

    useEffect(() => {
        (async () => {
            await verifyTokenFetch()
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                const responsibleUser = listOfUsers.find(user => 
                    user.id === request.user_id)
                if(responsibleUser){
                    setResponsibleName(responsibleUser.name)}
            }
            
 
        })()
    }, [request])


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
                <Heading size={'md'}>Data de entrega: {formatData(new Date(request.deliveryDate))}</Heading>
                <Heading size={'md'}>Responsável: {responsibleName}</Heading>
            </Box>
            <Box>
                <ModalUploadEvidence idRequestForEvidence={request.id} idProcess={process_id} />
            </Box>
            <ModalUpdateRequestEvidence requestEvidence={request}/>
            <BtnDeleteEvidencia evidencia= {request}/>
        </ModalGeneric>
        </>
    )
}