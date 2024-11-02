import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCalendar, FiClock } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import pencil from '../images/pencil_8289173.png';
import './FormCriarAtividade.css';
import { Stepper, Step, StepLabel, Button, Card, CardContent, Typography } from '@mui/material';

// Arrays constantes para as opções
const jogosOptions = [
  { value: "Jogo da Memória", label: "Jogo da Memória" },
  { value: "Quebra Cabeça", label: "Quebra Cabeça" },
  { value: "Jogo da Divisão", label: "Jogo da Divisão" }
];

const turmasOptions = [
  { value: "1º Ano A", label: "1º Ano A" },
  { value: "2º Ano B", label: "2º Ano B" }
];

// Opções de tipos de atividade
const activityTypes = [
  { 
    value: "Números", 
    label: "Números", 
    description: "Tudo sobre os números", 
    iconUrl: "https://cdn-icons-png.freepik.com/128/6134/6134702.png" 
  },
  { 
    value: "Leitura", 
    label: "Leitura", 
    description: "Exercícios de leitura", 
    iconUrl: "https://cdn-icons-png.freepik.com/128/10368/10368688.png" 
  },
  { 
    value: "Quebra-Cabeças", 
    label: "Quebra-Cabeças", 
    description: "Resolvendo alguns quebra-cabeças", 
    iconUrl: "https://cdn-icons-png.freepik.com/128/12355/12355048.png" 
  },
  { 
    value: "Desenho", 
    label: "Desenho", 
    description: "Colorindo um desenho", 
    iconUrl: "https://cdn-icons-png.freepik.com/128/8289/8289050.png" 
  }
];

const FormCriarAtividade = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedActivityType, setSelectedActivityType] = useState(null);

  const steps = ["Tipo de Atividade", "Detalhes da Atividade"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data) => {
    // Incluindo o tipo de atividade selecionado nos dados enviados
    const atividadeData = {
      ...data,
      tipoAtividade: selectedActivityType,
    };
    
    console.log(atividadeData); // Log dos dados completos
    onClose(); // Fecha o modal após a criação
  };

  return (
    <div className="form-overlay">
      <div className="form-header">
        <img src={pencil} alt="" />
        <h2>Criar Atividade</h2>
      </div>
      <div className="form-container">
        <Stepper activeStep={activeStep} style={{maxWidth: '500px'}}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel><span style={{fontFamily: 'Coming Soon'}}>{label}</span></StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <div className="activity-selection" style={{margin: '20px'}}>
              <div className="activity-cards">
                {activityTypes.map((activity) => (
                  <Card 
                    key={activity.value} 
                    onClick={() => setSelectedActivityType(activity.value)}
                    style={{
                      margin: '10px',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      border: selectedActivityType === activity.value ? '2px solid #7AD487' : '2px solid transparent',
                      backgroundColor: selectedActivityType === activity.value ? '#c4ecca' : '#FFF' 
                    }}
                  >
                    <CardContent>
                      <img 
                        src={activity.iconUrl} 
                        alt={`${activity.label} icon`} 
                        style={{ width: '50px', height: '50px', display: 'block', margin: '0 auto' }}
                      />
                      <Typography variant="h6" style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Irish Grover' }}>
                        {activity.label}
                      </Typography>
                      <Typography variant="body2" style={{ textAlign: 'center', fontFamily: 'Coming Soon' }}>
                        {activity.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {activeStep === 1 && (
            <>
              <div className="form-group">
                <label>Nome da atividade *</label>
                <input 
                  type="text" 
                  {...register('nomeAtividade', { required: true })} 
                />
                {errors.nomeAtividade && <span className="error">Este campo é obrigatório</span>}
              </div>
              <div className="form-group">
                <label>Selecione o jogo *</label>
                <select {...register('jogo', { required: true })}>
                  <option value="">Selecione...</option>
                  {jogosOptions.map((jogo) => (
                    <option key={jogo.value} value={jogo.value}>{jogo.label}</option>
                  ))}
                </select>
                {errors.jogo && <span className="error">Este campo é obrigatório</span>}
              </div>
              <div className="form-group">
                <label>Selecione a turma *</label>
                <select {...register('turma', { required: true })}>
                  <option value="">Selecione...</option>
                  {turmasOptions.map((turma) => (
                    <option key={turma.value} value={turma.value}>{turma.label}</option>
                  ))}
                </select>
                {errors.turma && <span className="error">Este campo é obrigatório</span>}
              </div>
              <div className="form-group">
                <label>Data</label>
                <div className="input-with-icon">
                  <FiCalendar />
                  <input 
                    type="date" 
                    {...register('data')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Horário</label>
                <div className="input-with-icon">
                  <FiClock />
                  <input 
                    type="time" 
                    {...register('horario')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Observações</label>
                <textarea 
                  {...register('observacoes')} 
                  rows="4"
                ></textarea>
              </div>
            </>
          )}

          <div className="stepper-buttons">
            <Button disabled={activeStep === 0} onClick={handleBack} variant='outlined' style={{
              fontFamily: 'Irish Grover',
              padding: '12px 20px',
              borderRadius: '30px',
              width: '25%',
              fontSize: '1.1rem',}}
            >
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button type="submit" variant="contained" color="success" style={{
                fontFamily: 'Irish Grover',
                backgroundColor:'#7AD487', 
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '30px',
                width: '25%',
                fontSize: '1.1rem',
                gap: '5px'}}
              >
                Criar <IoArrowForward />
              </Button>
            ) : (
              <Button onClick={handleNext} variant='outlined' disabled={!selectedActivityType} style={{
                fontFamily: 'Irish Grover',
                padding: '12px 20px',
                borderRadius: '30px',
                width: '28%',
                fontSize: '1.1rem',
                gap: '5px'}}
              >
                Próximo <IoArrowForward />
              </Button>
            )}
          </div>
        </form>

        <button onClick={onClose} className="btn-fechar">
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
};

export default FormCriarAtividade;
