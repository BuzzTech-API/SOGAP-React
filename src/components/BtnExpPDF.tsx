import { Button } from "@chakra-ui/react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import Process from "../models/Process";
import { convertImageToDataURL } from "../services/imageConverter";

// Carregando os plugins de fonte para o PDFmake
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface PDFProcessInterface {
    process: Process;
}

export const BtnExpPDF = ({ process }: PDFProcessInterface) => {
    const handleExportPDF = () => {
        
        // Criando o PDF com o conteudo do processo selecionado
        const docDefinition = {
            content: [
            
                {
                    columns: [
                        {
                            text: 'lista 1'
                        },
                        {
                            text: 'lista 2'
                        }
                    ]
                },
                { 
                    text: `Detalhes do Processo: ${process.title}`, fontSize: 14 
                },
            ],
            
        };

        // Gerando o PDF
        pdfMake.createPdf(docDefinition).open(); // Abre o PDF no navegador
    };

    return (
        <>
            <Button
                bg='#53C4CD'
                variant='solid'
                textColor='white'
                colorScheme="#58595B"
                width={['auto', '8rem']}
                onClick={handleExportPDF}
            >
                Exportar PDF
            </Button>
        </>
    );
};