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
  IconButton,
  Grid,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon,} from "@chakra-ui/icons";

//Função Principal
const TwoAuthModal = () => {
const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal size="xxl" isOpen={isOpen} onClose={onClose}>
    </Modal>
  );
};
export default TwoAuthModal;