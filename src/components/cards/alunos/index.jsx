import { MDBCard } from "mdb-react-ui-kit";
import alunos from '../../../img/alunos.png';
import "./styles.css";

const CardAlunos = () => {
    return <>
    <MDBCard className="w-25 h-50" id="container-aluno-card"><img src={alunos} alt="alunos" />
    <h2 className="fw-bold mb-2 text-center" id="h2-txt-alunos-card">Alunos</h2>
    <h2 className="fw mb-2 text-center" id="h2-txt-alunos-card">30</h2>
    </MDBCard>
    </>
}
export default CardAlunos;