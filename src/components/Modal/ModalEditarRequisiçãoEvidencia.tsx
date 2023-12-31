import { useDisclosure, FormLabel, Input, Button, Select, Tooltip, Textarea, Heading, ModalHeader , useToast  } from "@chakra-ui/react"
import React, { SetStateAction, useEffect, useState } from "react"
import { ModalGeneric } from "./Modal"
import User from "../../models/User"
import { getAllUsers } from "../../services/users"
import RequestForEvidence from "../../models/RequestForEvidence"
import { formatData } from "../../services/formatDate"
import { UpdateRequestEvidenceInterface } from "../../interfaces/requestEvidenceInterface"
import { updateRequestEvidence } from "../../services/requestEvidence"
import Step from "../../models/Steps"
import { verifyTokenFetch } from "../../services/token"

interface UpdateRequestEvidence {
    requestEvidence: RequestForEvidence
    setRequestForEvidence: React.Dispatch<SetStateAction<RequestForEvidence>>,
    step: Step,
    setStep: React.Dispatch<SetStateAction<Step>>,
}

export const ModalUpdateRequestEvidence = ({ requestEvidence, setRequestForEvidence, step, setStep }: UpdateRequestEvidence) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [usersList, setUsersList] = useState(new Array<User>())
    const [responsibleName, setResponsibleName] = useState('')
    const toast = useToast()

    useEffect(() => {
        (async () => {

            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                setUsersList(listOfUsers)
            }
            if (requestEvidence) {

                setFormData({
                    requiredDocument: requestEvidence.requiredDocument,
                    description: requestEvidence.description,
                    step_id: requestEvidence.step_id,
                    user_id: requestEvidence.user_id,
                    evidenceValidationDate: formatData(new Date(requestEvidence.evidenceValidationDate)),
                    deliveryDate: formatData(new Date(requestEvidence.deliveryDate)),
                    is_validated: requestEvidence.is_validated,
                    is_actived: true,
                    id: requestEvidence.id
                })
                const responsibleUser = listOfUsers.find(user =>
                    user.id === requestEvidence.user_id)
                if (responsibleUser) {
                    setResponsibleName(responsibleUser.name)
                }

            }


        })()
    }, [requestEvidence])



    const [formData, setFormData] = useState<UpdateRequestEvidenceInterface>({
        requiredDocument: '',
        description: '',
        step_id: 0,
        user_id: 0,
        evidenceValidationDate: '',
        deliveryDate: '',
        is_validated: true,
        is_actived: true,
        id: requestEvidence.id
    })

    //Função para lidar com mudanças no corpo do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { title, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [title]: value,
        }))
    }


    const handleChangeResponsible = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUserID = Number.parseInt(e.target.value.split(':')[0])
        setResponsibleName(e.target.value)
        setFormData((prevData) => ({
            ...prevData,
            user_id: newUserID,
        }))

    }


    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        try {

            const requisicao = updateRequestEvidence(formData) //Atualiza a etapa com os dados rebidos 
            toast.promise(requisicao, {
                success: { title: 'Requisição de Evidência Editado', description: 'Requisição de Evidência editado com sucesso' },
                error: { title: 'Erro ao editar Requisição de Evidência', description: 'Erro' },
                loading: { title: 'Editando Requisição de Evidência', description: 'Por favor, espere' },
            })
            const response = await requisicao

            if (response.ok) { //Se der certo ele passa pra dentro do if
                //Talvez colocar algum popup dizendo que as alterações foram feitas
                const updateRequestForEvidence = new RequestForEvidence(
                    formData.id,
                    formData.requiredDocument,
                    formData.description,
                    formData.step_id,
                    formData.user_id,
                    new Date(formData.evidenceValidationDate),
                    new Date(formData.deliveryDate),
                    formData.is_validated,
                    formData.is_actived,
                    requestEvidence.evidences
                )
                setRequestForEvidence(updateRequestForEvidence)
                const newRequests = step.requests.map((item) => {
                    if (item.id === formData.id) {
                        return updateRequestForEvidence
                    }
                    return item
                })
                step.requests = newRequests
                setStep(step)
            }

        } catch (e) {
            console.log(e)

        } finally {
            onClose()
        }

    }
    //Fetch backEnd



    const colaboradores = usersList.filter((user: User) => user.role === "Colaborador")
    return (

        <>
            <Button
                display="flex"
                variant='solid'
                bg={'#53C4CD'}
                color={'#FFF'}
                width={'100%'}
                _hover={{ background: '#FFF', color: '#58595B' }}
                type="submit"
                onClick={onOpen}
            >Editar</Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem" heightModal="auto">
                <form onSubmit={handleSubmit}>
                    <ModalHeader textAlign="center">
                        <Heading
                            as="h2"
                            size='lg'
                            fontFamily={'Poppins'}
                            fontSize='1.9rem'
                            fontStyle='normal'
                            fontWeight='bold'
                            mb={3}
                            className="Titulo"
                            color='#53C4CD'
                            textAlign="center">
                            Edição de Requisição de Evidência
                        </Heading>
                    </ModalHeader>

                    <FormLabel pt={3} color='white'>Documento requerido</FormLabel>
                    <Tooltip label={requestEvidence.requiredDocument}>
                        <Input
                            bg='white'
                            textColor={'black'}
                            placeholder={requestEvidence.requiredDocument}
                            size='md'
                            type="text"
                            title="requiredDocument"
                            value={formData.requiredDocument}
                            onChange={handleChange} />
                    </Tooltip>

                    <FormLabel pt={3} color='white'>Descrição</FormLabel>
                    <Tooltip label={requestEvidence.description}>
                        <Textarea
                            bg='white'
                            textColor={'black'}
                            size="md"
                            placeholder={requestEvidence.description}
                            title="description"
                            value={formData.description}
                            onChange={handleChange}
                            resize='none' />
                    </Tooltip>

                    <FormLabel pt={3} color='white'>Data de entrega</FormLabel>
                    <Input
                        bg='white'
                        textColor={'black'}
                        type="date"
                        title="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange} />

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
                        {colaboradores.length > 0 ? (
                            colaboradores.map((user: User) => (
                                <option value={user.id + ": " + user.name} key={user.id}>
                                    {user.id + ": " + user.name}
                                </option>
                            ))
                        ) : (
                            <option value="Não há nenhum Colaborador cadastrado" disabled>
                                Não há nenhum Colaborador cadastrado
                            </option>
                        )}
                    </Select>

                    <Button
                        display="flex"
                        mb={3}
                        bg='#53C4CD'
                        variant='solid'
                        textColor='white'
                        colorScheme="#58595B"
                        width='100%'
                        type="submit"
                        _hover={{ background: '#FFF', color: '#58595B' }}
                    >Confirmar</Button>
                </form >
            </ModalGeneric>
        </>

    )
}
