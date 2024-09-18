import React, { useContext } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,

}
from 'mdb-react-ui-kit';
import "@fontsource/irish-grover"; // Defaults to weight 400
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
function Login() {

    const { login } = useContext(AuthContext); // Pega a função de login do contexto
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/'); // Redireciona para a home após login
  };
  return (

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center" id="h2-txt" >Login do professor</h2>

              <MDBInput wrapperClass='mb-4 w-100' label='Email' id='formControlLg' type='email' size="lg" />
              <MDBInput wrapperClass='mb-4 w-100' label='Senha' id='formControlLg' type='password' size="lg"/>


              <MDBBtn size='lg' id="btn-login" onClick={handleLogin}>
                Entrar
              </MDBBtn>



            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

  );
}

export default Login;