// components/GenericForm/GenericForm.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiCloseLargeFill } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { Button } from '@mui/material';
import './GenericForm.css';

const GenericForm = ({ title, fields, initialData, onClose, onSubmit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (initialData) {
      setIsEditMode(true);
      Object.keys(initialData).forEach(key => setValue(key, initialData[key]));
    }
  }, [initialData, setValue]);

  const submitHandler = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className="form-overlay">
      <div className="form-header">
        <h2>{isEditMode ? `Editar ${title}` : `Criar ${title}`}</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(submitHandler)}>
          {fields.map(({ name, label, type, required }) => (
            <div key={name} className="form-group">
              <label>{label} {required && '*'}</label>
              {type === 'textarea' ? (
                <textarea {...register(name, { required })} rows="4"></textarea>
              ) : (
                <input type={type || 'text'} {...register(name, { required })} />
              )}
              {errors[name] && <span className="error">Este campo é obrigatório</span>}
            </div>
          ))}

          <div className="form-buttons">
            <Button type="submit" variant="contained" color="success" style={{
              fontFamily: 'Irish Grover',
              backgroundColor: '#87A2FF',
              color: 'white',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '30px',
              width: '25%',
              fontSize: '1.1rem',
              gap: '5px'
            }}>
              {isEditMode ? "Salvar" : "Criar"} <IoArrowForward />
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

export default GenericForm;
