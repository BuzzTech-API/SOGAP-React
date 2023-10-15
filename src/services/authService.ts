export async function activate2FA(): Promise<{ secret_key: string }> {
    try {
      const response = await fetch('http://localhost:8000/enable-2fa', {
        method: 'POST',
      });
  
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