
import { useDisclosure, FormLabel, Input, Textarea, Button, Select, FormControl } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { refreshTokenFetch, verifyTokenFetch } from "../../services/token";
import { ModalGeneric } from "./Modal";
import Step from "../../models/Steps";
import { updateStep } from "../../services/steps";

interface UpdateStep {
    step: Step
}

export const ModalUpdateStep = ({ step }: UpdateStep) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('')
    const [endingDate, setEndingDate] = useState(new Date())
    const [objective, setObjective] = useState('')
    const [priority, setPriority] = useState(step.priority)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Atualizar o estado com o novo valor do input
        setName(event.target.value);
    };
    const handleEndingDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Atualizar o estado com o novo valor do input
        let endingDateChange = new Date(event.target.value)
        setEndingDate(endingDateChange);
    };
    const handleObjectiveChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Atualizar o estado com o novo valor do input
        setObjective(event.target.value);
    };
    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {        
        //valores de prioridade
        setPriority(event.target.value)
    }


    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await verifyTokenFetch()
        
        const newRequest = await updateStep(name, step.endDate, endingDate, step.process_id, objective, priority, step.order)
        console.log(newRequest);
        
        /*if (newRequest) {
            setRequests(requests.concat(newRequest))   
            onClose()
        }*/
        //window.location.reload();
    }
    //Fetch backEnd

    useEffect(() => {
        (async () => {
            await refreshTokenFetch()
        })();
    }, [])



    return (

        <>
            <Button display="flex" mb={3} bg='#53C4CD' variant='solid' 
            textColor='black' colorScheme="#58595B" width='100%' 
            type="submit" onClick={onOpen}
            ></Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem">
                <form onSubmit={handleSubmit}>
                    <FormLabel textAlign="center" fontSize="large" color='white'><strong>Edição de Etapa</strong></FormLabel>

                    <FormLabel pt={3} color='white'>Nome</FormLabel>
                    <Input bg='white' textColor={'black'} placeholder={step.name} size='md' type="text" onChange={handleNameChange} />

                    <FormLabel pt={3} color='white'>Prazo</FormLabel>
                    <Input bg='white' textColor={'black'} size="md" type="date" onChange={handleEndingDateChange} />

                    <FormLabel pt={3} color='white'>Objetivo</FormLabel>
                    <Textarea bg='white' textColor={'black'} placeholder={step.objective} onChange={handleObjectiveChange} />

                    <FormControl id="priority" mb={5}>
                        <FormLabel color="#ffffff" fontSize="20px" pt={3} mb={1} ml={210}>Prioridade</FormLabel>
                        <Select placeholder={step.priority} style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
                            value={priority}
                            onChange={handlePriorityChange}>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </Select>
                    </FormControl>

                    <Button display="flex" mb={3} bg='#53C4CD' variant='solid' textColor='black' colorScheme="#58595B" width='100%' type="submit">Confirmar</Button>
                </form>
            </ModalGeneric>
        </>

    );
};