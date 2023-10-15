import React, { useEffect, useState } from "react"
import { Box, Button, Text, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Spacer } from "@chakra-ui/react"
import Process from "../models/Process"
import { CardProcess } from "../components/Card/cardProcessoPrazo"
import FormP from "../components/FormProcess"
import { getAllProcess } from "../services/process"
import { Link } from "react-router-dom"
import { formatDateToBrasil } from "../services/formatDate"
import { BtnDeleteProcess } from "../components/BtnDeleteProcess"
import { ModalUpdateProcess } from "../components/Modal/ModalEditarProcesso"
import { verifyTokenFetch } from "../services/token"


export const Home = () => {
    const [processes, setProcesses] = useState(new Array<Process>())
    useEffect(() => {
        (async () => {
            await verifyTokenFetch()
            const processList = await getAllProcess()
            if (processList) {
                setProcesses(processList)
            }
        })();
    }, [])


    return (<Flex flexDirection={'column'} gap={'0.5rem'}>
        <Flex
            width='100.125rem'
            alignSelf={'center'}
            flexDirection='row'
            flexWrap="wrap"
            gap='1rem'
            marginTop={'1rem'}
            maxHeight='18rem'
            maxWidth={'110rem'}
            overflowY={'auto'} >
            {processes.map((process: Process) => {
                return <Link to={`/process/${process.id}`}><CardProcess key={process.id}
                    process={process}
                /></Link>
            })}
        </Flex>
        <Flex flexDirection={'column'} gap={'0.25rem'}>

            <Flex width='100.125rem' alignSelf={'center'} marginTop='1rem'>
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
                <Spacer />
                <Box
                    alignSelf={'center'}
                    display={'flex'}
                    justifyContent={'right'}
                >
                    <FormP width={'9rem'} processes={processes} setProcesses={setProcesses} />
                </Box>
            </Flex>

            <TableContainer
                width='100.125rem'
                height='19rem'
                alignSelf={'center'}
                bg={'#58595B'}
                borderRadius={'0.75rem'}
                overflowY={'auto'}
            >
                <Table color={'#FFF'} bg={'#58595B'} variant='striped' colorScheme="theme" >
                    <Thead

                        bg={'#58595B'}
                        position="sticky"
                        top="0"
                        zIndex="sticky"
                    >
                        <Tr >
                            <Th color={'#FFF'}>Título</Th>
                            <Th textAlign="center" color={'#FFF'}>Última Atualização</Th>
                            <Th textAlign="center" color={'#FFF'}>Status</Th>
                            <Th textAlign="center" color={'#FFF'}>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {processes.map((process: Process) => {
                            return (
                                <Tr>

                                    <Td minWidth='50rem'>{process.title}</Td>
                                    <Td textAlign="center">{formatDateToBrasil(process.lastUpdate.toString())}</Td>
                                    <Td>{process.status}</Td>
                                    <Td
                                        display={'flex'}
                                        gap={'0.3rem'}>
                                        <ModalUpdateProcess process_id={process.id.toString()} processes={processes} setProcesses={setProcesses} />
                                        <BtnDeleteProcess process={process} processes={processes} setProcess={setProcesses} />
                                        <Link to={`/process/${process.id}`}><Button
                                            bg='#53C4CD'
                                            variant='solid'
                                            textColor='white'
                                        >Visualizar</Button></Link>
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