import { sendFormData } from "../services/process";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Card,
  CardHeader,
  CardBody,                                      //Importação das Bibliotecas
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Flex,
  useDisclosure,
  IconButton,
  Grid
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import User from "../models/User";
import { createProcessUser, getAllUsers } from "../services/users";
import { formatData } from "../services/formatDate";
import { refreshToken, refreshTokenFetch } from "../services/token";
import { ProcessInterface } from "../interfaces/processInterface";
import Process from "../models/Process";

//Interface para manipulação dos dados
export interface FormDataStructure {
  title: string;
  description: string;
  objective: string;
  endingDate: string;
  createDate: string;
  lastUpdate: string;
  is_active: boolean;
  priority: string;
  status: string;
}

interface IconSettings {
  widthIcon: number,
  sizeIcon: string,
  heightIcon: number,
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>
  processes: Array<Process>
}

//Função Principal
const FormP = ({ widthIcon, sizeIcon, heightIcon, setProcesses, processes }: IconSettings) => {


  const [usersList, setUsersList] = useState(new Array<User>())
  const [responsibleList, setResponsibleList] = useState(new Array<User>())
  useEffect(() => {
    (async () => {
      const listOfUsers = await getAllUsers()
      if (listOfUsers) {
        setUsersList(listOfUsers)
      }

    })();
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataStructure>({
    title: '',
    description: '',
    objective: '',
    endingDate: '',
    createDate: formatData(new Date()),
    lastUpdate: formatData(new Date()),
    is_active: true,
    priority: '',
    status: 'Não iniciado',
  });

  //Função para lidar com mudanças no corpo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { title, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [title]: value,
    }));
  };
  //Função para lidar com mudanças no corpo do formulário
  const handleChangeEndingDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      'endingDate': e.target.value,
    }));
  };

  //Função para lidar com mudança no item de "Prioridade"
  const handleChangePrioridade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      'priority': e.target.value,
    }));

  };

  const setResponsible = (user: User) => {
    setResponsibleList(responsibleList.concat(user))
  }

  const handleChangeResponsible = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newResponsible = usersList.find(user => user.id === Number.parseInt(e.target.value))
    if (newResponsible) {
      setResponsible(newResponsible)
    }
  }

  //Função para submeter os dados ao servidor BackEnd
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await refreshTokenFetch()
    try {
      const response: Process = await sendFormData(formData);

      responsibleList.forEach(async (user: User) => {
        await createProcessUser(user.id, response.id)
      })

      setProcesses(processes.concat(response))

    } catch (error) {
      console.error("Erro ao enviar dados do Formulário para o backend", error);


    }finally{
      onClose()
    }
  };

  //Variáveis para o Modal

  //Variável para o Calendário "DatePicker"
  const [prazo, setDeadline] = useState<null | Date>(null);

  //Variável para o boxList "Prioridade"
  const [priority, setPrioridade] = useState("Alta");

  //Retorno em HTML do Formulário
  return (<>
    <IconButton margin=''
      aria-label="Btn Add Processo"
      bg="#58595B"
      color="white"
      size={sizeIcon}
      icon={<AddIcon h={heightIcon} w={widthIcon} />}
      _hover={{ color: "#58595B", bg: "white" }}
      onClick={onOpen}
    >
    </IconButton>
    <Modal size="xxl" isOpen={isOpen} onClose={onClose}>

      <ModalOverlay />

      <ModalContent style={{ width: "1000px", height: "auto" }}>
        <Card bg="#58595B">
          <Box>
            <ModalHeader textAlign="center">
              <CardHeader>
                <Heading fontSize="30px" fontWeight="bold" color="#53C4CD" size='md'>
                  Novo Processo
                </Heading>
              </CardHeader>
            </ModalHeader>
          </Box>
          <ModalCloseButton style={{ width: "40px", height: "40px" }} rounded="100%" bg="#53C4CD" color="#ffffff" mt={7} mr={5}></ModalCloseButton>

          <ModalBody>
            <CardBody>
              <Box maxW="70%" mx="auto" p={1}>
                <form onSubmit={handleSubmit}>
                  <FormControl id="title" mb={3}>
                    <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Título</FormLabel>
                    <Input
                      rounded="100px"
                      bg="#D9D9D9"
                      type="text"
                      title="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="description" mb={3}>
                    <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Descrição</FormLabel>
                    <Input style={{ height: "100px" }}
                      overflowY="auto"
                      rounded="20px"
                      bg="#D9D9D9"
                      type="text"
                      title="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="objective" mb={3}>
                    <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Objetivo</FormLabel>
                    <Input
                      rounded="100px"
                      bg="#D9D9D9"
                      type="text"
                      title="objective"
                      value={formData.objective}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Box textAlign="center">
                    <FormControl id="deadline" mb={3}>
                      <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={210}>Prazo</FormLabel>
                      <Input
                        bg='#D9D9D9'
                        placeholder="Selecione a data"
                        size="md"
                        type="date"
                        value={formData.endingDate}
                        onChange={handleChangeEndingDate}
                      />
                    </FormControl>
                    <Flex justifyContent="center" alignItems="center">
                      <FormControl id="priority" mb={5}>
                        <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={210}>Prioridade</FormLabel>
                        <Select style={{ width: "37%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
                          value={formData.priority}
                          onChange={handleChangePrioridade}>
                          <option value="Alta">Alta</option>
                          <option value="Média">Média</option>
                          <option value="Baixa">Baixa</option>
                        </Select>
                      </FormControl>
                    </Flex>
                    <FormControl id="responsible" mb={3}>
                      <FormLabel color="#ffffff" fontSize="20px" mb={1} ml={5}>Responsável</FormLabel>
                      <Select style={{ width: "100%", height: "40px" }} rounded="100px" color="#000000" bg="#D9D9D9"
                        value={''}
                        onChange={handleChangeResponsible}
                      >
                        <option value=""></option>
                        {usersList.map((user: User) => {

                          return <option key={user.id} value={user.id}>{user.name}</option>
                        })}

                      </Select>
                      <Box>
                        <Grid marginLeft='1rem' templateColumns='repeat(2, 1fr)' gap='1.5rem'>
                          {responsibleList.map((responsible: User) => {
                            const removeResponsible = () => {
                              setResponsibleList(responsibleList.filter((item) => item !== responsible))
                            }
                            return <Box
                              width='15rem'
                              height='3rem'
                              bg='#53C4CD'
                              alignContent='center'
                              padding='0.5rem 0.5rem 0.5rem 2rem'
                              borderRadius='2rem'
                              marginTop='0.8rem'
                              marginRight='0.5rem'
                              key={responsible.id}
                            >
                              {responsible.name}
                              <IconButton marginLeft='2rem'
                                aria-label="Btn Add Processo"
                                bg="white"
                                color="#58595B"
                                size='sm'
                                borderRadius='3rem'
                                icon={<CloseIcon />}
                                _hover={{ color: "white", bg: "#58595B" }}
                                onClick={removeResponsible}
                              />
                            </Box>
                          })}
                        </Grid >
                      </Box>

                    </FormControl>
                    <Button id="CreateButton"
                      style={{ width: "90px", height: "35px" }}
                      fontWeight="bold"
                      rounded="100px"
                      bg="#53C4CD"
                      color="#ffffff"
                      type="submit">Criar
                    </Button>
                  </Box>
                </form>
              </Box>
            </CardBody>
          </ModalBody>
        </Card>
      </ModalContent>
    </Modal>
  </>
  );
};


export default FormP;