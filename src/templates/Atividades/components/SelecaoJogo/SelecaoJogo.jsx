import { Card, CardContent, Typography, Grid } from '@mui/material';
import '../FormCriarAtividade/FormCriarAtividade.css';

const SelecaoJogo = ({ selectedActivityType, setSelectedActivityType, jogos }) => (
  <Grid container spacing={2}>
    {jogos.map((activity) => (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={5} 
        lg={3} 
        key={activity.nome}
        display="flex" 
        justifyContent="center"
      >
        <Card
          onClick={() => setSelectedActivityType(activity.nome)}
          style={{
            margin: '10px', cursor: 'pointer', borderRadius: '20px', maxWidth: '100%',
            border: selectedActivityType === activity.value ? '2px solid #7AD487' : '2px solid transparent',
            backgroundColor: selectedActivityType === activity.nome ? '#c4ecca' : '#FFF'
          }}
        >
          <CardContent>
            <img src={activity.icone} alt={`${activity.nome} icon`} style={{ width: '50px', height: '50px', margin: '0 auto' }} />
            <Typography variant="h6" style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Irish Grover' }}>
              {activity.nome}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default SelecaoJogo;
