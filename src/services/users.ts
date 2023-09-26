import User from "../models/User";


export const getAllUsers = async () => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/users`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })

  if (response.ok) {
    const content: Array<User> = await response.json()
    return content

  } else {
    return new Array<User>()
  }
}

export const createUserStep = async (user_id: number, step_id: number) => {
  const bodyJson = {
    "user_id": user_id,
    "step_id": step_id
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/stepes_users/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })
}

export const createUser = async (name: string, email: string, role: string, team: string, password: string) => {
  const bodyJson = {
    name: name,
    email: email ,
    role: role ,
    team: team,
    is_active: true,
    password: password
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/users/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })
  const user: User = await response.json() 
  return user
}

export const createProcessUser  = async (user_id: number, process_id: number) => {
  const bodyJson = {
    "user_id": user_id,
    "process_id": process_id
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost/api/users_processes/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })
}