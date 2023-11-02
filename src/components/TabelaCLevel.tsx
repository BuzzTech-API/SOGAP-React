import { UpDownIcon } from "@chakra-ui/icons"
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Box, Text, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Process from "../models/Process"
import { formatDateToBrasil } from "../services/formatDate"
import { BtnDeleteProcess } from "./BtnDeleteProcess"
import { ModalUpdateProcess } from "./Modal/ModalEditarProcesso"
import ProgressBar from "./ProgressBar"
import { useState } from "react"

interface propsTabela {
    role: string,
    sortProcess: Process[],
    setSortProcess: React.Dispatch<React.SetStateAction<Process[]>>,
    processes: Process[],
    setProcesses: React.Dispatch<React.SetStateAction<Process[]>>,
}

export const TabelaCLevel = ({ role, sortProcess, setSortProcess, processes, setProcesses }: propsTabela) => {
    const [sortTitle, setSortTitle] = useState(false)
    const [sortLastUpdate, setSortLastUpdate] = useState(false)
    const [sortStatus, setSortStatus] = useState(false)


    const sortByTitle = () => {
        const sortedProcesses = [...processes].sort((a, b) => {
            if (a.title < b.title)
                return sortTitle ? 1 : -1
            if (a.title > b.title)
                return sortTitle ? -1 : 1
            return 0
        })
        setSortProcess(sortedProcesses)
        setSortTitle(!sortTitle)
    }

    const sortByLastUpdate = () => {
        const sortedProcesses = [...processes].sort((a, b) => {
            if (a.lastUpdate < b.lastUpdate)
                return sortLastUpdate ? 1 : -1
            if (a.lastUpdate > b.lastUpdate)
                return sortLastUpdate ? -1 : 1
            return 0
        })
        setSortProcess(sortedProcesses)
        setSortLastUpdate(!sortLastUpdate)
    }

    const sortByStatus = () => {
        const sortedProcesses = [...processes].sort((a, b) => {
            if (a.status < b.status)
                return sortStatus ? 1 : -1
            if (a.status > b.status)
                return sortStatus ? -1 : 1
            return 0
        })
        setSortProcess(sortedProcesses)
        setSortStatus(!sortStatus)
    }
    return (
        <TableContainer
            width={['100%']}
            maxW={'100.125rem'}
            height='25rem'
            alignSelf={'center'}
            bg={'#58595B'}
            borderRadius={'0.75rem'}
            overflowX={['auto']}
            overflowY={'auto'}
        >
            <Table color={'#FFF'} bg={'#58595B'} variant='striped' colorScheme="theme">
                <Thead
                    bg={'#58595B'}
                    position="sticky"
                    top="0"
                    zIndex="sticky"
                    key={0}
                >
                    <Tr >
                        <Th color={'#FFF'} onClick={sortByTitle} key={1}>Título
                            <UpDownIcon boxSize={5} mx={2} />
                        </Th>
                        <Th color={'#FFF'} onClick={sortByTitle} key={1}>Progresso

                        </Th>

                        <Th textAlign="center" color={'#FFF'} onClick={sortByLastUpdate} key={2}>Prazo
                            <UpDownIcon boxSize={5} mx={2} />
                        </Th>

                        <Th textAlign="center" color={'#FFF'} onClick={sortByStatus} key={3}>Status
                            <UpDownIcon boxSize={5} mx={2} />

                        </Th>
                        <Th textAlign="center" color={'#FFF'} key={4}>Ações</Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {sortProcess.map((process: Process) => {
                        let bgColorStatus = ''
                        if (process.status === 'Concluído') {
                            bgColorStatus = '#159900'
                        } else if (process.status === 'Iniciado') {
                            bgColorStatus = '#e2ce14'
                        } else {
                            bgColorStatus = '#00afff'
                        }
                        return (
                            <Tr key={process.id}>

                                <Td minWidth='30rem'>{process.title}</Td>
                                <Td minWidth='20rem'><Flex flexDirection={'column'}>
                <Text textColor={'#FFF'}>Etapas Concluídas 2/4</Text><ProgressBar process={process} /></Flex></Td>
                                <Td textAlign="center">{formatDateToBrasil(process.endingDate.toString())}</Td>
                                <Td><Box
                                    width={'9rem'}
                                    h={'2rem'}
                                    bg={bgColorStatus}
                                    borderRadius={'0.2rem'}
                                    alignItems={'center'}
                                    padding={'0.2rem'}
                                >
                                    <Text
                                        fontFamily="Poppins"
                                        fontWeight="bold"
                                        fontSize="1rem"
                                        color="#FFFFFF"
                                        textAlign="center"
                                        paddingTop={'0.2rem'}
                                        
                                    >
                                        {process.status}
                                    </Text>
                                </Box></Td>
                                <Td
                                    display={'flex'}
                                    gap={'0.3rem'}
                                    h={'6.3rem'}
                                    alignItems={'center'}
                                >
                                    {role !== null && (role === 'Gerente' || role === 'Lider' || role === 'Administrador') && <ModalUpdateProcess process_id={process.id.toString()} processes={processes} setProcesses={setProcesses} />}
                                    {role !== null && (role === 'Gerente' || role === 'Administrador') && <BtnDeleteProcess process={process} processes={processes} setProcess={setProcesses} />}
                                    <Link to={`/process/${process.id}`}><Button bg='#53C4CD' variant='solid' textColor='white'>Visualizar</Button></Link>
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
