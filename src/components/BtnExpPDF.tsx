import { Button } from "@chakra-ui/react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import Process from "../models/Process";

// Carregando os plugins de fonte para o PDFmake
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface PDFProcessInterface {
    process: Process;
}

export const BtnExpPDF = ({ process }: PDFProcessInterface) => {
    const handleExportPDF = () => {
        // Crie um documento PDFmake com o conteúdo do seu processo
        const docDefinition = {
            content: [
                { 
                    text: `Detalhes do Processo: ${process.title}`, fontSize: 14 
                },
                // Adicione mais conteúdo conforme necessário
            ],
        };

        // Gere o PDF
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