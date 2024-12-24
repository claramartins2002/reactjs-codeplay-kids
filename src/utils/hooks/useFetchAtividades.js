import { useState, useCallback } from 'react';
import ApiService from '../ApiService';

const useFetchAtividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAtividadesByProfessor = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const api = new ApiService();
      const response = await api.getAtividadesByProfessor('1');
      setAtividades(response);
    } catch (error) {
      setError("Erro ao buscar atividades");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAtividadesByTurma = useCallback(async (idTurma) => {
    setLoading(true);
    setError(null);
    try {
      const api = new ApiService();
      const response = await api.get(`atividade/getByTurma/${idTurma}`);
      setAtividades(response);
    } catch (error) {
      setError("Erro ao buscar atividades");
    } finally {
      setLoading(false);
    }
  }, []);

  return { atividades, loading, error, fetchAtividadesByProfessor, fetchAtividadesByTurma, refetch: fetchAtividadesByProfessor };
};

export default useFetchAtividades;
