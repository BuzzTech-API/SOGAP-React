
import { useDisclosure, FormLabel, Input, Textarea, Button, Select, FormControl, Box, Grid, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { verifyTokenFetch } from "../../services/token";
import { ModalGeneric } from "./Modal";
import Step from "../../models/Steps";
import { updateStep } from "../../services/steps";
import User from "../../models/User";
import { createUserStep, deleteUserStep, getAllUsers } from "../../services/users";
import { CloseIcon } from "@chakra-ui/icons";
import { StepUser } from "../../interfaces/stepInterface";
import { sleep } from "../../services/sleep";

interface UpdateStep {
    step: Step
}

export const ModalUpdateStep = ({ step }: UpdateStep) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState(step.name)
    const [endingDate, setEndingDate] = useState(new Date(step.endingDate))
    const [objective, setObjective] = useState(step.objective)
    const [priority, setPriority] = useState(step.priority)
    const [usersList, setUsersList] = useState(new Array<User>())
    const [responsibleList, setResponsibleList] = useState(new Array<User>())

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
        e.preventDefault()
        await verifyTokenFetch()

        if (!name || !endingDate || !objective || !priority || (responsibleList.length === 0)) { //Verificar
            alert('Preencha os campos')
            return
        }
        
        const response = await updateStep(step.id, name, step.endDate, endingDate, 
            step.process_id, objective, priority, step.order) //Atualiza a etapa com os dados rebidos 
        
        for(const user of step.users){ //Deleta todos os usuario relacionados a etapa
            await deleteUserStep(user.user_id, step.id);
        }

        const userStepList = new Array<StepUser>()
        responsibleList.forEach(async (user: User) => { //Cria usuarios relacionados a etapa
            await createUserStep(user.id, step.id)
            const userStep: StepUser = {
            user_id: user.id,
            step_id: step.id,
            user: user
            }
            userStepList.push(userStep)
        })

        if (response.ok) { //Se der certo ele passa pra dentro do if
            onClose()
            await sleep(500)
            window.location.reload();
            //Talvez colocar algum popup dizendo que as alterações foram feitas
        }

    }
    //Fetch backEnd

    const setResponsible = (user:User) => {
        setResponsibleList(responsibleList.concat(user))
        }
        
    const handleChangeResponsible = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const newResponsible = usersList.find(user => user.id===Number.parseInt(e.target.value))
        if(newResponsible){
          setResponsible(newResponsible)
        }
    }

    useEffect(() => {
        (async () => {
            await verifyTokenFetch()
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                setUsersList(listOfUsers)
            }
        })();
    }, [])



    return (

        <>
            <Button display="flex" mb={3} bg='#53C4CD' variant='solid' 
            textColor='black' colorScheme="#58595B" width='100%' 
            type="submit" onClick={onOpen}
            >Editar</Button>
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
                    <FormControl id="responsaveis" color="#ffff" mb={4}>
                        <FormLabel className="Subtitulo">Responsáveis</FormLabel>
                        <Select style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
                        value={''}
                        onChange={handleChangeResponsible}
                        >
                        <option value=""></option>
                        {usersList.map((user: User) => {
                            
                            return <option key={user.id} value={user.id}>{user.name}</option>
                        })}

                        </Select>
                        <Box>
                        <Grid minH={'10rem'} marginLeft='1rem' templateColumns='repeat(2, 1fr)' gap='1.5rem'>
                            {responsibleList.map((responsible: User) => {
                            const removeResponsible = () => {
                                setResponsibleList(responsibleList.filter((item) => item !== responsible))
                            }
                            return <Box
                                width='15rem'
                                height='3rem'
                                bg='#53C4CD'
                                alignContent='center'
                                padding='0.5rem 0.5rem 0.5rem 2rem'
                                borderRadius='2rem'
                                marginTop='0.8rem'
                                marginRight='0.5rem'
                                key={responsible.id}>
                                {responsible.name}
                                <IconButton marginLeft='2rem'
                                aria-label="Btn Add Processo"
                                bg="white"
                                color="#58595B"
                                size='sm'
                                borderRadius='3rem'
                                icon={<CloseIcon />}
                                _hover={{ color: "white", bg: "#58595B" }}
                                onClick={removeResponsible}
                                />
                            </Box>
                            })}
                        </Grid >
                        </Box>
                    </FormControl>
                    <Button display="flex" mb={3} bg='#53C4CD' variant='solid' textColor='black' colorScheme="#58595B" width='100%' type="submit">Confirmar</Button>
                </form>
            </ModalGeneric>
        </>

    );
};
