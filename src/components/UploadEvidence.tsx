import {  Input, FormLabel, Button } from "@chakra-ui/react"
import { ProcessInterface, ProcessUser } from "../interfaces/processInterface";
import User from "../models/User";
import { refreshTokenFetch } from "../services/token";


interface ModalUploadEvidenceI {
    idRequestForEvidence:number
    idProcess: number
}


export const ModalUploadEvidence = ({idRequestForEvidence, idProcess}:ModalUploadEvidenceI) =>{
    const token = localStorage.getItem('access_token')

        const submit = async (e:any) => {
        try{

            const uploadInput = document.getElementById('uploadInput') as HTMLInputElement //pega o arquivo enviado atraves de <input...>
            e.preventDefault()
            await refreshTokenFetch()

            
            const response = await fetch(`http://localhost:8000/users_processes/process_id/${idProcess}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
            }) //pega o processo pelo id

            const content: Array<ProcessUser> = await response.json() //pega a lista de processos e separa os usuários responsáveis
            const usersList = new Array<User>()
            content.forEach(element => {usersList.push(element.user)});


            if(uploadInput.files && uploadInput.files.length && token){ //verifica se o usuario está autenticado e se o arquivo existe

                const file = uploadInput.files[0] // Pega o primeiro arquivo do input de upload
                const formData = new FormData()
                formData.append('file', file);


                let host = `http://localhost:8000/uploadfile/`
                
                usersList.map((user : User) => {
                    host = host + user.email + "&"
                    return host
                }) //separa o email de todos os responsáveis pelo processo e coloca depois de "uploadfile/""
                
                const response2 = await fetch (
                    host,{
                    method: 'POST',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                    body: formData,
                }) // manda o arquivo para /uploadfile e retorna o link onde o arquivo foi guardado
                

                const data = await response2.json() //link                
                if(response2.status === 200){ //verifica se a resposta deu 200(OK)

                    // função para pegar a data atual e formatar para "ano/mes/dia"
                    const today = new Date()
                    const year = today.getFullYear()
                    const month = today.getMonth() + 1 // getMonth() retorna um valor de 0-11 por isso o +1
                    const day = today.getDate()
                    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
                    console.log(data);
                    
                    // corpo do json que sera mandado para /evidences
                    const jsonBody = {
                        link: data[0],
                        idRequestForEvidence: idRequestForEvidence,
                        deliveryDate: formattedDate
                    }

                    await fetch(
                        `http://localhost:8000/evidences/`,{
                        method: 'POST',
                        headers:{
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonBody) // transforma o corpo do json para json
                    })



                }  
            }
        }
        catch (error) {
            console.error("Erro: ", error); //bloco para tratar caso algum erro ocorra
        }
    }
    
    
    return(
        <>
            <form onSubmit={submit}>
                    <FormLabel htmlFor="uploadInput" pt={3} color='white'><strong>Insira documento requerido</strong></FormLabel>
                    <Input id='uploadInput' type="file"/>
                    <Button type="submit" display="flex" mb={3} bg='#53C4CD' variant='solid' textColor='black' colorScheme="#58595B" width='100%'>Enviar</Button>
            </form>
        </>
    )
        


}


