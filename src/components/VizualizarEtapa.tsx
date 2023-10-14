import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Grid,
  Flex,
  CloseButton,
  Spacer,
} from '@chakra-ui/react';

// Importe o componente ModalUploadEvidence aqui
import RequestForEvidence from '../models/RequestForEvidence';
import Step from '../models/Steps';
import { StepUser } from '../interfaces/stepInterface';
import { ModalSolicitaEvidencia } from './Modal/BtnPedirEvidencia';
import { ViewRequest } from './Modal/ModalResquestForEvidence';
import { ModalUpdateStep } from './Modal/ModalEditarEtapa';
import { BtnDeleteEtapa } from './BtnDeleteEtapa';

interface VisualizarEtapaProps {
  step: Step
  onClose: ()=> void
}

const VisualizarEtapa: React.FC<VisualizarEtapaProps> = ({
  step, onClose
}) => {
  const previsaoTerminoFormatada = step.endingDate.toString();
  const [requests, setRequests] = useState(step.requests)

  console.log(step);
  
  return (
    <Box
      className="card"
      width="44rem"
      minHeight='55rem'
      margin="1rem 2rem"
      padding="1rem"
      border="1px solid #ccc"
      borderRadius="2rem"
      boxShadow="0 2px 4px #0000001a"
      backgroundColor="#292A2D"
      alignItems="center"
    >
      <Flex>

      <Heading paddingLeft={'12rem'} as="h2" size="lg" mb={4} className="Titulo" color="#54c5ce" textAlign="center">
        Detalhes da Etapa
      </Heading>
      <Spacer />
      <CloseButton onClick={onClose} />
      </Flex>

      <VStack align="start" spacing={4} color="#ffff">
        <Box>
          <Text fontWeight="bold" color="#53C4CD">Nome da Etapa:</Text>
          <Box
            borderRadius="12px"
            p="2"
            mt="2"
            backgroundColor="#58595B"
            width="42rem"
          >
            <Text color="#53C4CD">{step.name}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold" color="#53C4CD">Objetivo:</Text>
          <Box
            borderRadius="12px"
            p="2"
            mt="2"
            backgroundColor="#58595B"
            width="42rem"
            height="200px"
          >
            <Text color="#53C4CD">{step.objective}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold" color="#53C4CD">Previsão de Término:</Text>
          <Box
            borderRadius="8px"
            p="2"
            mt="2"
            backgroundColor="#58595B"
            width="42rem"
          >
            <Text color="#53C4CD">{previsaoTerminoFormatada}</Text>
          </Box>
        </Box>
        <Box>

          <Text fontWeight="bold" color="#53C4CD">Responsáveis:</Text>
        <Grid templateColumns='repeat(3, 1fr)' gap={'1rem'}>
          {step.users!==undefined?
          step.users.map((user: StepUser) => {
            
            
            return (
              <Box
                borderRadius="8px"
                p="2"
                mt="2"
                backgroundColor="#58595B"
                width="13rem"
                >
                <Text color="#53C4CD">{user.user.name}</Text>
              </Box>
            )
          }
          ):<></>}
        </Grid>
        </Box>

        <Divider />
        <Box>
          <Text fontWeight="bold" color="#53C4CD">Solicitação de Evidência:</Text>
        <Flex marginTop='1rem' flexWrap={'wrap'} maxWidth={'45rem'} gap={'0.5rem'}>

          {requests!== undefined ? requests.map((request:RequestForEvidence)=>{
            return(
              <><ViewRequest request={request} process_id={step.process_id}/></>
            )
          }): <></>}
          

        
        <ModalSolicitaEvidencia step_id={step.id} requests={requests} setRequests={setRequests} />
        <ModalUpdateStep step = {step}/>
        <BtnDeleteEtapa etapa ={step}/>
        </Flex>
        </Box>


      </VStack>
    </Box>
  );
};

export default VisualizarEtapa;