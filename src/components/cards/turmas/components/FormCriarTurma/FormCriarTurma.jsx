// FormCriarTurma.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiCloseLargeFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { Button } from '@mui/material';
import './FormCriarTurma.css';

const FormCriarTurma = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Log dos dados da turma
    onClose(); // Fecha o modal após a criação
  };

  return (
    <div className="form-turmas-overlay">
      <div className="form-turmas-header">
        <h2>Criar Turma</h2>
      </div>
      <div className="form-turmas-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-turmas-group">
            <label>Nome da turma *</label>
            <input 
              type="text" 
              {...register('nome', { required: true })} 
            />
            {errors.nome && <span className="error">Este campo é obrigatório</span>}
          </div>
          <div className="form-turmas-group">
            <label>Quantidade de Alunos *</label>
            <input 
              type="number" 
              {...register('quantidadeAlunos', { required: true, min: 1 })} 
            />
            {errors.quantidadeAlunos && <span className="error">Este campo é obrigatório</span>}
          </div>
          <div className="form-turmas-group">
            <label>Descrição</label>
            <textarea 
              {...register('descricao')} 
              rows="4"
            ></textarea>
          </div>

          <div className="form-turmas-buttons">
            <Button type="submit" variant="contained" color="success" style={{
              fontFamily: 'Irish Grover',
              backgroundColor:'#ff8543', 
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
          </div>
        </form>
        <button onClick={onClose} className="btn-fechar">
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
};

export default FormCriarTurma;
