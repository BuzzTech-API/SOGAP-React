import { UpDownIcon } from "@chakra-ui/icons"
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Box, Text, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import Process from "../models/Process"
import { formatDateToBrasil } from "../services/formatDate"
import { BtnDeleteProcess } from "./BtnDeleteProcess"
import { ModalUpdateProcess } from "./Modal/ModalEditarProcesso"
import ProgressBar from "./ProgressBar"
import { useEffect, useState } from "react"
import { getProcessById } from "../services/process"
import User from "../models/User"

interface propsTabela {
    role: string,
    sortProcess: Process[],
    setSortProcess: React.Dispatch<React.SetStateAction<Process[]>>,
    processes: Process[],
    setProcesses: React.Dispatch<React.SetStateAction<Process[]>>,
    setProcess?: React.Dispatch<React.SetStateAction<Process>>,
    setManager?: React.Dispatch<React.SetStateAction<User | undefined>>
    manager?: User | undefined
}

export const TabelaCLevel = ({ role, sortProcess, setSortProcess, processes, setProcesses, setProcess,setManager, manager }: propsTabela) => {
    const [sortTitle, setSortTitle] = useState(false)
    const [sortEndingDate, setSortEndingDate] = useState(false)
    const [sortProgress, setSortProgress] = useState(false)
    const [listProcess, setListProcess] = useState(new Array<Process>())
    const [sortStatus, setSortStatus] = useState('Concluído')

    useEffect(() => {
        (async () => {
            const processList = await Promise.all(processes.map(async process => {
                return await getProcessById(process.id)
            }))
            const filteredProcessList = processList.filter(process => process !== null) as Process[]
            setListProcess(filteredProcessList)
            if (manager !== undefined) {
                const filteredProcessesByManager = filteredProcessList.filter(process => {
                    const managerProcess = process.users.filter(user=> user.id ===manager.id)
                    if (managerProcess.length !== 0) {
                        return process
                    }
                    
                })
                 
                setListProcess(filteredProcessesByManager)
                setSortProcess(filteredProcessesByManager)
            }


        })()
    }, [processes, manager])

    const sortByCompletedSteps = () => {
        const sortedProcesses = [...listProcess].sort((a, b) => {
            const completedStepsA = a.steps ? a.steps.filter(step => step.status === 'Concluído').length : 0
            const completedStepsB = b.steps ? b.steps.filter(step => step.status === 'Concluído').length : 0
            return sortProgress ? completedStepsB - completedStepsA : completedStepsA - completedStepsB
        })
        setSortProcess(sortedProcesses)
        setSortProgress(!sortProgress)
    }

    const sortByTitle = () => {
        const sortedProcesses = [...processes].sort((a, b) => {
            const titleA = a.title.toUpperCase()
            const titleB = b.title.toUpperCase()
            if (titleA < titleB)
                return sortTitle ? 1 : -1
            if (titleA > titleB)
                return sortTitle ? -1 : 1
            return 0
        })
        setSortProcess(sortedProcesses)
        setSortTitle(!sortTitle)
    }



    const sortByLastUpdate = () => {
        const sortedProcesses = [...processes].sort((a, b) => {
            const dateA = new Date(a.endingDate)
            const dateB = new Date(b.endingDate)

            return sortEndingDate ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
        })
        setSortProcess(sortedProcesses)
        setSortEndingDate(!sortEndingDate)
    }

    const sortByStatus = () => {
        const statusOrder: { [key: string]: number } = {
            'Concluído': sortStatus === 'Concluído' ? 1 : 4,
            'Iniciado': sortStatus === 'Iniciado' ? 1 : sortStatus === 'Concluído' ? 2 : 3,
            'Não iniciado': sortStatus === 'Não iniciado' ? 1 : sortStatus === 'Iniciado' ? 2 : 3
        }
        const sortedProcesses = [...processes].sort((a, b) => {
            const orderA = statusOrder[a.status]
            const orderB = statusOrder[b.status]
            if (orderA < orderB)
                return -1
            if (orderA > orderB)
                return 1
            return 0
        })
        setSortProcess(sortedProcesses)
        if (sortStatus === 'Concluído') {
            setSortStatus('Iniciado');
        } else if (sortStatus === 'Iniciado') {
            setSortStatus('Não iniciado');
        } else {
            setSortStatus('Concluído');
        }
    }

    return (
        <TableContainer
            width={['100%']}
            maxW={'100.125rem'}
            height='21.5rem'
            alignSelf={'center'}
            bg={'#58595B'}
            borderRadius={'0.75rem'}
            overflowX={['auto']}
            overflowY={'auto'}
        >
            <Table color={'#FFF'} variant={'striped'} bg={'#58595B'} colorScheme="theme">
                <Thead
                    bg={'#58595B'}
                    position="sticky"
                    top="0"
                    zIndex="sticky"
                    key={-9987896}
                >
                    <Tr >
                        <Th color={'#FFF'} onClick={sortByTitle} key={-981}>Título
                            <UpDownIcon boxSize={5} mx={2} />
                        </Th>
                        <Th color={'#FFF'} onClick={sortByCompletedSteps} key={-89851}>Progresso
                            <UpDownIcon boxSize={5} mx={2} />
                        </Th>

                        <Th textAlign="center" color={'#FFF'} onClick={sortByLastUpdate} key={-3467}>Prazo
                            <UpDownIcon boxSize={5} mx={2} />
                        </Th>

                        <Th textAlign="center" color={'#FFF'} onClick={sortByStatus} key={-86545323}>Status
                            <UpDownIcon boxSize={5} mx={2} />

                        </Th>
                        {role !== null && role !== 'C-Level' && <Th textAlign="center" color={'#FFF'} key={-2142434}>Ações</Th>}

                    </Tr>
                </Thead>
                {setProcess !== undefined ?
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
                                <Tr key={'Process Table Key: ' + process.id} onClick={() => setProcess(process)} maxHeight={'3rem'} _selection={{ backgroundColor: "#FFFFFF" }}>

                                    <Td minWidth='30rem'>{process.title}</Td>
                                    <Td minWidth='18rem' maxW={'18rem'} maxH={'3rem'}><ProgressBar process={process} /></Td>
                                    <Td textAlign="center">{formatDateToBrasil(process.endingDate.toString())}</Td>
                                    <Td><Box
                                        width={'9rem'}
                                        h={'2rem'}
                                        bg={bgColorStatus}
                                        borderRadius={'0.2rem'}
                                        alignItems={'center'}
                                        display={'flex'}
                                        alignSelf={'center'}
                                        alignContent={'center'}
                                        justifyContent={'center'}
                                        textAlign={'center'}
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
                                    {role !== null && role !== 'C-Level' && <Td
                                        display={'flex'}
                                        gap={'0.3rem'}
                                        h={'7rem'}
                                        alignItems={'center'}
                                    >
                                        {role !== null && (role === 'Gerente' || role === 'Lider' || role === 'Administrador') && <ModalUpdateProcess process_id={process.id.toString()} processes={processes} setProcesses={setProcesses} />}
                                        {role !== null && (role === 'Gerente' || role === 'Administrador') && <BtnDeleteProcess process={process} processes={processes} setProcess={setProcesses} />}
                                        <Link to={`/process/${process.id}`}><Button
                                            _hover={{ background: '#FFF', color: '#58595B' }}
                                            bg='#53C4CD' variant='solid' textColor='white' >Visualizar</Button></Link>
                                    </Td>}
                                </Tr>
                            )
                        })}
                    </Tbody> :
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
                                <Tr key={'Process Table Key: ' + process.id} maxHeight={'3rem'} _selection={{ backgroundColor: "#FFFFFF" }}>

                                    <Td
                                        minWidth='30rem'
                                        maxH={'7rem'}
                                        h={'6.3rem'}
                                    >{process.title}</Td>
                                    <Td
                                        minWidth='20rem'
                                        maxH={'6.3rem'}
                                        h={'6.3rem'}
                                        maxW={'20rem'}
                                    ><ProgressBar process={process} /></Td>
                                    <Td
                                        textAlign="center"
                                        maxH={'7rem'}
                                        h={'7rem'}
                                    >{formatDateToBrasil(process.endingDate.toString())}</Td>
                                    <Td
                                        maxH={'7rem'}
                                        h={'7rem'}
                                    ><Box
                                        width={'9rem'}
                                        h={'2rem'}
                                        bg={bgColorStatus}
                                        borderRadius={'0.2rem'}
                                        alignItems={'center'}
                                        display={'flex'}
                                        alignSelf={'center'}
                                        alignContent={'center'}
                                        justifyContent={'center'}
                                        textAlign={'center'}
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
                                    {role !== null && role !== 'C-Level' && <Td
                                        display={'flex'}
                                        gap={'0.3rem'}
                                        maxH={'7rem'}
                                        h={'7rem'}
                                        alignItems={'center'}
                                    >
                                        {
                                            role !== null &&
                                            (role === 'Gerente' || role === 'Lider' || role === 'Administrador') &&
                                            <ModalUpdateProcess
                                                process_id={process.id.toString()}
                                                processes={processes}
                                                setProcesses={setProcesses}
                                            />
                                        }
                                        {
                                            role !== null &&
                                            (role === 'Gerente' || role === 'Administrador') &&
                                            <BtnDeleteProcess
                                                process={process}
                                                processes={processes}
                                                setProcess={setProcesses}
                                                setSortProcess={setSortProcess}
                                                sortProcess={sortProcess}
                                            />
                                        }
                                        <Link to={`/process/${process.id}`}><Button
                                            _hover={{ background: '#FFF', color: '#58595B' }}
                                            bg='#53C4CD' variant='solid' textColor='white'>Visualizar</Button></Link>
                                    </Td>}
                                </Tr>
                            )
                        })}
                    </Tbody>}
            </Table>
        </TableContainer>
    )
}
