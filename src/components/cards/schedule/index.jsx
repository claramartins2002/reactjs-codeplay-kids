import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import './styles.css';
import EventIcon from '@mui/icons-material/Event';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Chip, Stack, Button, ButtonGroup } from '@mui/material';
import useFetchAtividades from '../../../utils/hooks/useFetchAtividades';
import ColorUtils from '../../../utils/Colors';
import { styleChip, ButtonGroupStyle, theme } from './ScheduleStyles';


const { RangePicker } = DatePicker;

const Schedule = () => {
  const startOfWeek = dayjs().startOf('week');
  const endOfWeek = dayjs().endOf('week');

  const [dateRange, setDateRange] = useState([startOfWeek, endOfWeek]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [daysInRange, setDaysInRange] = useState([]);
  const [selectedDay, setSelectedDay] = useState(dayjs().format('ddd, DD'));

  const style = {
    borderRadius: '1rem',
    fontFamily: 'Coming Soon',
    fontColor: '#FFF',
    background: '#ffd0aa'
  };

  const { atividades, fetchAtividadesByProfessor } = useFetchAtividades();

  useEffect(() => {
    fetchAtividadesByProfessor();
    }, [fetchAtividadesByProfessor]);

  dayjs.locale('pt-br');

  const navigate = useNavigate();

  // Função para filtrar atividades com base nas datas selecionadas
  const filterActivities = () => {
    const [start, end] = dateRange;

    const filtered = atividades.filter((atividade) => {
      const creationDate = dayjs(atividade.dataCriacao);
      return creationDate.isAfter(start.subtract(1, 'day')) && creationDate.isBefore(end.add(1, 'day'));
    });

    setFilteredActivities(filtered);
  };

  // Função para gerar os dias dentro do intervalo
  const generateDaysInRange = () => {
    const [start, end] = dateRange;
    const days = [];

    let current = start;
    while (current.isBefore(end) || current.isSame(end)) {
      days.push(current);
      current = current.add(1, 'day');
    }

    setDaysInRange(days);
  };

  // Atualiza os dias e as atividades quando o intervalo de datas muda
  useEffect(() => {
    filterActivities();
    generateDaysInRange();
    setSelectedDay(dayjs().format('ddd, DD')); // Reseta para o dia atual
  }, [dateRange, atividades]);

  // Filtra as atividades pelo dia selecionado
  const activitiesForSelectedDay = filteredActivities.filter((atividade) =>
    dayjs(atividade.dataCriacao).format('ddd, DD') === selectedDay
  );

  return (
    <div className="schedule-container">
      <div className="header">
        <h2>
          <img
            className="icon-overview"
            src="https://cdn-icons-png.freepik.com/128/9079/9079277.png"
            alt=""
          />{' '}
          Minhas atividades
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <RangePicker
            value={dateRange}
            variant="filled"
            style={style}
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
      <div className="day-buttons-container">
        <ThemeProvider theme={theme}>
          <ButtonGroup
            sx={ButtonGroupStyle}
          >
            {daysInRange.map((day) => (
              <Button
                className="day-button-schedule"
                key={day.format('YYYY-MM-DD')}
                variant={day.format('ddd, DD') === selectedDay ? 'contained' : 'outlined'}
                color="ochre"
                onClick={() => setSelectedDay(day.format('ddd, DD'))}
              >
                <div className="content-day-button-schedule">
                  <span style={{fontFamily: 'Irish Grover', fontSize: '20px'}}>{day.format('DD')}</span>
                  <span style={{ fontSize: '15px', fontFamily: 'Coming Soon' }}>
                    {day.format('ddd')}
                  </span>
                </div>
              </Button>
            ))}
          </ButtonGroup>
        </ThemeProvider>
      </div>
      <div className="week-days">
        {activitiesForSelectedDay.length > 0 ? (
          activitiesForSelectedDay.map((atividade) => {
            const activityColor = ColorUtils.getRandomColor();

            return (
              <div className="day" key={atividade.id}>
                <div className="activity" style={{border: `1px solid ${activityColor}80`}}>
                  <a href="#" style={{ color: activityColor }}>
                    {atividade.nome}
                  </a>
                  <div className="jogo-info" style={{ color: `${activityColor}80` }}>
                    <span>{atividade.jogo.nome}</span>
                  </div>
                  <div className="date-activity">
                    <Stack direction="row" spacing={1}>
                      <Chip
                        sx={{...styleChip, backgroundColor: `${activityColor}80`}}
                        label={atividade.turma.nome}
                      />
                      <Chip
                        icon={<EventIcon color="action" />}
                        label={dayjs(atividade.dataEncerramento).format('DD/MM/YYYY')}
                        sx={{...styleChip, backgroundColor: `${activityColor}80`}}
                      />
                    </Stack>
                    <button
                      className="activity-schedule-status"
                      style={{backgroundColor: activityColor}}
                    >
                      {dayjs(atividade.dataEncerramento).isBefore(dayjs())
                        ? 'Encerrada'
                        : 'Ativa'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{fontFamily: 'Coming Soon'}}>Nenhuma atividade encontrada para o dia selecionado.</p>
        )}
        <div className="view-activities">
          <button onClick={() => navigate('/atividades')}>Ver atividades</button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
