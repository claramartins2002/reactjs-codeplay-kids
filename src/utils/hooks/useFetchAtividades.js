import { useState, useEffect } from 'react';
import ApiService from '../ApiService';

const useFetchAtividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAtividades = async () => {
    setLoading(true);
    setError(null);
    try {
      const api = new ApiService();
      const response = await api.getAtividadesByProfessor('1'); // Chama a função get para buscar todas as atividades
      setAtividades(response);
    } catch (error) {
      setError("Erro ao buscar atividades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtividades(); // Chama fetchAtividades ao montar o componente
  }, []);

  return { atividades, loading, error, refetch: fetchAtividades };
};

export default useFetchAtividades;
