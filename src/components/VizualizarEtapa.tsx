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
} from '@chakra-ui/react';

// Importe o componente ModalUploadEvidence aqui
import { ModalUploadEvidence } from './UploadEvidence';

interface VisualizarEtapaProps {
  nomeEtapa: string;
  objetivo: string;
  previsaoTermino: Date;
  responsaveis: string;
  solicitacaoEvidencia: string;
}

const VisualizarEtapa: React.FC<VisualizarEtapaProps> = ({
  nomeEtapa,
  objetivo,
  previsaoTermino,
  responsaveis,
  solicitacaoEvidencia,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const previsaoTerminoFormatada = previsaoTermino.toLocaleDateString('pt-BR');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Box
      className="card"
      maxWidth="400px"
      margin="0 auto"
      padding="20px"
      border="1px solid #ccc"
      borderRadius="8px"
      boxShadow="0 2px 4px #0000001a"
      backgroundColor="#292A2D"
      alignItems="center"
    >
      <Heading as="h2" size="lg" mb={4} className="Titulo" color="#54c5ce" textAlign="center">
        Detalhes da Etapa
      </Heading>


      <VStack align="start" spacing={4} color="#ffff">
        <Box>
          <Text fontWeight="bold" color="#53C4CD">Nome da Etapa:</Text>
          <Box
            borderRadius="12px"
            p="2"
            mt="2"
            backgroundColor="#58595B"
            width="360px"
          >
            <Text color="#53C4CD">{nomeEtapa}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold" color="#53C4CD">Objetivo:</Text>
          <Box
            borderRadius="12px"
            p="2"
            mt="2"
            backgroundColor="#58595B"
            width="360px"
            height="200px"
          >
            <Text color="#53C4CD">{objetivo}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold" color="#53C4CD">Previsão de Término:</Text>
          <Box
            borderRadius="8px"
            p="2"
            mt="2"
            backgroundColor="#58595B"
            width="360px"
          >
            <Text color="#53C4CD">{previsaoTerminoFormatada}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold" color="#53C4CD">Responsáveis:</Text>
          <Box
            borderRadius="8px"
            p="2"
            mt="2"
            backgroundColor="#58595B"
            width="360px"
          >
            <Text color="#53C4CD">{responsaveis}</Text>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold" color="#53C4CD">Solicitação de Evidência:</Text>
          <Box>
            <Text color="#53C4CD">{solicitacaoEvidencia}</Text>
          </Box>
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