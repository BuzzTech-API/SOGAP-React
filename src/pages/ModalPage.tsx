
import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { ModalGeneric } from "../components/Modal/Modal";
import { ModalSolicitaEvidencia } from "../components/Modal/BtnPedirEvidencia";

export const PageModal = () =>{
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        
            <>
            <ModalSolicitaEvidencia></ModalSolicitaEvidencia>
            </>
        
    );
};