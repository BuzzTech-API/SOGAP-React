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
  Tag,
  TagCloseButton,
  TagLabel
} from '@chakra-ui/react';
import User from "../models/User";
import { createProcessUser, getAllUsers } from "../services/users";
import { formatData } from "../services/formatDate";
import Process from "../models/Process";
import { verifyTokenFetch } from "../services/token";

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
  width: string,
  setProcesses: React.Dispatch<React.SetStateAction<Process[]>>
  setSortProcess: React.Dispatch<React.SetStateAction<Process[]>>
  processes: Array<Process>
  sortProcess: Array<Process>
}

//Função Principal
const FormP = ({ width, setProcesses, processes, setSortProcess, sortProcess }: IconSettings) => {


  const [usersList, setUsersList] = useState(new Array<User>())
  const [responsibleList, setResponsibleList] = useState(new Array<User>())
  useEffect(() => {
    (async () => {
      await verifyTokenFetch()
      const listOfUsers = await getAllUsers()
      if (listOfUsers) {
        setUsersList(listOfUsers)
      }

    })();
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();
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
    await verifyTokenFetch()
    try {
      const response: Process = await sendFormData(formData);

      responsibleList.forEach(async (user: User) => {
        await createProcessUser(user.id, response.id)
      })

      setProcesses(processes.concat(response))
      setSortProcess(processes)

    } catch (error) {
      console.error("Erro ao enviar dados do Formulário para o backend", error);


    } finally {
      onClose()
    }
  };

  //Retorno em HTML do Formulário
  return (<>
    <Button margin=''
      aria-label="Btn Add Processo"
      bg="#29784E"
      color="white"
      _hover={{ color: "#29784E", bg: "white" }}
      onClick={onOpen}
    >Novo Processo
    </Button>
    <Modal size={['full',"xxl"]} isOpen={isOpen} onClose={onClose}>

      <ModalOverlay />

      <ModalContent w={["100%","1000px"]} h={['auto']} >
        <Card bg="#58595B">
          <Box>
            <ModalHeader textAlign="center">
              <CardHeader>
                <Heading fontSize="1.9rem" fontWeight="bold" color="#53C4CD" size={['md','md']}>
                  Novo Processo
                </Heading>
              </CardHeader>
            </ModalHeader>
          </Box>
          <ModalCloseButton width={['2rem', '3rem']} height={['2rem', '3rem']} rounded="100%" bg="#53C4CD" color="#ffffff" mt={7} mr={5}></ModalCloseButton>

          <ModalBody>
            <CardBody>
              <Box maxW="70%" mx="auto" p={1}>
                <form onSubmit={handleSubmit}>
                  <FormControl id="title" mb={3}>
                    <FormLabel color="#ffffff" fontSize="1.2rem" mb={1} ml={5}>Título</FormLabel>
                    <Input
                      rounded="100px"
                      maxLength={60}
                      bg="#D9D9D9"
                      type="text"
                      title="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="description" mb={3}>
                    <FormLabel color="#ffffff" fontSize="1.2rem" mb={1} ml={5}>Descrição</FormLabel>
                    <Input style={{ height: "100px" }}
                      overflowY="auto"
                      maxLength={300}
                      rounded="20px"
                      bg="#D9D9D9"
                      type="text"
                      title="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl id="objective" mb={3}>
                    <FormLabel color="#ffffff" fontSize="1.2rem" mb={1} ml={5}>Objetivo</FormLabel>
                    <Input
                      rounded="100px"
                      bg="#D9D9D9"
                      type="text"
                      title="objective"
                      maxLength={120}
                      value={formData.objective}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Box textAlign="center">
                    <FormControl id="deadline" mb={3}>
                      <FormLabel color="#ffffff" fontSize="1.2rem" mb={1} ml={5}>Prazo</FormLabel>
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
                        <FormLabel color="#ffffff" fontSize="1.2rem" mb={1} ml={5}>Prioridade</FormLabel>
                        <Select style={{ width: "100%", height: "40px" }} textAlign={'center'} rounded="100px" color="#000000" bg="#D9D9D9"
                          value={formData.priority}
                          onChange={handleChangePrioridade}>
                          <option value=""></option>
                          <option value="Alta">Alta</option>
                          <option value="Média">Média</option>
                          <option value="Baixa">Baixa</option>
                        </Select>
                      </FormControl>
                    </Flex>
                    <FormControl id="responsible" mb={3}>
                      <FormLabel color="#ffffff" fontSize="1.2rem" mb={1} ml={5}>Responsável</FormLabel>
                      <Select style={{ width: "100%", height: "40px" }} textAlign={'center'} rounded="100px" color="#000000" bg="#D9D9D9"
                        value={''}
                        onChange={handleChangeResponsible}
                      >
                        <option value=""></option>
                        {usersList.map((user: User) => {

                          return <option key={user.id} value={user.id}>{user.name}</option>
                        })}

                      </Select>
                      <Box>
                        <Flex

                          maxWidth={'100%'}
                          marginLeft='1rem'
                          flexDirection='row'
                          gap='1.5rem'
                          flexWrap="wrap"
                          justifyContent="flex-start"
                        >
                          {responsibleList.map((responsible: User) => {
                            const removeResponsible = () => {
                              setResponsibleList(responsibleList.filter((item) => item !== responsible))
                            }
                            return <Tag
                              bg='#53C4CD'
                              alignContent='center'
                              minWidth='5rem'
                              height='3rem'
                              key={responsible.id}
                              marginTop='0.8rem'
                              marginRight='0.5rem'
                            >
                              <TagLabel>{responsible.name}</TagLabel>
                              <TagCloseButton
                                width={'2rem'}
                                height={'2rem'}
                                aria-label="Btn Add Processo"
                                bg="white"
                                color="#58595B"
                                _hover={{ color: "white", bg: "#58595B" }}
                                onClick={removeResponsible}
                              />
                            </Tag>



                          })}
                        </Flex >
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