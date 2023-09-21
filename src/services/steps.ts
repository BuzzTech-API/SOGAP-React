import { StepInterface } from "../interfaces/stepInterface";
import Step from "../models/Steps";
import User from "../models/User";




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
    const usersList = new Array<User>()
    if (content.users !== undefined) {
      content.users.forEach(element => {
        usersList.push(element.user)
      });
    }
    const step = new Step(
      content.id,
      content.process_id,
      content.order,
      content.objective,
      content.endingDate,
      content.endDate,
      content.priority,
      content.is_active,
      usersList,
      content.requestsForEvidence
    );


    return step
  } else {
    return null
  }
}