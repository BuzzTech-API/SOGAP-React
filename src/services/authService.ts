import fetchWithRefresh from "./fetchWithRefresh";

export async function activate2FA(): Promise<{ secret_key: string }> {
  try {
    let response = await fetchWithRefresh('http://${window.location.hostname}:8000/enable-2fa', {
      method: 'POST',
    });
    if (response.status === 401) {
      response = await fetchWithRefresh('http://${window.location.hostname}:8000/enable-2fa', {
        method: 'POST',
      });
    }

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Erro ao ativar o 2FA');
    }
  } catch (error) {
    throw new Error('Erro de rede: ');
  }
}