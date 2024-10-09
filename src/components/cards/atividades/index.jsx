import { MDBCard } from "mdb-react-ui-kit";
import controle from '../../../img/controle.png';
import "./styles.css";

const CardAtividades = () => {
    return <>
    <MDBCard className="w-25 h-50" id="container-atividades-card"><img src={controle} alt="controle" />
    <h2 className="fw-bold mb-2 text-center" id="h2-txt-atividades-card">Atividades</h2> 
    <h2 className="fw mb-2 text-center" id="h2-txt-atividades-card">12</h2> 

    </MDBCard>
    </>
}
export default CardAtividades;