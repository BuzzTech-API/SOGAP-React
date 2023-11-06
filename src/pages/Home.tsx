import React, { useEffect, useState } from "react"
import { Box, Button, Text, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Spacer, Input } from "@chakra-ui/react"
import Process from "../models/Process"
import FormP from "../components/FormProcess"
import { Link, Navigate } from "react-router-dom"
import { formatDateToBrasil } from "../services/formatDate"
import { BtnDeleteProcess } from "../components/BtnDeleteProcess"
import { ModalUpdateProcess } from "../components/Modal/ModalEditarProcesso"
import { getMyRelatedData } from "../services/users"
import Step from "../models/Steps"
import RequestForEvidence from "../models/RequestForEvidence"

import { CardProcessoPrazo } from "../components/Card/cardProcessHome"
import { CardShowStepHome } from "../components/Card/cardShowStepHome"

import { ModalFilter } from "../components/Modal/ModalFilters"
import { UpDownIcon } from "@chakra-ui/icons"
import { CardRequestEvidence } from "../components/Card/cardRequestEvidence"
import ProgressBar from "../components/ProgressBar"
import { TabelaCLevel } from "../components/TabelaCLevel"




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

    const handleClick = () => {
    };

    return (<Flex flexDirection={'column'}>

        {role === 'C-Level' && (
            <Navigate to="/clevel" replace={true} />
        )}
        <Flex width={['100%']} maxWidth={'100.125rem'} alignSelf={'center'} marginTop='1rem' key={'Flex Próximo do Prazo'}>
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
                key={-1898009}
            />
        </Flex>
        <Flex
            width={['100%']}
            alignSelf={'center'}
            flexDirection='row'
            flexWrap={["nowrap", "wrap"]}
            gap='1rem'
            marginTop={'1rem'}
            maxHeight='22rem'
            minHeight='22rem'
            key={'Flex Cards do Proximo do Prazo'}
            maxWidth={'100.125rem'}
            overflowY={'auto'} >
            {requestForEvidence.map((requestForEvidence: RequestForEvidence) => {
                if (requestForEvidence.is_validated) {
                    return
                }
                return <Link to={''} key={'Link to Request Card:' + requestForEvidence.id}>
                    <CardRequestEvidence key={'request:' + requestForEvidence.id}
                        requestEvidence={requestForEvidence}
                    />
                </Link>
            })}
            {filteredProcesses.map((process: Process) => {
                return <Link to={`/process/${process.id}`} key={'Link to Process Card:' + process.id}><CardProcessoPrazo key={"process:" + process.id}
                    process={process}
                /></Link>
            })}
            {steps.map((step: Step) => {
                return <Link to={`/process/${step.process_id}`} key={'Link to Process Card Step:' + step.id}><CardShowStepHome key={"Etapa:" + step.id} onClick={handleClick}
                    step={step}
                /></Link>
            })}
        </Flex>
        <Flex flexDirection={'column'} gap={'0.25rem'} key={'Flex Meus processos'}>

            <Flex width={['100%']}
                maxWidth={'100.125rem'}
                alignSelf={'center'}
                marginTop='1rem'
                flexWrap={['wrap']}
                gap={'0.5rem'}
                padding={'0.5rem'}
                display={['flex', 'none']}
                key={'Flex Meus processos Tela pequena'}
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
                            <FormP
                                width={'9rem'}
                                processes={processes}
                                setProcesses={setProcesses}
                                setSortProcess={setSortProcess}
                                sortProcess={sortProcess}
                            />
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
                key={'Flex Meus processos Tela Grande'}
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
                            <FormP
                                width={'9rem'}
                                processes={processes}
                                setProcesses={setProcesses}
                                setSortProcess={setSortProcess}
                                sortProcess={sortProcess}
                            />
                        </Box>
                    </>)}


            </Flex>
            {role !== null &&

                <TabelaCLevel
                    processes={processes}
                    setProcesses={setProcesses}
                    sortProcess={sortProcess}
                    setSortProcess={setSortProcess}
                    role={role}
                    key={'tabela dos processos'}
                />

            }
        </Flex>
    </Flex>
    )
}