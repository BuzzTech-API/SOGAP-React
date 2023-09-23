import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Grid,
  Flex,
  CloseButton,
  Spacer,
} from '@chakra-ui/react';

// Importe o componente ModalUploadEvidence aqui
import { ModalUploadEvidence } from './UploadEvidence';
import User from '../models/User';
import RequestForEvidence from '../models/RequestForEvidence';
import Step from '../models/Steps';
import { StepUser } from '../interfaces/stepInterface';

interface VisualizarEtapaProps {
  step: Step
  onClose: ()=> void
}

const VisualizarEtapa: React.FC<VisualizarEtapaProps> = ({
  step, onClose
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const previsaoTerminoFormatada = step.endingDate.toString();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
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
          {step.requestsForEvidence!== undefined? step.requestsForEvidence.map((requestsForEvidence:RequestForEvidence)=>{
            return(
              <Box>
                <Text color="#53C4CD">{requestsForEvidence.requiredDocument}</Text>
              </Box>
            )
          }): <></>}
          
        </Box>

        <Button colorScheme="teal" onClick={openModal}>
          Adicionar Evidência
        </Button>

        <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Evidência</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ModalUploadEvidence idRequestForEvidence={0} idProcess={0} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={closeModal}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default VisualizarEtapa;