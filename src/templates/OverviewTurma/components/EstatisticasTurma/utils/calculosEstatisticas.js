export const calcularMediaAcertosErros = (relatoriosMatematica) => {
  return relatoriosMatematica.reduce((acc, relatorio) => {
    return {
      acertos: acc.acertos + relatorio.acertos,
      erros: acc.erros + relatorio.erros,
      total: acc.total + 1
    };
  }, { acertos: 0, erros: 0, total: 0 });
};

export const calcularMediaTempoGasto = (relatoriosMatematica) => {
  return relatoriosMatematica.reduce((acc, relatorio) => 
    acc + relatorio.tempoGasto, 0) / relatoriosMatematica.length || 0;
};

export const calcularMediaPontuacao = (relatoriosMatematica) => {
  return relatoriosMatematica.reduce((acc, relatorio) => 
    acc + relatorio.pontuacao, 0) / relatoriosMatematica.length || 0;
};

export const calcularProgressoAtividades = (atividades, alunos, relatoriosMatematica) => {
  const totalPossivel = atividades.length * alunos.length;
  const alunosQueRealizaram = new Set(relatoriosMatematica.map(r => r.aluno.id)).size;
  const porcentagemRealizada = (alunosQueRealizaram / totalPossivel) * 100;

  return [
    { name: 'Realizadas', valor: porcentagemRealizada },
    { name: 'Pendentes', valor: 100 - porcentagemRealizada }
  ];
};

export const calcularQuantidadePorJogo = (atividades) => {
  const quantidadePorJogo = atividades.reduce((acc, atividade) => {
    let nomeJogo = atividade.jogo.nome;
    
    if (nomeJogo.includes('Números')) {
      nomeJogo = 'Operações Matemáticas';
    }
    
    acc[nomeJogo] = (acc[nomeJogo] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(quantidadePorJogo).map(([nomeJogo, quantidade]) => ({
    name: nomeJogo,
    valor: quantidade
  }));
}; 