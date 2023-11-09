import { Box, Button, ButtonGroup, Checkbox, Flex, Table, useDisclosure, Text } from "@chakra-ui/react"
import { ModalGeneric } from "./Modal"
import { useEffect, useState } from "react"
import Process from "../../models/Process"
import { getMyRelatedData } from "../../services/users"
import Step from "../../models/Steps"
import RequestForEvidence from "../../models/RequestForEvidence"
import { verifyTokenFetch } from "../../services/token"

interface FilterSettings {
    setProcess?: React.Dispatch<React.SetStateAction<Process[]>>
    setSteps?: React.Dispatch<React.SetStateAction<Step[]>>
    setRequestForEvidence?: React.Dispatch<React.SetStateAction<RequestForEvidence[]>>
    setSelectedType?: React.Dispatch<React.SetStateAction<string[]>>
    setFilteredSteps?: React.Dispatch<React.SetStateAction<Step[]>>
    setFilteredRequestForEvidence?: React.Dispatch<React.SetStateAction<RequestForEvidence[]>>
    selectedType?: string[]
    steps?: Array<Step>
    requestForEvidence?: Array<RequestForEvidence>
    type: number
}

export const ModalFilter = ({ setProcess, steps, setFilteredSteps, setFilteredRequestForEvidence, requestForEvidence, setSelectedType, selectedType, type }: FilterSettings) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedDates, setSelectedDates] = useState<string[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string[]>([])
    const [selectedPriority, setSelectedPriority] = useState<string[]>([])
    const [filterProcess, setFilterProcess] = useState(new Array<Process>())
    const [filterStep, setFilterStep] = useState(new Array<Step>())
    const [filterRequestEvidence, setFilterRequestEvidence] = useState(new Array<RequestForEvidence>())




    useEffect(() => {
        (async () => {
            
            const userContent = await getMyRelatedData()

            if (userContent && setProcess) {
                setProcess(userContent.processes)
                setFilterProcess(userContent.processes)
                setFilterStep(userContent.steps)
                setFilterRequestEvidence(userContent.requests)

                if (setFilteredSteps && setFilteredRequestForEvidence)
                    setFilteredSteps(userContent.steps)
                if (setFilteredRequestForEvidence)
                    setFilteredRequestForEvidence(userContent.requests)
            }
        })()
    }, [setFilteredRequestForEvidence, setFilteredSteps, setProcess])

    const handleDateSelect = (date: string) => {
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter(x => x !== date))
        } else {
            setSelectedDates([...selectedDates, date])
        }
    }

    const handleStatusSelect = (status: string) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(x => x !== status))
        } else {
            setSelectedStatus([...selectedStatus, status])
        }
    }

    const handlePrioritySelect = (status: string) => {
        if (selectedPriority.includes(status)) {
            setSelectedPriority(selectedPriority.filter(x => x !== status))
        } else {
            setSelectedPriority([...selectedPriority, status])
        }
    }

    const handleTypeSelect = (type: string) => {
        if (selectedType !== undefined && setSelectedType !== undefined) {
            if (selectedType.includes(type)) {
                setSelectedType(selectedType.filter(x => x !== type))
            } else {
                setSelectedType([...selectedType, type])
            }
        }
    }

    const resetFilters = () => {
        if (setProcess)
            setProcess(filterProcess)
        if (setFilteredSteps)
            setFilteredSteps(filterStep)
        if (setFilteredRequestForEvidence)
            setFilteredRequestForEvidence(filterRequestEvidence)
        setSelectedDates([])
        setSelectedStatus([])
        setSelectedPriority([])
        onClose()
    }


    const filterProcesses = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (setProcess)
            setProcess(filterProcess)
        if (setFilteredSteps)
            setFilteredSteps(filterStep)
        if (setFilteredRequestForEvidence)
            setFilteredRequestForEvidence(filterRequestEvidence)


        const filteredProcesses = filterProcess.filter((process) => {
            return (
                (selectedDates.length === 0 || selectedDates.includes(process.endingDate.toString())) &&
                (selectedStatus.length === 0 || selectedStatus.includes(process.status)) &&
                (selectedPriority.length === 0 || selectedPriority.includes(process.priority))
            )
        })
        const filteredSteps = filterStep.filter((step) => {
            return (
                (selectedDates.length === 0 || selectedDates.includes(step.endDate.toString())) &&
                (selectedStatus.length === 0 || selectedStatus.includes(step.status)) &&
                (selectedPriority.length === 0 || selectedPriority.includes(step.priority))
            )
        })
        const filteredRequests = selectedPriority.length === 0 ? filterRequestEvidence.filter((request) => {
            return (
                (selectedDates.length === 0 || selectedDates.includes(request.evidenceValidationDate.toString()))
            )
        }) : []
        
        if (setFilteredRequestForEvidence)
            setFilteredRequestForEvidence(filteredRequests)


        if (setFilteredSteps)
            setFilteredSteps(filteredSteps)

        if (setProcess)
            setProcess(filteredProcesses)
        onClose()
    }

    return (
        <>
            <Button
                margin=''
                aria-label="Btn Add Processo"
                bg="#29784E"
                color="white"
                width={'5rem'}
                _hover={{ color: "#29784E", bg: "white" }}
                onClick={onOpen}
            >Filtros</Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="auto" heightModal="auto">
                <form onSubmit={filterProcesses}>
                    <Text
                        fontFamily={'Poppins'}
                        fontSize='1.5rem'
                        fontStyle='normal'
                        fontWeight='700'
                        alignSelf={'center'}
                        textAlign="center"
                        color={'white'}
                        mb={3}
                    >Filtros</Text>
                    <Flex
                        direction={"column"}
                        alignSelf={'center'}
                        justify={['column', 'row']}
                        justifyContent={'center'}
                        align={'top'}>
                        <Box
                            width={'40%'}
                            key={1}
                        >
                            <Text
                                alignSelf={'center'}
                                fontFamily={'Poppins'}
                                fontSize='1.3rem'
                                fontStyle='normal'
                                mb={1}
                            >Datas</Text>
                            <Flex
                                flexWrap="wrap"
                                maxHeight='10rem'
                                minHeight='10rem'
                                maxWidth={'15rem'}
                                overflowY={'auto'}
                                mb={1}>
                                {[...(filterProcess.map(process => process.endingDate)),
                                ...(type === 5001 ? filterStep.map(step => step.endDate) : []),
                                ...(type === 5001 ? filterRequestEvidence.map(request => request.evidenceValidationDate) : [])].filter((value,
                                    index, self) => self.indexOf(value) === index).sort((a, b) =>
                                        new Date(a).getTime() - new Date(b).getTime()).map((date, key) => (
                                            <div key={key}>
                                                <Checkbox size={"lg"}
                                                    isChecked={selectedDates.includes(date.toString())}
                                                    onChange={() => handleDateSelect(date.toString())}>
                                                    {date.toString()}
                                                </Checkbox>
                                            </div>
                                        ))}
                            </Flex>
                        </Box>

                        {type === 5000 && (
                            <Box key={2}>
                                <Text
                                    alignSelf={'center'}
                                    fontFamily={'Poppins'}
                                    fontSize='1.3rem'
                                    fontStyle='normal'
                                    mb={1}
                                >Status</Text>
                                <Flex
                                    direction={"column"}
                                    alignSelf={'left'}
                                    justifyContent={'center'}
                                    mr={2}
                                    mb={1}>
                                    <Checkbox size={"lg"}
                                        isChecked={selectedStatus.includes("Não iniciado")}
                                        onChange={() => handleStatusSelect("Não iniciado")}>
                                        Não iniciado</Checkbox>

                                    <Checkbox size={"lg"}
                                        isChecked={selectedStatus.includes("Iniciado")}
                                        onChange={() => handleStatusSelect("Iniciado")}>
                                        Iniciado</Checkbox>


                                    <Checkbox size={"lg"}
                                        isChecked={selectedStatus.includes("Concluído")}
                                        onChange={() => handleStatusSelect("Concluído")}>
                                        Concluído</Checkbox>
                                </Flex>
                            </Box>
                        )}
                        {type === 5001 && (
                            <Box key={4}>
                                <Text
                                    alignSelf={'center'}
                                    fontFamily={'Poppins'}
                                    fontSize='1.3rem'
                                    fontStyle='normal'
                                    mb={1}
                                >Prioridade</Text>
                                <Flex
                                    direction={"column"}
                                    alignSelf={'left'}
                                    justifyContent={'center'}
                                    mr={2}
                                    mb={1}>
                                    <Checkbox size={"lg"}
                                        isChecked={selectedPriority.includes("Baixa")}
                                        onChange={() => handlePrioritySelect("Baixa")}>
                                        Baixa</Checkbox>

                                    <Checkbox size={"lg"}
                                        isChecked={selectedPriority.includes("Média")}
                                        onChange={() => handlePrioritySelect("Média")}>
                                        Média</Checkbox>


                                    <Checkbox size={"lg"}
                                        isChecked={selectedPriority.includes("Alta")}
                                        onChange={() => handlePrioritySelect("Alta")}>
                                        Alta</Checkbox>
                                </Flex>
                            </Box>
                        )}
                        {(steps !== undefined || requestForEvidence !== undefined) && (
                            <Box key={3}>
                                <Text
                                    alignSelf={'center'}
                                    fontFamily={'Poppins'}
                                    fontSize='1.3rem'
                                    fontStyle='normal'
                                    mb={1}
                                >Tipo</Text>
                                <Flex
                                    direction={"column"}
                                    alignSelf={'left'}
                                    justifyContent={'center'}>
                                    <Checkbox size={"lg"}
                                        isChecked={selectedType?.includes("Processos")}
                                        onChange={() => handleTypeSelect("Processos")}>
                                        Processos</Checkbox>

                                    {steps !== undefined && (
                                        <Checkbox size={"lg"}
                                            isChecked={selectedType?.includes("Etapas")}
                                            onChange={() => handleTypeSelect("Etapas")}>
                                            Etapas</Checkbox>
                                    )}

                                    {requestForEvidence !== undefined && (
                                        <Checkbox size={"lg"}
                                            isChecked={selectedType?.includes("Requisições de Evidência")}
                                            onChange={() => handleTypeSelect("Requisições de Evidência")}>
                                            Requisições de Evidência</Checkbox>
                                    )}
                                </Flex>
                            </Box>
                        )}


                    </Flex>
                    <ButtonGroup gap="240" mt={5}>

                        <Button
                            bg='#53C4CD' variant='solid' textColor='white' mt={3} mb={3} width='100%' onClick={resetFilters}>Desfazer filtros
                        </Button>


                        <Button bg='#53C4CD' variant='solid' textColor='white' mt={3} mb={3} width='100%' type="submit">Aplicar filtros</Button>
                    </ButtonGroup>


                </form>
            </ModalGeneric>
        </>
    )
}