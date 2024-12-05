import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBRow,
  MDBContainer,

} from 'mdb-react-ui-kit';
import "@fontsource/irish-grover";
import './styles.css';

import NavbarProf from '../../components/menu-prof';
import CardMinhasAtividades from '../../components/cards/minhas-atividades';
import CardNotificacoes from '../../components/cards/notificacoes';
import Schedule from '../../components/cards/schedule';

function Overview() {
  return (
  <>
    <NavbarProf/>

    <MDBContainer id='container-overview'>
      <MDBRow id='box-overview'>
        <Schedule/>
      </MDBRow>
      <MDBRow id='box-overview'>
        <CardNotificacoes/>
      </MDBRow>
    </MDBContainer>
  </>
)}

export default Overview;