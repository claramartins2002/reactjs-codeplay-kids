import { MDBCard, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import "./styles.css";

const CardMinhasAtividades = () => {
    const tarefas = [
        { dia: 'Seg, 16', descricao: 'Jogo da Multiplicação', turma: '3º ano A', horario: '10:30' },
        { dia: 'Ter, 17', descricao: 'Jogo da Memória', turma: '2º ano B', horario: '09:30' },
        { dia: 'Qua, 18', descricao: 'Jogo das Vogais',turma: '3º ano C', horario: '09:00'  },
        { dia: 'Qui, 19', descricao: 'Quebra cabeças', turma: '1º ano B', horario: '08:00'  },
      ];
    return <>
    <MDBCard className="w-100 h-100" id="container-minhas-atividades-card">
    <h2 className="fw-bold mb-2 text-left" id="h2-txt-minhas-atividades-card">Atividades Recentes</h2> 
    <MDBListGroup flush style={{border: 'none'}}>
        {tarefas.map((tarefa, index) => (
          <MDBListGroupItem key={index} style={{ display: 'flex', justifyContent: 'space-between', fontFamily:'Irish Grover' }}>
            <span id="span-data-atividades">{tarefa.dia}</span> {/* Dia da tarefa */}
            <span id="span-atividades"><h3>{tarefa.descricao}</h3>
                <h6>{tarefa.turma}, {tarefa.horario}</h6>
                
                </span> {/* Descrição da tarefa */}
             <span id="span-data-atividades"><h3></h3></span> {/* Descrição da tarefa */}
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBCard>
    </>
}
export default CardMinhasAtividades;