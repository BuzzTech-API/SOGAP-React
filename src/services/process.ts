import { ProcessInterface, UpdateProcessInterface } from "../interfaces/processInterface";
import Process from "../models/Process";
import User from "../models/User";
import {FormDataStructure} from "../components/FormProcess"


export const getAllProcess = async () => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/processes`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    
  })

  if (response.ok) {
    const content = await response.json()
    const processList = new Array<Process>()
    content.forEach((item: ProcessInterface) => {
      const usersList = new Array<User>()
      item.users.forEach(element => {
        usersList.push(element.user)
      });
      processList.push(new Process(
        item.id,
        item.title,
        item.description,
        item.objective,
        item.endingDate,
        item.createDate,
        item.lastUpdate,
        item.is_active,
        item.priority,
        item.status,
        item.steps,
        usersList
      )
      )

    });
    return processList
  } else {

  }

}


export const getProcessById = async (id: number) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/processes/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  if (response.ok) {
    const content: ProcessInterface = await response.json()

    const usersList = new Array<User>()
    if (content.users !== undefined) {
      content.users.forEach(element => {
        usersList.push(element.user)
      });
    }

    const process = new Process(
      content.id,
      content.title,
      content.description,
      content.objective,
      content.endingDate,
      content.createDate,
      content.lastUpdate,
      content.is_active,
      content.priority,
      content.status,
      content.steps,
      usersList
    )


    return process
  } else {
    return null
  }
}

export const sendFormData = async (formData: FormDataStructure) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/processes/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Erro ao enviar dados do Formulário para o backend - sendFormData')
  }
  return await response.json();
};

export const updateProcess = async (formData: UpdateProcessInterface) => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/processes/`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Erro ao enviar dados do Formulário para o backend - sendFormData')
  }
  return await response.json();
}

export const deleteUserProcess = async (user_id: number, process_id: number) => {
  const bodyJson = {
    "user_id": user_id,
    "process_id": process_id
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/users_processes/`, {
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