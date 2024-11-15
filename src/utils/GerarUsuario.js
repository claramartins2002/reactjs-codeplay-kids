export default class GerarUsuario {
  constructor(aluno) {
    this.nome = aluno.nome;
    this.dataNascimento = aluno.dataNascimento;
  }

  gerarUsuarioSenha() {
    // Remove acentos, substitui espaços por pontos e coloca o nome em caixa baixa
    const usuario = this.nome
      .normalize("NFD") // Normaliza para decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas
      .replace(/\s+/g, '.')
      .toLowerCase();
    
    // Divide a data de nascimento e reorganiza para o formato DDMMAAAA
    const [ano, mes, dia] = this.dataNascimento.split('-');
    const senha = `${dia}${mes}${ano}`;
    
    return {
      usuario,
      senha
    };
  }
}