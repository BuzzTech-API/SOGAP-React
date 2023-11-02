
import { useDisclosure, FormLabel, Input, Textarea, Button, Select, FormControl, Box, Tag, TagLabel, TagCloseButton, Flex } from "@chakra-ui/react"
import React, { SetStateAction, useEffect, useState } from "react"
import { ModalGeneric } from "./Modal"
import Step from "../../models/Steps"
import { updateStep } from "../../services/steps"
import User from "../../models/User"
import { createUserStep, deleteUserStep, getAllUsers } from "../../services/users"
import { StepUser } from "../../interfaces/stepInterface"
import { formatToData } from "../../services/formatDate"
import { verifyTokenFetch } from "../../services/token"

interface UpdateStep {
    step: Step,
    setStep?: React.Dispatch<SetStateAction<Step>>,
    steps?: Step[],
    setSteps?: React.Dispatch<SetStateAction<Step[]>>,
}

export const ModalUpdateStep = ({ step, steps, setStep, setSteps }: UpdateStep) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState(step.name)
    const [endingDate, setEndingDate] = useState(step.endingDate.toString())
    const [objective, setObjective] = useState(step.objective)
    const [priority, setPriority] = useState(step.priority)
    const [usersList, setUsersList] = useState(new Array<User>())
    const [responsibleList, setResponsibleList] = useState(new Array<User>())

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Atualizar o estado com o novo valor do input
        setName(event.target.value)
    }
    const handleEndingDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Atualizar o estado com o novo valor do input

        setEndingDate(event.target.value)
    }
    const handleObjectiveChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Atualizar o estado com o novo valor do input
        setObjective(event.target.value)
    }
    const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //valores de prioridade
        setPriority(event.target.value)
    }


    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        await verifyTokenFetch()
        try {

            if (!name || !endingDate || !objective || !priority || (responsibleList.length === 0)) { //Verificar
                alert('Preencha os campos')

            }


            const response = await updateStep(step.id, name, step.endDate, formatToData(endingDate),
                step.process_id, objective, priority, step.order) //Atualiza a etapa com os dados rebidos 

            for (const user of step.users) { //Deleta todos os usuario relacionados a etapa
                await deleteUserStep(user.user_id, step.id)
            }
            const userStepList = new Array<StepUser>()
            responsibleList.forEach(async (user: User) => { //Cria usuarios relacionados a etapa
                await createUserStep(user.id, step.id)
                
            })
            responsibleList.forEach((user: User) => { //Cria usuarios relacionados a etapa
                const userStep: StepUser = {
                    user_id: user.id,
                    step_id: step.id,
                    user: user
                }
                userStepList.push(userStep)
            })

            if (setStep!==undefined) {
                const updatedStep = new Step(
                    step.id,
                    step.process_id,
                    name,
                    step.status,
                    step.order,
                    objective,
                    formatToData(endingDate),
                    step.endDate,
                    priority,
                    step.is_active,
                    userStepList,
                    step.requests)
                setStep(updatedStep)

            }
            if (setSteps !== undefined && steps !== undefined) {

                setSteps(steps.map((item) => {
                    if (item.id === step.id) {
                        const updatedStep = new Step(
                            step.id,
                            step.process_id,
                            name,
                            step.status,
                            step.order,
                            objective,
                            formatToData(endingDate),
                            step.endDate,
                            priority,
                            step.is_active,
                            userStepList,
                            step.requests)
                        return updatedStep

                    }
                    return item
                }))
            }


            if (response.ok) { //Se der certo ele passa pra dentro do if
                //Talvez colocar algum popup dizendo que as alterações foram feitas
            }
        } catch (e) {
            console.log(e)

        } finally {
            onClose()
        }

    }
    //Fetch backEnd

    const setResponsible = (user: User) => {
        setResponsibleList(responsibleList.concat(user))
    }

    const handleChangeResponsible = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newResponsible = usersList.find(user => user.id === Number.parseInt(e.target.value))
        if (newResponsible) {
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
            
            setResponsibleList(step.users.map(userStep => userStep.user)) //Define a lista de responsáveis com os usuários retornados
            

        })()
    }, [step])



    return (

        <>
            <Button bg='#53C4CD' variant='solid'
                textColor='white' width='10rem'
                type="submit" onClick={onOpen}
                margin={'0.5rem'}
            >Editar</Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem">
                <form onSubmit={handleSubmit}>
                    <FormLabel textAlign="center" fontSize="large" color='white'><strong>Edição de Etapa</strong></FormLabel>

                    <FormLabel pt={3} color='white'>Nome</FormLabel>
                    <Input maxLength={64} bg='white' textColor={'black'} placeholder={step.name} value={name} size='md' type="text" onChange={handleNameChange} />

                    <FormLabel pt={3} color='white'>Prazo</FormLabel>
                    <Input bg='white' textColor={'black'} size="md" type="date" value={endingDate.toString()} onChange={handleEndingDateChange} />

                    <FormLabel pt={3} color='white'>Objetivo</FormLabel>
                    <Textarea bg='white' textColor={'black'} placeholder={step.objective} value={objective} onChange={handleObjectiveChange} />

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
                            <Flex
                                minH={'10rem'}
                                maxWidth={'100%'}
                                marginLeft='1rem'
                                flexDirection='row'
                                gap='1.5rem'
                                flexWrap="wrap"
                                justifyContent="flex-start"
                            >
                                {responsibleList.map((responsible: User) => {
                                    const removeResponsible = () => {
                                        setResponsibleList(responsibleList.filter((item) => item !== responsible))
                                    }
                                    return <Tag
                                        bg='#53C4CD'
                                        alignContent='center'
                                        minWidth='5rem'
                                        height='3rem'
                                        key={responsible.id}
                                        marginTop='0.8rem'
                                        marginRight='0.5rem'
                                    >
                                        <TagLabel>{responsible.name}</TagLabel>
                                        <TagCloseButton
                                            width={'2rem'}
                                            height={'2rem'}
                                            aria-label="Btn Add Processo"
                                            bg="white"
                                            color="#58595B"
                                            _hover={{ color: "white", bg: "#58595B" }}
                                            onClick={removeResponsible}
                                        />
                                    </Tag>



                                })}
                            </Flex >
                        </Box>
                    </FormControl>
                    <Button display="flex" mb={3} bg='#53C4CD' variant='solid' textColor='white' colorScheme="#58595B" width='100%' type="submit">Confirmar</Button>
                </form>
            </ModalGeneric>
        </>

    )
}
