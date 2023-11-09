
import { useDisclosure, FormLabel, Input, Button, Select, FormControl, Box, Flex, Tag, TagCloseButton, TagLabel, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { ModalGeneric } from "./Modal"
import User from "../../models/User"
import { createProcessUser, getAllUsers } from "../../services/users"
import Process from "../../models/Process"
import { deleteUserProcess, getProcessById, updateProcess } from "../../services/process"
import { useParams } from "react-router-dom"
import { formatData } from "../../services/formatDate"
import { UpdateProcessInterface } from "../../interfaces/processInterface"
import { verifyTokenFetch } from "../../services/token"

interface props {
    process_id?: string
    processes?: Array<Process>,
    setProcesses?: React.Dispatch<React.SetStateAction<Process[]>>
    process?: Process,
    setProcess?: React.Dispatch<React.SetStateAction<Process>>
}

export const ModalUpdateProcess = (props: props) => {
    const [usersList, setUsersList] = useState(new Array<User>())
    const [responsibleList, setResponsibleList] = useState(new Array<User>())
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id } = useParams()
    const toast = useToast()
    const [process, setProcess] = useState(new Process())
    let process_id: string | undefined;
    if (props.process_id !== undefined) {
        process_id = props.process_id
    } else {
        process_id = id
    }
    useEffect(() => {
        (async () => {
            
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                setUsersList(listOfUsers)
            }
            if (process_id) {
                const process = await getProcessById(Number.parseInt(process_id))
                if (process) {
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
                        id: Number(process_id)
                    })
                    setResponsibleList(process.users)
                }
            }
        })()
    }, [process_id])

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

    //Função para lidar com mudança no item de "Status"
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            'status': e.target.value,
        }))
    }


    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        

        try {
            if (!formData) { //Verificar
                alert('Preencha os campos')
                return
            }

            const requisicao = updateProcess(formData)
            toast.promise(requisicao, {
                success: { title: 'Processo Editado', description: 'Processo editado com sucesso' },
                error: { title: 'Erro ao editar Processo', description: 'Erro' },
                loading: { title: 'Editando Processo', description: 'Por favor, espere' },
            }) //Atualiza a etapa com os dados rebidos 
            await requisicao
            if (props.processes && props.setProcesses) {
                props.setProcesses(props.processes.map((item: Process) => {
                    if (item.id === process.id) {
                        item.title = formData.title
                        item.description = formData.description
                        item.objective = formData.objective
                        item.endingDate = new Date(formData.endingDate)
                        item.createDate = new Date(formData.createDate)
                        item.lastUpdate = new Date()
                        item.is_active = formData.is_active
                        item.priority = formData.priority
                        item.status = formData.status
                        return item
                    }
                    return item
                }))
            }

            if (props.process && props.setProcess) {
                const updatedProcess = new Process(
                    formData.id,
                    formData.title,
                    formData.description,
                    formData.objective,
                    new Date(formData.endingDate),
                    new Date(formData.createDate),
                    new Date(),
                    formData.is_active,
                    formData.priority,
                    formData.status,
                    props.process.steps,
                    responsibleList
                )
                props.setProcess(updatedProcess)

            }
            await Promise.all(process.users.map(user => deleteUserProcess(user.id, process.id))) //Deleta todos os usuarios relacionados ao processo


            for (const user of responsibleList) { //Cria usuarios relacionados a etapa
                await createProcessUser(user.id, process.id)
            }
        }

        catch (error) {
            console.log(error)
        }
        finally {
            onClose()
            // window.location.reload()
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


    return (

        <>
            <Button bg='#53C4CD' variant='solid'
                textColor='white' colorScheme="#58595B" width={['auto','8rem']}
                type="submit" onClick={onOpen}
            >Editar</Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem" heightModal="52rem">
                <form onSubmit={handleSubmit}>
                    <FormLabel textAlign="center" fontSize="large" color='white'><strong>Edição de Processo</strong></FormLabel>

                    <FormLabel pt={3} color='white'>Título</FormLabel>
                    <Input
                        bg='white'
                        textColor={'black'}
                        placeholder={process.title}
                        size='md'
                        type="text"
                        title="title"
                        value={formData.title}
                        onChange={handleChange} />

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

                    <FormControl id="priority" mb={3}>
                        <FormLabel color="#ffffff" pt={3}>Prioridade</FormLabel>
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

                    <FormControl id="status" mb={3}>
                        <FormLabel color="#ffffff" pt={3} >Status</FormLabel>
                        <Select
                            placeholder={process.status}
                            style={{ width: "100%", height: "40px" }}
                            rounded="100px" color="#000000" bg="#D9D9D9"
                            value={formData.status}
                            onChange={handleStatusChange}>
                            <option value="Não iniciado">Não iniciado</option>
                            <option value="Iniciado">Iniciado</option>
                            <option value="Concluído">Concluído</option>

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
                                minH={'7rem'}
                                maxWidth={'100%'}
                                marginLeft='1rem'
                                flexDirection='row'
                                gap='1rem'
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
