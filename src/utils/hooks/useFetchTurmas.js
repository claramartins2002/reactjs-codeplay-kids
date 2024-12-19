// hooks/useFetchTurmas.js
import { useState, useEffect } from 'react';
import ApiService from '../ApiService';

const useFetchTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTurmas = async () => {
    setLoading(true);
    try {
      const api = new ApiService();
      const response = await api.getTurmasByProfessor('1'); // Substitua '1' pelo ID do professor conforme necessário
      const turmasComAlunos = await Promise.all(
        response.map(async (turma) => {
          const alunos = await api.getAlunosByTurma(turma.id);
          return { ...turma, alunos };
        })
      );
      setTurmas(turmasComAlunos);
    } catch (error) {
      setError("Erro ao buscar as turmas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  // Retorna os dados e a função fetchTurmas como refetch
  return { turmas, loading, error, refetch: fetchTurmas };
};

export default useFetchTurmas;
