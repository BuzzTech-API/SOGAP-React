import { StepInterface, StepUser } from "../interfaces/stepInterface";
import RequestForEvidence from "../models/RequestForEvidence";
import Step from "../models/Steps";
import { formatData } from "./formatDate";




export const createStep = async (name: string,
  endDate: Date,
  endingDate: Date,
  process_id: number,
  objective: string,
  priority: string,
  order: number
) => {
  const bodyJson = {
    "name": name,
    "endDate": endDate,
    "endingDate": endingDate,
    "process_id": process_id,
    "objective": objective,
    "priority": priority,
    "order": order,
    "is_active": true
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost:8000/steps/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })

  if (response.ok) {
    const content: StepInterface = await response.json()
    console.log(content);
    
    
    const step = new Step();
    step.id=content.id
    step.process_id =  content.process_id
    step.name =  content.name
    step.order =  content.order
    step.objective =  content.objective
    step.endingDate =  content.endingDate
    step.endDate =  content.endDate
    step.priority =  content.priority
    step.is_active =  content.is_active
    step.users =  content.users
    step.requests =  content.requests    

      console.log(step);
      
    return step
  } else {
    return null
  }
}

export const updateStep = async (
  step_id: number,
  name: string,
  endDate: Date,
  endingDate: Date,
  process_id: number,
  objective: string,
  priority: string, 
  order: number
) => {

  const EndingDate = formatData(endingDate)
  const bodyJson = {
      "step_id": step_id,
      "name": name,
      "endDate": endDate,
      "endingDate": EndingDate,
      "process_id": process_id,
      "objective": objective,
      "priority": priority,
      "order": order,
      "is_active": true
    }
    
    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://localhost:8000/steps/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
  
      body: JSON.stringify(bodyJson)
    })
    return response
}

export const deleteStep = async (process_id: number, is_active: boolean) => {
  const bodyJson = {
    id: process_id,
    is_active: is_active
  }
  console.log(bodyJson);
  
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost:8000/steps/delete`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyJson),
  });
  return await response.json()
}


export const getStepsById = async (id: number) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost:8000/steps/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  if (response.ok) {
    const content: StepInterface = await response.json()

    const usersList = new Array<StepUser>()
    if (content.users !== undefined) {
      content.users.forEach(element => {
        usersList.push(element)
      })
    }

    const requestsList = new Array<RequestForEvidence>()
    if (content.requests !== undefined) {
      content.requests.forEach(request => {
        requestsList.push(request)
      })
    }

    const process = new Step(
      content.id,
      content.process_id,
      content.name,
      content.order,
      content.objective,
      content.endingDate,
      content.endDate,
      content.priority,
      content.is_active,
      usersList,
      requestsList
    )


    return process
  } else {
    return null
  }
}