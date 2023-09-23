
import { useDisclosure } from "@chakra-ui/react";
import { ModalSolicitaEvidencia } from "../components/Modal/BtnPedirEvidencia";

export const PageModal = () =>{
    const { onClose } = useDisclosure();

    return (
        
            <>
            <ModalSolicitaEvidencia step_id={1} onClose={onClose}></ModalSolicitaEvidencia>
            </>
        
    );
};