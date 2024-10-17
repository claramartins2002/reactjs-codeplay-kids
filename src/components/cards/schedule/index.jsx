import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import './styles.css';

const { RangePicker } = DatePicker;

// Constante com as atividades (data fictícia para exemplo)
const atividades = [
    {
        id: 1,
        dia: 'Seg',
        data: '2024-09-16',
        nome: 'Jogo da divisão',
        turma: '3º ano A - Escola A',
        horario: '10:00 - 11:00',
        status: 'agendada'
    },
    {
        id: 2,
        dia: 'Ter',
        data: '2024-09-17',
        nome: 'Quebra Cabeça',
        turma: '2º ano A - Escola A',
        horario: '09:00 - 10:00',
        status: 'concluida'
    },
    {
        id: 3,
        dia: 'Qua',
        data: '2024-09-18',
        nome: 'Jogo das vogais',
        turma: '1º ano A - Escola B',
        horario: '13:00 - 14:00',
        status: 'agendada'
    },
    {
        id: 4,
        dia: 'Sex',
        data: '2024-09-20',
        nome: 'Desafio de Matemática',
        turma: '4º ano B - Escola C',
        horario: '14:00 - 15:00',
        status: 'concluida'
    }
];

const Schedule = () => {
  const [dateRange, setDateRange] = useState([dayjs('2024-09-16'), dayjs('2024-09-20')]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  // Função para filtrar atividades com base nas datas selecionadas
  const filterActivities = () => {
    const [start, end] = dateRange;

    const filtered = atividades.filter((atividade) => {
      const activityDate = dayjs(atividade.data);
      return activityDate.isAfter(start.subtract(1, 'day')) && activityDate.isBefore(end.add(1, 'day'));
    });

    setFilteredActivities(filtered);
  };

  // Atualiza as atividades sempre que as datas de filtro são alteradas
  useEffect(() => {
    filterActivities();
  }, [dateRange]);

  return (
    <div className="schedule-container">
      <div className="header">
        <h2>Minhas atividades</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <RangePicker
            value={dateRange}
            onChange={(dates) => {
              if (dates) {
                const [start, end] = dates;
                setDateRange([dayjs(start), dayjs(end)]);
              }
            }}
            format="DD/MM/YYYY"
          />
        </div>
      </div>
      <div className="week-days">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((atividade) => (
            <div className="day" key={atividade.id}>
              <span className="date">
                {`${atividade.dia} ${dayjs(atividade.data).format('DD')}`}
              </span>
              <div className="activity">
                <a href="#">{atividade.nome}</a>
                <div className="date-activity">
                  <p className='info-activity'>{atividade.turma}</p>
                  <span className='info-activity'>{atividade.horario}</span>
                  <button className={`status ${atividade.status}`}>
                    {atividade.status === 'agendada' ? 'Agendada' : 'Concluída'}
                  </button>
                </div>
                
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma atividade encontrada para o período selecionado.</p>
        )}
        <div className="view-activities">
          <button>Ver atividades</button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
