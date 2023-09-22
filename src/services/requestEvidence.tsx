import Evidence from "../models/Evidence";
import RequestForEvidence from "../models/RequestForEvidence";

export const formatData = async (today: Date) => {
  // função para pegar a data atual e formatar para "ano/mes/dia"
  today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 // getMonth() retorna um valor de 0-11 por isso o +1
  const day = today.getDate()
  const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`

  return formattedDate
}


export const createRequestEvidence = async (
    requiredDocument: string,
    description: string,
    step_id: number,
    user_id: number,
    evidenceValidationDate: Date,
    deliveryDate: Date, 
  ) => {
    const bodyJson = {
        "requiredDocument": requiredDocument,
        "description": description,
        "step_id": step_id,
        "user_id": user_id,
        "evidenceValidationDate": evidenceValidationDate,
        "deliveryDate": deliveryDate,
        "is_validated": false,
        "is_active": true
      }
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/request_for_evidence/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
    
        body: JSON.stringify(bodyJson)
      })

      if (response.ok) {
        const content: RequestForEvidence = await response.json()
        const evidenceList = new Array<Evidence>()
        const request_for_evidence = new RequestForEvidence(
          content.id,
          content.requiredDocument,
          content.description,
          content.step_id,
          content.user_id,
          content.evidenceValidationDate,
          content.deliveryDate,
          content.is_validated,
          content.is_actived,
          evidenceList
        );
    
        return request_for_evidence
      } else {
        return null
      }
  }