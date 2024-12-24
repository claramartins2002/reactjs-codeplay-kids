import { useState, useCallback } from 'react';
import ApiService from '../ApiService';

const useFetchRelatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRelatoriosByTurma = useCallback(async (turmaId) => {
    setLoading(true);
    try {
      const api = new ApiService();
      const response = await api.get(`/relatorio/getByTurma/${turmaId}`);
      setRelatorios(response);
    } catch (error) {
      setError('Erro ao buscar relatórios por turma.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRelatoriosByAtividade = useCallback(async (atividadeId) => {
    setLoading(true);
    try {
      const api = new ApiService();
      const response = await api.get(`/relatorio/getByAtividade/${atividadeId}`);
      setRelatorios(response || []);
    } catch (error) {
      setError('Erro ao buscar relatórios por atividade.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRelatoriosByAluno = useCallback(async (alunoId) => {
    setLoading(true);
    try {
      const api = new ApiService();
      const response = await api.get(`/relatorio/getByAluno/${alunoId}`);
      setRelatorios(response || []);
    } catch (error) {
      setError('Erro ao buscar relatórios por aluno.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    relatorios,
    loading,
    error,
    fetchRelatoriosByTurma,
    fetchRelatoriosByAtividade,
    fetchRelatoriosByAluno,
  };
};

export default useFetchRelatorios;
