
import { useDisclosure, FormLabel, Input, Textarea, Button, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import User from "../../models/User";
import { createRequestEvidence } from "../../services/requestEvidence";
import { verifyTokenFetch } from "../../services/token";
import { getAllUsers } from "../../services/users";
import { ModalGeneric } from "./Modal";

interface requestEvidence {
    step_id: number
    onClose: () => void
  }
  

export const ModalSolicitaEvidencia = ({ step_id, onClose }: requestEvidence) =>{
    const { isOpen, onOpen } = useDisclosure();
    const [requiredDocument, setRequiredDocument] = useState('')
    const [description, setDescription] = useState('')
    const [evidenceValidationDate, setEvidenceValidationDate] = useState(new Date())
    const [user_id, setUserID] = useState(0)

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



    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const deliveryDate = new Date()
        e.preventDefault();
        verifyTokenFetch()
        await createRequestEvidence(requiredDocument, description, step_id, user_id, evidenceValidationDate, deliveryDate)
        onClose()
        //window.location.reload();
        }
        //Fetch backEnd

    useEffect(() => {
        (async () => {
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
            setUsersList(listOfUsers)
            }
    
        })();
        }, [])

      

    return (
        
            <>
                <Button bg='#53C4CD' onClick={onOpen} colorScheme="dark" variant='solid' color='dark'>Pedir evidência</Button>
                <ModalGeneric isOpen={isOpen} onClose={onClose}>
                    <form onSubmit={handleSubmit}>
                        <FormLabel textAlign="center" fontSize="large" color='white'><strong>Solicitação de evidência</strong></FormLabel>
                        <FormLabel pt={3} color='white'>Documento requerido</FormLabel>
                        <Input bg='white' placeholder='Digite o documento requerido' size='md' type="text" onChange={handleRequiredDocumentChange}/>

                        <FormLabel pt={3} color='white'>Descrição</FormLabel>
                        <Textarea bg='white' placeholder='Descreva a solicitação' onChange={handleDescriptionChange}/>

                        <FormLabel pt={3} color='white'>Data de entrega</FormLabel>
                        <Input bg='white' placeholder="Selecione a data" size="md" type="date" onChange={handleEvidenceValidationDateChange}/>

                        <FormLabel pt={3} color='white'>Responsável</FormLabel>
                        <Select style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"value={''}>
                            <option value=""></option>
                            {usersList.map((user: User) => {
                                const setResponsible = ()=>{
                                    setUserID(user.id)
                                }
                                return <option onClick={setResponsible} key={user.id} value={user.id}>{user.name}</option>})}
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
