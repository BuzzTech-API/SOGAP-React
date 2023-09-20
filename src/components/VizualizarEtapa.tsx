import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';

interface VisualizarEtapaProps {
  nomeEtapa: string;
  objetivo: string;
  previsaoTermino: string;
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
  const boxStyles = {
    borderRadius: "8px",
    borderColor: "#58595B",
    p: "2",
    mt: "2",
    backgroundColor: "#58595B",
    width: "100%",
  };

  return (
    <Box
      className="card"
      maxWidth="400px"
      margin="0 auto"
      padding="20px"
      border="1px solid #ccc"
      borderRadius="8px"
      boxShadow="0 2px 4px #0000001a"
      backgroundColor="#333"
      alignItems="center"
      width="100%" // Adicione esta linha para o Box principal
    >
      <Heading as="h2" size="lg" mb={4} className="Titulo" color="#54c5ce" textAlign="center">
        Detalhes da Etapa
      </Heading>

      <VStack align="start" spacing={4} color="#ffff">
        <Box>
          <Text fontWeight="bold">Nome da Etapa:</Text>
          <Box {...boxStyles}>
            <Text>{nomeEtapa}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold">Objetivo:</Text>
          <Box {...boxStyles}>
            <Text>{objetivo}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold">Previsão de Término:</Text>
          <Box {...boxStyles}>
            <Text>{previsaoTermino}</Text>
          </Box>
        </Box>

        <Box>
          <Text fontWeight="bold">Responsáveis:</Text>
          <Box {...boxStyles}>
            <Text>{responsaveis}</Text>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Text fontWeight="bold">Solicitação de Evidência:</Text>
          <Box {...boxStyles}>
            <Text>{solicitacaoEvidencia}</Text>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default VisualizarEtapa;