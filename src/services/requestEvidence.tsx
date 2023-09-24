import Evidence from "../models/Evidence";
import RequestForEvidence from "../models/RequestForEvidence";
import { formatData } from "./formatDate";




export const createRequestEvidence = async (
    requiredDocument: string,
    description: string,
    step_id: number,
    user_id: number,
    evidenceValidationDate: Date,
    deliveryDate: Date, 
  ) => {

    const evidenceDate = formatData(evidenceValidationDate)
    const deliveryDat = formatData(deliveryDate)
    const bodyJson = {
        "requiredDocument": requiredDocument,
        "description": description,
        "step_id": step_id,
        "user_id": user_id,
        "evidenceValidationDate": evidenceDate,
        "deliveryDate": deliveryDat,
        "is_validated": false,
        "is_actived": true
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