// FormCriarAluno.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiCloseLargeFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { Button } from '@mui/material';
import './FormCriarAluno.css';

const FormCriarAluno = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Log dos dados do aluno
    onClose(); // Fecha o modal após a criação
  };

  return (
    <div className="form-aluno-overlay">
      <div className="form-aluno-header">
        <h2>Criar Aluno</h2>
      </div>
      <div className="form-aluno-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-aluno-group">
            <label>Nome do Aluno *</label>
            <input 
              type="text" 
              {...register('nome', { required: true })} 
            />
            {errors.nome && <span className="error">Este campo é obrigatório</span>}
          </div>
          <div className="form-aluno-group">
            <label>Data de Nascimento *</label>
            <input 
              type="date" 
              {...register('dataNascimento', { required: true })} 
            />
            {errors.dataNascimento && <span className="error">Este campo é obrigatório</span>}
          </div>
          <div className="form-aluno-group">
            <label>URL da Foto</label>
            <input 
              type="text" 
              {...register('fotoUrl')} 
            />
          </div>

          <div className="form-aluno-buttons">
            <Button type="submit" variant="contained" color="success" style={{
              fontFamily: 'Irish Grover',
              backgroundColor:'#e757e2', 
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

export default FormCriarAluno;
