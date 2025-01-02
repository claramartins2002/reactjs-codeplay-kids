import axios from 'axios';

export default class ApiService {
  constructor() {
    this.baseUrl = 'http://127.0.0.1:8080/';
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Método para buscar dados
  async get(entity) {
    try {
      const response = await this.axiosInstance.get(entity);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  // Método para buscar dados
  async getById(entity, id) {
    try {
      const response = await this.axiosInstance.get(`${entity}/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getAtividadesByProfessor(idProfessor) {
    try {
      const response = await this.axiosInstance.get(`atividade/getByProfessor/${idProfessor}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  // Método para buscar dados
  async getTurmasByProfessor(idProfessor) {
    try {
      const response = await this.axiosInstance.get(`turma/getByProfessorId/${idProfessor}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getAlunosByTurma(idTurma) {
    try {
      const response = await this.axiosInstance.get(`aluno/getByTurma/${idTurma}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async post(entity, data) {
    try {
      const response = await this.axiosInstance.post(entity, data);
      console.log("Resposta da API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      throw error;
    }
  }

  // Método para atualizar dados
  async put(id, entity, data) {
    try {
      const response = await this.axiosInstance.put(`${entity}/${id}`, data);
      console.log("Dados atualizados:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      throw error;
    }
  }

  async getRelatoriosByAluno(idAluno) {
    try {
      const response = await this.axiosInstance.get(`desempenho/aluno/${idAluno}`);
      console.log("Relatórios do aluno:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error;
    }
  }
}

