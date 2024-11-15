// FormCriarAluno.jsx
import React from 'react';
import GenericForm from '../../GenericForm/GenericForm';
import ApiService from '../../../utils/ApiService';
import GerarUsuario from '../../../utils/GerarUsuario';
import './FormCriarAluno.css';

const FormCriarAluno = ({ onClose, onAlunoCreated, initialData, turma }) => {
  const fields = [
    { name: 'nome', label: 'Nome do Aluno', required: true },
    { name: 'dataNascimento', label: 'Data de Nascimento', type: 'date', required: true },
    { name: 'fotoUrl', label: 'URL da Foto' }
  ];

  const handleSubmit = (data) => {
    const gerarUsuario = new GerarUsuario(data);
    const credenciais = gerarUsuario.gerarUsuarioSenha();
    const requestData = { ...data, turma: turma, ...credenciais };
    const apiService = new ApiService();

    const apiCall = initialData
      ? apiService.post('aluno', { ...requestData, id: initialData.id })
      : apiService.post("aluno", requestData);

    apiCall
      .then(() => {
        onAlunoCreated();
        console.log(initialData ? "Aluno editado com sucesso" : "Aluno criado com sucesso");
      })
      .catch(error => console.error("Erro ao salvar aluno:", error));
  };

  return (
    <GenericForm
      title="Aluno"
      fields={fields}
      initialData={initialData}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default FormCriarAluno;
