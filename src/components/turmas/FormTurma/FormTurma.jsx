// FormCriarTurma.jsx
import React from 'react';
import GenericForm from '../../GenericForm/GenericForm';
import ApiService from '../../../utils/ApiService';

const FormTurma = ({ onClose, onTurmaCreated, initialData }) => {
  const fields = [
    { name: 'nome', label: 'Nome da turma', required: true },
    { name: 'descricao', label: 'Descrição', type: 'textarea' }
  ];

  const handleSubmit = (data) => {
    const professorData = {
      id: 1,
      nome: "Carlos Eduardo",
      email: "carlos.eduardo@example.com",
      senha: "senha123"
    }; 

    const requestData = { ...data, professor: professorData };

    const apiCall = initialData
      ? new ApiService().post('turma', { ...requestData, id: initialData.id })
      : new ApiService().post("turma", requestData);

    apiCall
      .then(() => {
        onTurmaCreated();
        console.log(initialData ? "Turma editada com sucesso" : "Turma criada com sucesso");
      })
      .catch(error => console.error("Erro ao salvar turma:", error));
  };

  return (
    <GenericForm
      title="Turma"
      fields={fields}
      initialData={initialData}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default FormTurma;
