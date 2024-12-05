// FormCriarAtividade.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiCloseLine } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { Stepper, Step, StepLabel, Button, Snackbar, Alert } from '@mui/material';
import './FormCriarAtividade.css';

import DetalhesAtividadeForm from '../DetalhesAtividadeForm/DetalhesAtividadesForm';
import SelecaoJogo from '../SelecaoJogo/SelecaoJogo';
import useFetchTurmas from '../../../../utils/hooks/useFetchTurmas';
import useFetchJogos from '../../../../utils/hooks/useFetchJogos';
import ApiService from '../../../../utils/ApiService';

const FormHeader = ({ onClose, isEditing }) => (
  <div className="form-atividade-header">
    <img src='https://cdn-icons-png.freepik.com/128/7583/7583670.png' alt="Icone de Atividade" />
    <h2>{isEditing ? 'Editar Atividade' : 'Criar Atividade'}</h2>
    <button onClick={onClose} className="btn-fechar">
      <RiCloseLine />
    </button>
  </div>
);

const FormCriarAtividade = ({ onClose, onAtividadeCreated, atividade }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [activeStep, setActiveStep] = useState(0);
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false); // Estado para exibir o alert de sucesso
  const { turmas } = useFetchTurmas();
  const { jogos } = useFetchJogos();

  const isEditing = Boolean(atividade);

  // Preenche os campos ao editar
  useEffect(() => {
    if (isEditing && atividade) {
      setValue('nome', atividade.nome);
      setValue('descricao', atividade.descricao);
      setSelectedActivityType(atividade.jogo?.nome || null);
      setValue('dataCriacao', atividade.dataCriacao);
      setValue('dataEncerramento', atividade.dataEncerramento);
    }
  }, [atividade, setValue, isEditing]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessAlert(false);
  };

  const steps = ["Tipo de Atividade", "Detalhes da Atividade"];

  const stylesButton = {
    fontFamily: 'Irish Grover',
    padding: '12px 20px',
    borderRadius: '30px',
    width: '25%',
    fontSize: '1.1rem',
    backgroundColor: '#FFF',
  };

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const onSubmit = (data) => {
    const selectedTurma = turmas.find(turma => String(turma.id) === data.turma);
    const selectedJogo = jogos.find(jogo => jogo.nome === selectedActivityType);

    const requestData = {
      ...data,
      turma: selectedTurma,
      jogo: selectedJogo
    };

    const request = isEditing
      ? new ApiService().post('atividade', { ...requestData, id: atividade.id })
      : new ApiService().post("atividade", requestData);

    request
      .then(() => {
        if (onAtividadeCreated) onAtividadeCreated();
        onClose();
      })
      .catch(error => console.error("Erro ao salvar atividade:", error));

    setSuccessAlert(true); // Exibe o alert de sucesso
  };

  return (
    <div className="form-atividade-overlay">
      <FormHeader onClose={onClose} isEditing={isEditing} />
      <div className="form-atividade-container">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <SelecaoJogo 
              selectedActivityType={selectedActivityType} 
              setSelectedActivityType={setSelectedActivityType} 
              jogos={jogos} 
            />
          )}
          {activeStep === 1 && (
            <DetalhesAtividadeForm 
              register={register} 
              errors={errors} 
              turmasOptions={turmas}
              setValue={setValue}
              atividade={atividade}
              isEditing={isEditing}
            />
          )}

          <div className="button-container">
            <Button 
              disabled={activeStep === 0} 
              variant='outlined' 
              onClick={handleBack} 
              sx={stylesButton}
            >
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button 
                type="submit" 
                variant="contained" 
                color="success" 
                sx={{
                  ...stylesButton, 
                  backgroundColor: '#7AD487', 
                  color: '#fff', 
                  border: 'none',
                }}
              >
                {isEditing ? 'Salvar' : 'Criar'} <IoArrowForward />
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                variant='outlined' 
                disabled={!selectedActivityType} 
                sx={stylesButton}
              >
                Próximo <IoArrowForward />
              </Button>
            )}
          </div>
        </form>

        <Snackbar open={successAlert} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            This is a success Alert inside a Snackbar!
          </Alert>
      </Snackbar>
      </div>
    </div>
  );
};

export default FormCriarAtividade;
