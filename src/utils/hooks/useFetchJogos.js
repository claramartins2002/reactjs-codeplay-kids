import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiService';

const useFetchJogos = () => {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJogos = async () => {
    setLoading(true);
    setError(null);
    try {
      const api = new ApiService();
      const response = await api.get('jogo'); // Chama a função get para buscar todos os jogos
      setJogos(response);
    } catch (error) {
      setError("Erro ao buscar jogos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJogos(); // Chama fetchJogos ao montar o componente
  }, []);

  return { jogos, loading, error, refetch: fetchJogos };
};

export default useFetchJogos;
