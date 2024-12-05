// hooks/useFetchTurma.js
import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiService';

const useFetchTurma = (turmaId) => {
  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define a função fetchTurma fora do useEffect para que possamos referenciá-la no retorno do hook
  const fetchTurma = async () => {
    setLoading(true);
    try {
      const api = new ApiService();
      const response = await api.getById('turma', turmaId);
      const updatedAlunos = await api.getAlunosByTurma(response.id);
      setAlunos(updatedAlunos);
      setTurma({ ...response, alunos: updatedAlunos });
    } catch (error) {
      setError("Erro ao buscar a turma");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurma(); // Chama fetchTurma ao montar o componente
  }, [turmaId]);

  // Retorna os dados e a função fetchTurma como refetch
  return { turma, alunos, loading, error, refetch: fetchTurma };
};

export default useFetchTurma;
