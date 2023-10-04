export class Authenticated {
  public isAuthenticated: boolean = false
}
export const refreshToken = async (authenticated: Authenticated) => {
  const refresh_token = localStorage.getItem('refresh_token')
  if (refresh_token) {
    try {
      const response = await fetch(`http://localhost:8000/refresh_token`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${refresh_token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json()
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        return authenticated.isAuthenticated = true;
      }
      else {
        localStorage.removeItem('refresh_token');
        return authenticated.isAuthenticated = false;


      }
    } catch (error) {
      // Se a verificação falhar (por exemplo, token inválido), você pode lidar com isso aqui
      console.error('Erro na verificação do token:', error);
    }
  }
}

export const verifyToken = async (authenticated: Authenticated) => {

  const token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token')
  if (token) {
    try {
      const response = await fetch(`http://localhost:8000/users/get/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return authenticated.isAuthenticated = true;
      }
      else {
        localStorage.removeItem('access_token');

        if (refresh_token) {
          return await refreshToken(authenticated)
        }
        return authenticated.isAuthenticated = false;

      }
    } catch (error) {
      // Se a verificação falhar (por exemplo, token inválido), você pode lidar com isso aqui
      console.error('Erro na verificação do token:', error);
    }
  }
  if (refresh_token) {
    return await refreshToken(authenticated)
  }
}

export const loginToken = async (email: string, senha: string) => {
  const response = await fetch(`http://localhost:8000/login/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=&username=' + email + '&password=' + senha + '&scope=&client_id=&client_secret='

  });
  const data = await response.json()
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('refresh_token', data.refresh_token)
}



export const refreshTokenFetch = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  if (refresh_token) {
    try {
      const response = await fetch(`http://localhost:8000/refresh_token`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${refresh_token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json()
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
      }
      else {
        localStorage.removeItem('refresh_token');
      }
    } catch (error) {
      // Se a verificação falhar (por exemplo, token inválido), você pode lidar com isso aqui
      console.error('Erro na verificação do token:', error);
    }
  }
}


export const verifyTokenFetch = async () => {

  const token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token')
  if (token) {
    try {
      const response = await fetch(`http://localhost:8000/users/get/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return
      }
      else {
        localStorage.removeItem('access_token');

        if (refresh_token) {
          return await refreshTokenFetch()
        }

      }
    } catch (error) {
      // Se a verificação falhar (por exemplo, token inválido), você pode lidar com isso aqui
      console.error('Erro na verificação do token:', error);
    }
  }
  if (refresh_token) {
    return await refreshTokenFetch()
  }
}