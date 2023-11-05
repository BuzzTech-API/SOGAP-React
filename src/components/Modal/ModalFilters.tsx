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
    processes?: Array<Process>
    steps?: Array<Step>
    requestForEvidence?: Array<RequestForEvidence>
}

export const ModalFilter = ({ setProcess, processes, setSteps, steps, setRequestForEvidence, requestForEvidence }: FilterSettings) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedDates, setSelectedDates] = useState<string[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string[]>([])
    const [filterProcess, setFilterProcess] = useState(new Array<Process>())
    const [selectedType, setSelectedType] = useState<string[]>([])




    useEffect(() => {
        (async () => {
            await verifyTokenFetch()
            const userContent = await getMyRelatedData()

            if (userContent && setProcess) {
                setProcess(userContent.processes)
                setFilterProcess(userContent.processes)

                if(setSteps && setRequestForEvidence)
                    setSteps(userContent.steps)
                if(setRequestForEvidence)
                    setRequestForEvidence(userContent.requests)
            }
        })();
    }, [setProcess, setRequestForEvidence, setSteps])

    const handleDateSelect = (date: string) => {
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter(x => x !== date))
            console.log(selectedDates)
        } else {
            setSelectedDates([...selectedDates, date])
            console.log(selectedDates)
        }
    }

    const handleStatusSelect = (status: string) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(x => x !== status))
        } else {
            setSelectedStatus([...selectedStatus, status])
        }
    }

    const handleTypeSelect = (type: string) => {
        if (selectedType.includes(type)) {
            setSelectedType(selectedType.filter(x => x !== type))
        } else {
            setSelectedType([...selectedType, type])
        }
    }

    const resetFilters = () => {
        console.log(processes)
        if (setProcess)
            setProcess(filterProcess)
        setSelectedDates([])
        setSelectedStatus([])
        onClose()
    }


    const filterProcesses = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (setProcess)
            setProcess(filterProcess)
        const filteredProcesses = filterProcess.filter((process) => {
            return (
                (selectedDates.length === 0 || selectedDates.includes(process.lastUpdate.toString())) &&
                (selectedStatus.length === 0 || selectedStatus.includes(process.status))
                )
        })
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
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="50rem" heightModal="lg">
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
                        justify={['column', 'row']}
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
                                overflowY={'auto'}>
                                {[...(filterProcess.map(process => process.lastUpdate))].filter((value,
                                    index, self) => self.indexOf(value) === index).sort((a, b) =>
                                        new Date(a).getTime() - new Date(b).getTime()).map((date, key) => (
                                            <Table key={key}>
                                                <Checkbox size={"lg"}
                                                    isChecked={selectedDates.includes(date.toString())}
                                                    onChange={() => handleDateSelect(date.toString())}>
                                                    {date.toString()}
                                                </Checkbox>
                                            </Table>
                                        ))}
                            </Flex>
                        </Box>

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
                                mr={2}>
                                <Checkbox size={"lg"}
                                    isChecked={selectedStatus.includes("Não iniciado")}
                                    onChange={() => handleStatusSelect("Não iniciado")}>
                                    Não iniciado</Checkbox>

                                <Checkbox size={"lg"}
                                    isChecked={selectedStatus.includes("Em andamento")}
                                    onChange={() => handleStatusSelect("Em andamento")}>
                                    Em andamento</Checkbox>


                                <Checkbox size={"lg"}
                                    isChecked={selectedStatus.includes("Concluído")}
                                    onChange={() => handleStatusSelect("Concluído")}>
                                    Concluído</Checkbox>
                            </Flex>
                        </Box>
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
                                        isChecked={selectedType.includes("Processos")}
                                        onChange={() => handleTypeSelect("Processos")}>
                                        Processos</Checkbox>

                                    {steps !== undefined && (
                                        <Checkbox size={"lg"}
                                            isChecked={selectedType.includes("Etapas")}
                                            onChange={() => handleTypeSelect("Etapas")}>
                                            Etapas</Checkbox>
                                    )}

                                    {requestForEvidence !== undefined && (
                                        <Checkbox size={"lg"}
                                            isChecked={selectedType.includes("Requisições de Evidência")}
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