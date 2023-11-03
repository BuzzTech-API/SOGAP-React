import { MyRelatedData } from "../interfaces/relatedDataInterface";
import User from "../models/User";



export const getAllUsers = async () => {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://${window.location.hostname}:8000/users`, {
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
  const response = await fetch(`http://${window.location.hostname}:8000/stepes_users/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })
  return response
}

export const deleteUserStep = async (user_id: number, step_id: number) => {
  const bodyJson = {
    "user_id": user_id,
    "step_id": step_id
  }

  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://${window.location.hostname}:8000/stepes_users/`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })
  return response
}

export const createUser = async (name: string, email: string, role: string, team: string, password: string, photo_link: string) => {
  const bodyJson = {
    name: name,
    email: email,
    photo_link: photo_link,
    role: role,
    team: team,
    is_active: true,
    password: password
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://${window.location.hostname}:8000/users/`, {
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

export const uploadPhoto = async (form: FormData) => {
  const token = localStorage.getItem('access_token')
  const response = await fetch(`http://${window.location.hostname}:8000/uploadphoto/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },

    body: form
  })
  return response.json()
}

export const getUser = async () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const response = await fetch(`http://${window.location.hostname}:8000/users/get/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json()
        localStorage.setItem('cargo', data.role)
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }
}


export const createProcessUser = async (user_id: number, process_id: number) => {
  const bodyJson = {
    "user_id": user_id,
    "process_id": process_id
  }
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://${window.location.hostname}:8000/users_processes/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(bodyJson)
  })
  return response
}

export const getUserById = async (id: number) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const response = await fetch(`http://${window.location.hostname}:8000/users/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = response.json()
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export const getMyRelatedData = async () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const response = await fetch(`http://${window.location.hostname}:8000/user/getall_related_data/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data: MyRelatedData = await response.json()

        return data
      }
    } catch (error) {
      console.log(error);
    }
  }
}