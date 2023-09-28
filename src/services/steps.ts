import { StepInterface } from "../interfaces/stepInterface";
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
  const response = await fetch(`http://localhost/api/steps/`, {
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
  name: string,
  endDate: Date,
  endingDate: Date,
  process_id: number,
  objective: string,
  priority: string, 
  order: number
) => {

  const EndDate = formatData(endDate)
  const EndingDate = formatData(endingDate)
  const bodyJson = {
      "name": name,
      "endDate": EndDate,
      "endingDate": EndingDate,
      "process_id": process_id,
      "objective": objective,
      "priority": priority,
      "order": order,
      "is_active": true
    }

    const token = localStorage.getItem('access_token');
    const response = await fetch(`http://localhost/api/steps/`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
  
      body: JSON.stringify(bodyJson)
    })
    if(response.ok)
      return "Alterações feitas"
}
