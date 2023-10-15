import { AccordionItem, AccordionButton, AccordionPanel, VStack, Box, Text, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import RequestForEvidence from "../models/RequestForEvidence";
import { getUserById } from "../services/users";
import User from "../models/User";
import Process from "../models/Process";
import { useEffect, useState } from "react";
import { verifyTokenFetch } from "../services/token";
import { formatDateToBrasil } from "../services/formatDate";

interface AccordionI {
  requestForEvidenceI: RequestForEvidence
}
export const AccordionRequests = ({ requestForEvidenceI }: AccordionI) => {
  const [user, setUser] = useState(new User('', '', '', false, 0, '', new Array<Process>()))
  const [requestForEvidence, setRequestForEvidence] = useState(requestForEvidenceI)
  useEffect(() => {
    (async () => {
      await verifyTokenFetch()
      const data: User = await getUserById(requestForEvidence.user_id)
      setUser(data)
    })();

  }, [requestForEvidence.user_id])





  if (requestForEvidence.evidences.length !== 0 && requestForEvidence.evidences !== undefined) {

    return (<AccordionItem>
      <AccordionButton height="44px" alignSelf="stretch">
        <Text

          lineHeight="1.5"
          fontWeight="semibold"
          fontSize="md"
          color="#FFFFFF"
          flex="1"
        >
          {requestForEvidence.requiredDocument}
        </Text>
      </AccordionButton>
      <AccordionPanel minWidth={'100%'} textAlign={'center'}>
        <VStack spacing={'1rem'}>
          <Box>

            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Descrição
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
            >
              {requestForEvidence.description}
            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Data de Entrega
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {formatDateToBrasil(requestForEvidence.evidences[0].deliveryDate.toString())}
            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Link do Documento
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"

            ><a
              href={requestForEvidence.evidences[0].link}
              target="_blank"
              rel="noreferrer"
            >{requestForEvidence.evidences[0].link}</a>

            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Responsável
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {user.name}
            </Text>
          </Box>
          <Menu>
            <MenuButton as={Button} bgColor={'#29784E'} color={'#FFF'} variant="solid" size="md">
              Ações
            </MenuButton>
            <MenuList bg={'#58595B'}>
              <MenuItem bg={'#58595B'} key={'ValidarEvidencia'}>
                <Button
                  bg={'#58595B'}
                  color={'#FFF'}
                  width={'100%'}
                  _hover={{ background: '#FFF', color: '#58595B' }}
                >Validar Evidência</Button>
              </MenuItem>
              <MenuItem bg={'#58595B'} key={'SolicitarCorrecao'}>
                <Button
                  bg={'#58595B'}
                  color={'#FFF'}
                  width={'100%'}
                  _hover={{ background: '#FFF', color: '#58595B' }}
                >Solicitar Correção</Button>
              </MenuItem>
              <MenuItem bg={'#58595B'} key={'InvalidarEvidencia'}>
                <Button
                  bg={'#58595B'}
                  color={'#FFF'}
                  width={'100%'}
                  _hover={{ background: '#FFF', color: '#58595B' }}
                >Invalidar Evidência</Button>
              </MenuItem>
            </MenuList>
          </Menu>


        </VStack>
      </AccordionPanel>
    </AccordionItem>)
  } else {
    return (<AccordionItem>
      <AccordionButton height="44px" alignSelf="stretch">
        <Text

          lineHeight="1.5"
          fontWeight="semibold"
          fontSize="md"
          color="#FFFFFF"
          flex="1"
        >
          {requestForEvidence.requiredDocument}
        </Text>
      </AccordionButton>
      <AccordionPanel minWidth={'100%'} textAlign={'center'}>
        <VStack spacing={'1rem'}>
          <Box>

            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Descrição
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
            >
              {requestForEvidence.description}
            </Text>
          </Box>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Prazo de Entrega
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {formatDateToBrasil(requestForEvidence.deliveryDate.toString())}
            </Text>
          </Box>
          <Text

            lineHeight="1.5"
            fontWeight="semibold"
            fontSize="md"
            color="#FFFFFF"
            alignSelf="stretch"
          >
            Não Entregue
          </Text>
          <Box>
            <Text

              lineHeight="1.5"
              fontWeight="semibold"
              fontSize="md"
              color="#FFFFFF"
            >
              Responsável
            </Text>
            <Text

              lineHeight="1.5"
              fontWeight="regular"
              fontSize="md"
              color="#FFFFFF"
              alignSelf="stretch"
            >
              {user.name}
            </Text>
          </Box>
          <Menu>
            <MenuButton as={Button} bgColor={'#29784E'} color={'#FFF'} variant="solid" size="md">
              Ações
            </MenuButton>
            <MenuList bg={'#58595B'}>
              <MenuItem bg={'#58595B'} key={'ValidarEvidencia'}>
                <Button
                  bg={'#58595B'}
                  color={'#FFF'}
                  width={'100%'}
                  _hover={{ background: '#FFF', color: '#58595B' }}
                >Notificar Responsável</Button>
              </MenuItem>
            </MenuList>
          </Menu>
          </ VStack>
        </AccordionPanel>
      </AccordionItem>
    )
  }
}

