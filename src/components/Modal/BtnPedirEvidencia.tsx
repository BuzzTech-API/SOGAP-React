
import { useDisclosure, FormLabel, Input, Textarea, Button, Select, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import User from "../../models/User";
import { createRequestEvidence } from "../../services/requestEvidence";
import { refreshTokenFetch, verifyTokenFetch } from "../../services/token";
import { getAllUsers } from "../../services/users";
import { ModalGeneric } from "./Modal";
import { AddIcon } from "@chakra-ui/icons";
import RequestForEvidence from "../../models/RequestForEvidence";

interface requestEvidence {
    step_id: number
    setRequests: React.Dispatch<React.SetStateAction<RequestForEvidence[]>>
    requests: Array<RequestForEvidence>
}


export const ModalSolicitaEvidencia = ({ step_id, setRequests, requests }: requestEvidence) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [requiredDocument, setRequiredDocument] = useState('')
    const [description, setDescription] = useState('')
    const [evidenceValidationDate, setEvidenceValidationDate] = useState(new Date())
    const [user_id, setUserID] = useState(0)
    const [responsibleName, setResponsibleName] = useState('')
    const [usersList, setUsersList] = useState(new Array<User>())

    const handleRequiredDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Atualizar o estado com o novo valor do input
        setRequiredDocument(event.target.value);
    };
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Atualizar o estado com o novo valor do input
        setDescription(event.target.value);
    };
    const handleEvidenceValidationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Atualizar o estado com o novo valor do input
        let evidenceValidationDateChange = new Date(event.target.value)
        setEvidenceValidationDate(evidenceValidationDateChange);
    };
    const handleChangeResponsible = (e: React.ChangeEvent<HTMLSelectElement>) => {

        
        
        setResponsibleName(e.target.value)
        setUserID(Number.parseInt(e.target.value.split(':')[0]))

    }


    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const deliveryDate = new Date()
        e.preventDefault();
        await verifyTokenFetch()
        const newRequest =await createRequestEvidence(requiredDocument, description, step_id, user_id, evidenceValidationDate, deliveryDate)
        if (newRequest) {
            setRequests(requests.concat(newRequest))   
            onClose()
        }
        //window.location.reload();
    }
    //Fetch backEnd

    useEffect(() => {
        (async () => {
            await refreshTokenFetch()
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                setUsersList(listOfUsers)
            }

        })();
    }, [])



    return (

        <>
            <IconButton margin=''
                aria-label="Btn Add Processo"
                bg="#58595B"
                color="#FFF"
                borderRadius='1rem'
                padding='1rem'
                size={'lg'}
                width={'8rem'}
                icon={<AddIcon h={'10'} w={'20'} />}
                _hover={{ color: "#58595B", bg: "#FFF" }}
                onClick={onOpen}
            ></IconButton>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem">
                <form onSubmit={handleSubmit}>
                    <FormLabel textAlign="center" fontSize="large" color='white'><strong>Solicitação de evidência</strong></FormLabel>
                    <FormLabel pt={3} color='white'>Documento requerido</FormLabel>
                    <Input bg='white' textColor={'black'} placeholder='Digite o documento requerido' size='md' type="text" onChange={handleRequiredDocumentChange} />

                    <FormLabel pt={3} color='white'>Descrição</FormLabel>
                    <Textarea bg='white' textColor={'black'} placeholder='Descreva a solicitação' onChange={handleDescriptionChange} />

                    <FormLabel pt={3} color='white'>Data de entrega</FormLabel>
                    <Input bg='white' textColor={'black'} placeholder="Selecione a data" size="md" type="date" onChange={handleEvidenceValidationDateChange} />

                    <FormLabel pt={3} color='white'>Responsável</FormLabel>
                    <Select
                        style={{ width: "100%", height: "40px" }}
                        onChange={handleChangeResponsible}
                        rounded="100px"
                        marginBottom={'1rem'}
                        color="#000000"
                        textColor={'black'}
                        bg="#D9D9D9"
                        value={responsibleName}>
                            <option value=""></option>
                        {usersList.map((user: User) => {
                            
                            return <option value={user.id+": "+user.name} key={user.id}>{user.id+": "+user.name}</option>
                        })}
                    </Select>

                    <Button display="flex" mb={3} bg='#53C4CD' variant='solid' textColor='black' colorScheme="#58595B" width='100%' type="submit">Enviar</Button>
                </form>
            </ModalGeneric>
        </>

    );
};


// #53C4CD
// #58595B
// #292A2D
