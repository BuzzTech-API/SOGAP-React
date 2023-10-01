import { useDisclosure, FormLabel, Input, Button, Select } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { verifyTokenFetch } from "../../services/token"
import { ModalGeneric } from "./Modal"
import User from "../../models/User"
import { getAllUsers } from "../../services/users"
import RequestForEvidence from "../../models/RequestForEvidence"
import { formatData } from "../../services/formatDate"
import { UpdateRequestEvidenceInterface } from "../../interfaces/requestEvidenceInterface"
import { getRequestEvidenceById } from "../../services/requestEvidence"

interface UpdateRequestEvidence {
    requestEvidence: RequestForEvidence
}

export const ModalUpdateRequestEvidence = ({ requestEvidence }: UpdateRequestEvidence) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [usersList, setUsersList] = useState(new Array<User>())
    const [requestForEvidence, setRequestForEvidence] = useState(new RequestForEvidence())
    const [responsibleName, setResponsibleName] = useState('')
    const [user_id, setUserID] = useState(0)

    
    useEffect(() => {
        (async () => {
            await verifyTokenFetch()
            const listOfUsers = await getAllUsers()
            if (listOfUsers) {
                setUsersList(listOfUsers)
            }
            if(requestEvidence){
                const reqEvidence = await getRequestEvidenceById(requestEvidence.id)
                if(reqEvidence){
                    setRequestForEvidence(reqEvidence)
                    setUserID(reqEvidence.user_id)
                    setFormData({
                        requiredDocument: reqEvidence.requiredDocument,
                        description: reqEvidence.description,
                        step_id: reqEvidence.step_id,
                        user_id: reqEvidence.user_id,
                        evidenceValidationDate: formatData(new Date(reqEvidence.evidenceValidationDate)),
                        deliveryDate: formatData(new Date(reqEvidence.deliveryDate)),
                        is_validated: true,
                        is_actived: true,
                        id: requestEvidence.id
                    })
                const responsibleUser = usersList.find(user => 
                    user.id === reqEvidence.user_id)
                if(responsibleUser){
                    setResponsibleName(responsibleUser.name)
                }                   
                }
            }

            
        })()
    }, [requestEvidence, usersList])



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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { title, value } = e.target
        setFormData((prevData) => ({
        ...prevData,
        [title]: value,
        }))
    }


    const handleChangeResponsible = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setResponsibleName(e.target.value)
        setUserID(Number.parseInt(e.target.value.split(':')[0]))
    }


    //Função para submeter os dados ao servidor BackEnd
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await verifyTokenFetch()

        try{
            console.log(formData);
            console.log(responsibleName);
            console.log(user_id);
            console.log(requestForEvidence);
            
            
            

            /*if () { //Verificar
                alert('Preencha os campos')
                return
            }*/
            /*
            const response = await updateStep(step.id, name, step.endDate, endingDate, 
                step.process_id, objective, priority, step.order) //Atualiza a etapa com os dados rebidos 
            
            for(const user of step.users){ //Deleta todos os usuario relacionados a etapa
                await deleteUserStep(user.user_id, step.id)
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
                //Talvez colocar algum popup dizendo que as alterações foram feitas
            }*/
        }catch(e){
            console.log(e)
            
        }finally{
            onClose()
        }

    }
    //Fetch backEnd
        



    return (

        <>
            <Button display="flex" mb={3} bg='#53C4CD' variant='solid' 
            textColor='black' colorScheme="#58595B" width='100%' 
            type="submit" onClick={onOpen}
            >Editar</Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem">
                <form onSubmit={handleSubmit}>
                    <FormLabel textAlign="center" fontSize="large" color='white'><strong>Edição de Requisição de Evidência</strong></FormLabel>

                    <FormLabel pt={3} color='white'>Documento requerido</FormLabel>
                    <Input 
                    bg='white' 
                    textColor={'black'} 
                    placeholder={requestEvidence.requiredDocument} 
                    size='md' 
                    type="text" 
                    title="requiredDocument"
                    value={formData.requiredDocument}
                    onChange={handleChange} />

                    <FormLabel pt={3} color='white'>Descrição</FormLabel>
                    <Input
                    bg='white' 
                    textColor={'black'} 
                    size="md" 
                    placeholder={requestEvidence.description} 
                    type="text"
                    title="description"
                    value={formData.description}
                    onChange={handleChange} />

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
                        {usersList.map((user: User) => {
                            
                            return <option value={user.id+": "+user.name} key={user.id}>{user.id+": "+user.name}</option>
                        })}
                    </Select>

                    <Button display="flex" mb={3} bg='#53C4CD' variant='solid' textColor='black' colorScheme="#58595B" width='100%' type="submit">Confirmar</Button>
                </form>
            </ModalGeneric>
        </>

    )
}
