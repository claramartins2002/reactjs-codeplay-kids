
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBInput,

}
from 'mdb-react-ui-kit';
import "@fontsource/irish-grover"; // Defaults to weight 400
import './styles.css';

function FormAluno() {
    return (<>
 <MDBContainer>
      <form className='form-container'>
      <h2 className="fw-bold mb-2 text-center" id="h2-txt-aluno" >Editar/Inserir perfil do aluno</h2>

        <MDBRow>
          {/* Coluna 1 */}
          <MDBCol md="6" className="mb-3">
            <MDBInput label="Primeiro nome" id="primeiroNome" type="text"/>
          </MDBCol>
          
          {/* Coluna 2 */}
          <MDBCol md="6" className="mb-3">
            <MDBInput label="Último nome" id="" type="text" />
          </MDBCol>
        </MDBRow>
<MDBRow>
        <MDBCol md="8" className="mb-4">
            <MDBInput label="Endereço" id="endereco" type="text" />
          </MDBCol>
          <MDBCol md="4" className="mb-2">
            <MDBInput label="Contato do Responsável" id="endereco" type="text" />
          </MDBCol>
          </MDBRow>
        <MDBRow>
          {/* Coluna 1 */}
          <MDBCol md="7" className="mb-4">
            <MDBInput label="Escola" id="escola" type="text" />
          </MDBCol>
          
          {/* Coluna 2 */}
          <MDBCol md="5" className="mb-2">
            <MDBInput label="Turma" id="turma" type="text" />
          </MDBCol>
        </MDBRow>
        
        <MDBBtn type="submit" className="mt-3" id="btn-salvar" color='orange'>Salvar</MDBBtn>
        <MDBBtn type="submit" className="mt-3" id="btn-cancelar" color='white'>Cancelar</MDBBtn>
      </form>
    </MDBContainer>
</>
    )}

    export default FormAluno;