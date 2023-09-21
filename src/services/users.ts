import User from "../models/User";


export const getAllUsers = async () => {
  const token = localStorage.getItem('access_token');
  const response = await fetch('http://localhost:8000/users', {
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
  const response = await fetch(`http://localhost:8000/stepes_users/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })
}