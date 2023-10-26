import React, { useEffect, useState } from "react";
import { Box, Button, Text, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Spacer, Input } from "@chakra-ui/react";
import Process from "../models/Process";
import FormP from "../components/FormProcess";
import { getAllProcess } from "../services/process";
import { Link } from "react-router-dom";
import { formatDateToBrasil } from "../services/formatDate";
import { BtnDeleteProcess } from "../components/BtnDeleteProcess";
import { ModalUpdateProcess } from "../components/Modal/ModalEditarProcesso";
import { verifyTokenFetch } from "../services/token";
import { getMyRelatedData } from "../services/users";
import Step from "../models/Steps";
import RequestForEvidence from "../models/RequestForEvidence";
import { CardProcessoPrazo } from "../components/Card/cardProcessoPrazo";

export const Home = () => {
  const [processes, setProcesses] = useState(new Array<Process>());
  const [steps, setSteps] = useState(new Array<Step>());
  const [requestForEvidence, setRequestForEvidence] = useState(new Array<RequestForEvidence>());
  const [role, setRole] = useState(localStorage.getItem('cargo'));
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    (async () => {
      await verifyTokenFetch();
      const userContent = await getMyRelatedData();
      if (userContent) {
        setProcesses(userContent.processes);
        setSteps(userContent.steps);
        setRequestForEvidence(userContent.requests);
      }
    })();
  }, []);

  const filteredProcesses = processes.filter(process => {
    return process.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Flex flexDirection={'column'}>
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
          color={'#FF2828'}
        >Próximo do Prazo</Text>
      </Flex>
      <Flex
        width='100.125rem'
        alignSelf={'center'}
        flexDirection='row'
        flexWrap="wrap"
        gap='1rem'
        marginTop={'1rem'}
        maxHeight='18rem'
        minHeight='18rem'
        maxWidth={'110rem'}
        overflowY={'auto'}
      >
        {filteredProcesses.map((process: Process) => {
          return <Link to={`/process/${process.id}`}><CardProcessoPrazo key={process.id} process={process} /></Link>;
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
          {role !== null && (role === 'Gerente' || role === 'Administrador') && (
            <>
              <Spacer />
              <Box alignSelf={'center'} display={'flex'} justifyContent={'right'}>
                <FormP width={'9rem'} processes={processes} setProcesses={setProcesses} />
              </Box>
            </>
          )}
        </Flex>
        <Input
            placeholder="Pesquisar por nome de processo"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            color={'#FFF'}
            width="20rem"
            bg={'#58595B'}
            borderRadius={'0.75rem'}
            marginLeft={'2.75rem'}
            />
        <TableContainer
          width='100.125rem'
          height='19rem'
          alignSelf={'center'}
          bg={'#58595B'}
          borderRadius={'0.75rem'}
          overflowY={'auto'}
        >
          <Table color={'#FFF'} bg={'#58595B'} variant='striped' colorScheme="theme">
            <Thead
              bg={'#58595B'}
              position="sticky"
              top="0"
              zIndex="sticky"
            >
              <Tr>
                <Th color={'#FFF'}>Título</Th>
                <Th textAlign="center" color={'#FFF'}>Última Atualização</Th>
                <Th textAlign="center" color={'#FFF'}>Status</Th>
                <Th textAlign="center" color={'#FFF'}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProcesses.map((process: Process) => {
                return (
                  <Tr>
                    <Td minWidth='50rem'>{process.title}</Td>
                    <Td textAlign="center">{formatDateToBrasil(process.lastUpdate.toString())}</Td>
                    <Td>{process.status}</Td>
                    <Td
                      display={'flex'}
                      gap={'0.3rem'}
                    >
                      {role !== null && (role === 'Gerente' || role === 'Lider' || role === 'Administrador') && <ModalUpdateProcess process_id={process.id.toString()} processes={processes} setProcesses={setProcesses} />}
                      {role !== null && (role === 'Gerente' || role === 'Administrador') && <BtnDeleteProcess process={process} processes={processes} setProcess={setProcesses} />}
                      <Link to={`/process/${process.id}`}><Button bg='#53C4CD' variant='solid' textColor='white'>Visualizar</Button></Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};
