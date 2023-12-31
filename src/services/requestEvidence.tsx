import { RequestEvidenceInterface, UpdateRequestEvidenceInterface } from "../interfaces/requestEvidenceInterface";
import Evidence from "../models/Evidence";
import RequestForEvidence from "../models/RequestForEvidence";
import fetchWithRefresh from "./fetchWithRefresh";

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
      const response = await fetchWithRefresh(`http://${window.location.hostname}:8000/request_for_evidence/`, {
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


  export const getRequestEvidenceById = async (id: number) => {
    const token = localStorage.getItem('access_token');
    const response = await fetchWithRefresh(`http://${window.location.hostname}:8000/request_for_evidence/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  
    if (response.ok) {
      const content: RequestEvidenceInterface = await response.json()
  
      const evidencesList = new Array<Evidence>()
      if (content.evidences !== undefined) {
        content.evidences.forEach(element => {
          evidencesList.push(element)
        })
      }
  
      const requestEvidence = new RequestForEvidence(
        content.id,
        content.requiredDocument,
        content.description,
        content.step_id,
        content.user_id,
        content.evidenceValidationDate,
        content.deliveryDate,
        content.is_validated,
        content.is_actived,
        evidencesList
      )
  
  
      return requestEvidence
    } else {
      return null
    }
  }  

  export const updateRequestEvidence = async (formData: UpdateRequestEvidenceInterface) => {
      const token = localStorage.getItem('access_token');
            const response = await fetchWithRefresh(`http://${window.location.hostname}:8000/request_for_evidence/`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
    
        body: JSON.stringify(formData)
      })
      return response
  }

  export const deleteEvidence = async (process_id: number, is_active: boolean) => {
    const bodyJson = {
      id: process_id,
      is_active: is_active
    }
    
    const token = localStorage.getItem('access_token');
    const response = await fetchWithRefresh(`http://${window.location.hostname}:8000/request_for_evidence/delete/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyJson),
    });
    return await response.json()
  }




  export const validateEvidence = async (id: number) => {
      const token = localStorage.getItem('access_token');
            const response = await fetchWithRefresh(`http://${window.location.hostname}:8000/request_for_evidence/validate/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      return response
  }



  export const invalidateEvidence = async (id: number) => {
      const token = localStorage.getItem('access_token');
            const response = await fetchWithRefresh(`http://${window.location.hostname}:8000/evidences/invalidate/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      return response
  }