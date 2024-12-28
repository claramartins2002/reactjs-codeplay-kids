import { 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  ListItemSecondaryAction, 
  Avatar,
  Tooltip,
  Typography
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import '../RelatoriosAtividade.css';
import { ListStyles } from '../../../AtividadesStyles';

const ListaAlunosAtividade = ({ relatorios }) => {
  // Formata o tempo em segundos para minutos e segundos
  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segsRestantes = Math.floor(segundos % 60);
    return `${minutos}min ${segsRestantes}s`;
  };

  return (
    <div className="lista-alunos">
      <Typography
        variant="h6"
        sx={ListStyles.typography}
      >
        Alunos que completaram a atividade
      </Typography>

      <List sx={ListStyles.list}>
        {relatorios
          .sort((a, b) => b.pontuacao - a.pontuacao)
          .map((relatorio) => (
            <ListItem 
              key={relatorio.id}
              sx={ListStyles.listItem}
            >
              <ListItemAvatar>
                <Avatar 
                  alt={relatorio.aluno.nome}
                  src={relatorio.aluno.fotoUrl}
                  sx={{ bgcolor: '#c8b7f9' }}
                >
                  {relatorio.aluno.nome.charAt(0)}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={relatorio.aluno.nome}
                primaryTypographyProps={ListStyles.primaryTypography}
              />

              <ListItemSecondaryAction sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Tooltip title="Pontuação">
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                    <StarOutlineIcon sx={{ color: '#c8b7f9', marginRight: '5px' }} />
                    <Typography sx={ListStyles.typographyListitem}>
                      {relatorio.pontuacao}
                    </Typography>
                  </div>
                </Tooltip>

                <Tooltip title="Acertos">
                  <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                    <CheckCircleOutlineIcon sx={{ color: '#c8b7f9', marginRight: '5px' }} />
                    <Typography sx={ListStyles.typographyListitem}>
                      {relatorio.acertos}/{relatorio.tentativas} ({Math.round((relatorio.acertos / relatorio.tentativas) * 100)}%)
                    </Typography>
                  </div>
                </Tooltip>

                <Tooltip title="Tempo">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ color: '#c8b7f9', marginRight: '5px' }} />
                    <Typography sx={ListStyles.typographyListitem}>
                      {formatarTempo(relatorio.tempoGasto)}
                    </Typography>
                  </div>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ListaAlunosAtividade; 