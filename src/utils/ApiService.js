import axios from 'axios';

class ApiService {
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

  // Método para inserir dados
  async save(entity, data) {
    try {
      const response = await this.axiosInstance.post(entity, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para atualizar dados
  async update(id, entity, data) {
    try {
      const response = await this.axiosInstance.put(entity, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ApiService;
