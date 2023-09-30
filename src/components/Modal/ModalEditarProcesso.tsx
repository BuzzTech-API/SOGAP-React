
import { useDisclosure, FormLabel, Input, Button, Select, FormControl, Box, Grid, IconButton } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { verifyTokenFetch } from "../../services/token"
import { ModalGeneric } from "./Modal"
import User from "../../models/User"
import {  createProcessUser, getAllUsers } from "../../services/users"
import { CloseIcon } from "@chakra-ui/icons"
import Process from "../../models/Process"
import { deleteUserProcess, getProcessById, updateProcess } from "../../services/process"
import { useParams } from "react-router-dom"
import { formatData } from "../../services/formatDate"
import { UpdateProcessInterface } from "../../interfaces/processInterface"

export const ModalUpdateProcess = () => {
    const [usersList, setUsersList] = useState(new Array<User>())
    const [responsibleList, setResponsibleList] = useState(new Array<User>())
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id } = useParams()
    const [process, setProcess] = useState(new Process())
    
    useEffect(() => {
        (async () => {
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                setUsersList(listOfUsers)
            }
            if (id) {
                const process = await getProcessById(Number.parseInt(id))
                if(process){          
                    setProcess(process)
                    setFormData({
                        title: process.title,
                        description: process.description,
                        objective: process.objective,
                        endingDate: formatData(new Date(process.endingDate)),
                        createDate: formatData(new Date(process.createDate)),
                        lastUpdate: formatData(new Date()),
                        is_active: true,
                        priority: process.priority,
                        status: 'Não iniciado',
                        id: Number(id)
                    })
                }
            }
        })()
    }, [id])

    const [formData, setFormData] = useState<UpdateProcessInterface>({
        title: '',
        description: '',
        objective: '',
        endingDate: '',
        createDate: '',
        lastUpdate: '',
        is_active: true,
        priority: '',
        status: 'Não iniciado',
        id: Number(id)
    })

    //Função para lidar com mudanças no corpo do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { title, value } = e.target
        setFormData((prevData) => ({
        ...prevData,
        [title]: value,
        }))
    }
    //Função para lidar com mudanças no corpo do formulário
    const handleChangeEndingDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
        ...prevData,
        'endingDate': e.target.value,
        }))
    }

    //Função para lidar com mudança no item de "Prioridade"
    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
        ...prevData,
        'priority': e.target.value,
        }))

    }


    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await verifyTokenFetch()
        
        try{
            if (!formData) { //Verificar
                alert('Preencha os campos')
                return
            }

            await updateProcess(formData) //Atualiza a etapa com os dados rebidos 

            await Promise.all(process.users.map(user => deleteUserProcess(user.id, process.id))) //Deleta todos os usuarios relacionados ao processo

            for (const user of responsibleList) { //Cria usuarios relacionados a etapa
                await createProcessUser(user.id, process.id)
            }
        }

        catch (error){
            console.log(error)
        }
        finally{
            onClose()
           // window.location.reload()
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


    return (

        <>
            <Button display="flex" mb={3} bg='#53C4CD' variant='solid' 
            textColor='black' colorScheme="#58595B" width='100%' 
            type="submit" onClick={onOpen}
            >Editar</Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem">
                <form onSubmit={handleSubmit}>
                    <FormLabel textAlign="center" fontSize="large" color='white'><strong>Edição de Etapa</strong></FormLabel>

                    <FormLabel pt={3} color='white'>Título</FormLabel>
                    <Input 
                    bg='white' 
                    textColor={'black'} 
                    placeholder={process.title} 
                    size='md' 
                    type="text" 
                    title="title" 
                    value={formData.title}
                    onChange={handleChange}/>

                    <FormLabel pt={3} color='white'>Descrição</FormLabel>
                    <Input 
                    bg='white' 
                    textColor={'black'} 
                    placeholder={process.description}
                    size="md" 
                    type="text" 
                    title="description"
                    value={formData.description}
                    onChange={handleChange} />

                    <FormLabel pt={3} color='white'>Objetivo</FormLabel>
                    <Input 
                    bg='white' 
                    textColor={'black'} 
                    placeholder={process.objective}
                    size="md" 
                    type="text" 
                    title="objective"
                    value={formData.objective}
                    onChange={handleChange} />

                    <FormLabel pt={3} color='white'>Prazo</FormLabel>
                    <Input
                    bg='white'
                    textColor={'black'} 
                    size="md"
                    type="date"
                    title="endingDate"
                    value={formData.endingDate}
                    onChange={handleChangeEndingDate} />

                    <FormControl id="priority" mb={5}>
                        <FormLabel color="#ffffff" fontSize="20px" pt={3} mb={1} ml={210}>Prioridade</FormLabel>
                        <Select 
                        placeholder={process.priority} 
                        style={{ width: "100%", height: "40px" }} 
                        rounded="100px" color="#000000" bg="#D9D9D9"
                        value={formData.priority}
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

    )
}
