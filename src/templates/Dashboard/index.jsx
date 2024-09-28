
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBRow,
  MDBContainer,

}
from 'mdb-react-ui-kit';
import "@fontsource/irish-grover"; // Defaults to weight 400
import './styles.css';
import { LinearChart } from '../../components/charts/linear';
import DoughnutChart from '../../components/charts/doughnut';
import CardAlunos from '../../components/cards/alunos';
import CardAtividades from '../../components/cards/atividades';
import NavbarProf from '../../components/menu-prof';
import BarChart from '../../components/charts/bar';
import PieChart from '../../components/charts/pie';
function Dashboard() {
    return (<>
    <NavbarProf/>
    <MDBContainer>
        <MDBRow> 
         <h2 className="fw-bold mb-2 text-center" id="h2-txt-dashboard" >Painel do professor</h2>   
         </MDBRow>

 <MDBContainer id='container-dashboard'>
    <MDBRow id='box-dashboard'><CardAlunos/>
    <CardAtividades/>
    <DoughnutChart/>
    <BarChart/>
    </MDBRow>
    <MDBRow id='box-dashboard'><LinearChart/><PieChart/></MDBRow>
    

 </MDBContainer>
 </MDBContainer>
 </>
 )}

export default Dashboard;