import { Box, Button, ButtonGroup, Checkbox, Flex, Table, useDisclosure, Text } from "@chakra-ui/react"
import { ModalGeneric } from "./Modal"
import { useState } from "react"
import Process from "../../models/Process"

interface FilterSettings {
    setSortProcess: React.Dispatch<React.SetStateAction<Process[]>>
    processes: Array<Process>
}

export const ModalFilter = ({ setSortProcess, processes }: FilterSettings) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedDates, setSelectedDates] = useState<string[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string[]>([])


    const handleDateSelect = (date: string) => {
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter(x => x !== date));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    }

    const handleStatusSelect = (status: string) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(x => x !== status))
        } else {
            setSelectedStatus([...selectedStatus, status])
        }
    }

    const resetFilters = () => {
        setSortProcess(processes)
        setSelectedDates([])
        setSelectedStatus([])
        onClose()
    }


    const filterProcesses = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSortProcess(processes)

        const filteredProcesses = processes.filter((process) => {
            return (
                (selectedDates.length === 0 || selectedDates.includes(process.lastUpdate.toString())) &&
                (selectedStatus.length === 0 || selectedStatus.includes(process.status))
            )
        })
        setSortProcess(filteredProcesses)
        onClose()
    }

    return (
        <>
            <Button
                margin=''
                aria-label="Btn Add Processo"
                bg="#29784E"
                color="white"
                _hover={{ color: "#29784E", bg: "white" }}
                onClick={onOpen}
            >Filtros</Button>
            <ModalGeneric isOpen={isOpen} onClose={onClose} widthModal="40rem">
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
                            width={'60%'}>
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
                                {[...(processes.map(process => process.lastUpdate))].filter((value,
                                    index, self) => self.indexOf(value) === index).sort((a, b) =>
                                        new Date(a).getTime() - new Date(b).getTime()).map((date) => (
                                            <Table>
                                                <Checkbox size={"lg"}
                                                    isChecked={selectedDates.includes(date.toString())}
                                                    onChange={() => handleDateSelect(date.toString())}>
                                                    {date.toString()}
                                                </Checkbox>
                                            </Table>
                                        ))}
                            </Flex>
                        </Box>

                        <Box>
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
                                justifyContent={'center'}>
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