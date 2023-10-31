import React, { useEffect, useState } from "react"
import { Box, Button, Text, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Spacer, Input } from "@chakra-ui/react"
import Process from "../models/Process"
import FormP from "../components/FormProcess"
import { Link } from "react-router-dom"
import { formatDateToBrasil } from "../services/formatDate"
import { BtnDeleteProcess } from "../components/BtnDeleteProcess"
import { ModalUpdateProcess } from "../components/Modal/ModalEditarProcesso"
import { getMyRelatedData } from "../services/users"
import Step from "../models/Steps"
import RequestForEvidence from "../models/RequestForEvidence"
import { CardProcessoPrazo } from "../components/Card/cardProcessoPrazo"
import { ModalFilter } from "../components/Modal/ModalFilters"
import { UpDownIcon } from "@chakra-ui/icons"
import { CardRequestEvidence } from "../components/Card/cardRequestEvidence"



export const Home = () => {
    const [processes, setProcesses] = useState(new Array<Process>())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [steps, setSteps] = useState(new Array<Step>())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [requestForEvidence, setRequestForEvidence] = useState(new Array<RequestForEvidence>())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [role, setRole] = useState(localStorage.getItem('cargo'))
    const [filteredProcesses, setFilteredProcesses] = useState(new Array<Process>())
    const [sortProcess, setSortProcess] = useState(new Array<Process>())
    const [sortTitle, setSortTitle] = useState(false)
    const [sortLastUpdate, setSortLastUpdate] = useState(false)
    const [sortStatus, setSortStatus] = useState(false)

    useEffect(() => {
        (async () => {
            
            const userContent = await getMyRelatedData()
            
            if (userContent) {
                setProcesses(userContent.processes)
                setSteps(userContent.steps)
                setRequestForEvidence(userContent.requests)
                setSortProcess(userContent.processes)
            }
                
        })()
    }, [])


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

    return (<Flex flexDirection={'column'}>

        <Flex width={['100%']} maxWidth={'100.125rem'} alignSelf={'center'} marginTop='1rem' key={1}>
            <Text
                fontFamily={'Poppins'}
                fontSize='1.5rem'
                fontStyle='normal'
                fontWeight='700'
                lineHeight='2rem'
                alignSelf={'start'}
                display={'flex'}
                width={'14rem'}
                color={'#FF2828'}
                key={-124}
            >Próximo do Prazo</Text>
            <ModalFilter
                setProcess={setFilteredProcesses}
                processes={filteredProcesses}
                setSteps={steps.length > 0 ? setSteps : undefined}
                steps={steps.length > 0 ? steps : undefined}
                setRequestForEvidence={requestForEvidence.length > 0 ? setRequestForEvidence : undefined}
                requestForEvidence={requestForEvidence.length > 0 ? requestForEvidence : undefined} 
                key={-1}
                />
        </Flex>
        <Flex
            width={['100%']}
            alignSelf={'center'}
            flexDirection='row'
            flexWrap={["nowrap", "wrap"]}
            gap='1rem'
            marginTop={'1rem'}
            maxHeight='18rem'
            minHeight='18rem'
            key={2}
            maxWidth={'100.125rem'}
            overflowY={'auto'} >
            {filteredProcesses.map((process: Process) => {
                return <Link to={`/process/${process.id}`} key={process.id}><CardProcessoPrazo key={process.id}
                    process={process}
                /></Link>
            })}
            {requestForEvidence.map((requestForEvidence: RequestForEvidence) => {
                return <CardRequestEvidence key={requestForEvidence.id}
                    requestEvidence={requestForEvidence}
                />
            })}

        </Flex>
        <Flex flexDirection={'column'} gap={'0.25rem'} key={3}>

            <Flex width={['100%']}
                maxWidth={'100.125rem'}
                alignSelf={'center'}
                marginTop='1rem'
                flexWrap={['wrap']}
                gap={'0.5rem'}
                padding={'0.5rem'}
                display={['flex', 'none']}
            >
                <Text
                    fontFamily={'Poppins'}
                    fontSize='1.5rem'
                    fontStyle='normal'
                    fontWeight='700'
                    lineHeight='2rem'
                    alignSelf={'start'}
                    display={'flex'}
                    width={'14rem'}
                    color={'#FFF'}

                >Meus Processos</Text>




                {role !== null && (role === 'Gerente' || role === 'Administrador') && (
                    <>


                        <Box
                            alignSelf={'center'}
                            display={'flex'}
                            justifyContent={'right'}
                        >
                            <FormP width={'9rem'} processes={processes} setProcesses={setProcesses} />
                        </Box>
                    </>
                )}
                <Spacer />

                <ModalFilter
                    setProcess={setSortProcess}
                    processes={processes} />

                <Input
                    placeholder="Pesquisar por nome de processo"
                    onChange={(e) => {
                        if (e.target.value === '') {
                            setSortProcess(processes)
                        } else {

                            setSortProcess(processes.filter(process => {
                                return process.title.toLowerCase().includes(e.target.value.toLowerCase());
                            }))
                        }
                    }}
                    color={'#FFF'}
                    width={['100%', "20rem"]}
                    bg={'#58595B'}
                    borderRadius={'0.75rem'}
                />

            </Flex>

            <Flex width={['100%']}
                maxWidth={'100.125rem'}
                alignSelf={'center'}
                marginTop='1rem'
                flexWrap={['wrap']}
                gap={'0.5rem'}
                padding={'0.5rem'}
                display={['none', 'flex']}
            >
                <Text
                    fontFamily={'Poppins'}
                    fontSize='1.5rem'
                    fontStyle='normal'
                    fontWeight='700'
                    lineHeight='2rem'
                    alignSelf={'start'}
                    display={'flex'}
                    width={'14rem'}
                    color={'#FFF'}

                >Meus Processos</Text>

                <ModalFilter
                    setProcess={setSortProcess}
                    processes={processes} />

                <Input
                    placeholder="Pesquisar por nome de processo"
                    onChange={(e) => {
                        if (e.target.value === '') {
                            setSortProcess(processes)
                        } else {

                            setSortProcess(processes.filter(process => {
                                return process.title.toLowerCase().includes(e.target.value.toLowerCase());
                            }))
                        }
                    }}
                    color={'#FFF'}
                    width={['100%', "20rem"]}
                    bg={'#58595B'}
                    borderRadius={'0.75rem'}
                />

                <Spacer />

                {role !== null && (role === 'Gerente' || role === 'Administrador') && (
                    <>


                        <Box
                            alignSelf={'center'}
                            display={'flex'}
                            justifyContent={'right'}
                        >
                            <FormP width={'9rem'} processes={processes} setProcesses={setProcesses} />
                        </Box>
                    </>)}


            </Flex>


            <TableContainer
                width={['100%']}
                maxW={'100.125rem'}
                height='19rem'
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

                            <Th textAlign="center" color={'#FFF'} onClick={sortByLastUpdate} key={2}>Última Atualização
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
                            return (
                                <Tr key={process.id}>

                                    <Td minWidth='50rem'>{process.title}</Td>
                                    <Td textAlign="center">{formatDateToBrasil(process.lastUpdate.toString())}</Td>
                                    <Td>{process.status}</Td>
                                    <Td
                                        display={'flex'}
                                        gap={'0.3rem'}>
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
        </Flex>
    </Flex>
    )
}