import React from 'react';

const ErrorContainer = {
  color: '#36E3D3',
  fontFamily: 'Poppins, sans-serif',
  backgroundColor: '#414243',
  padding: '20px',
  border: '1px solid',
  borderRadius: '20px',
  textAlign: 'center' as 'center',
  width: '600px', 
};

const ErrorTitle = {
  color: '#36E3D3',
};

const ErrorDescription = {
  fontSize: '16px',
  marginTop: '10px',
};

const EvidenciaRecusada = () => {
  return (
    <div style={ErrorContainer}>
      <div style={ErrorTitle}>
        Evidência não atende aos parâmetros de validação
      </div>
      <div style={ErrorDescription}>
        Por favor, verifique os parâmetros de validação da evidência e tente novamente.
      </div>
    </div>
  );
};

export default EvidenciaRecusada;
