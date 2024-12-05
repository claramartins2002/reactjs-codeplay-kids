import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import '../FormCriarAtividade/FormCriarAtividade.css';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DetalhesAtividadeForm = ({ register, errors, setValue, turmasOptions, isEditing, atividade }) => {
  const [rangePickerValue, setRangePickerValue] = useState([]);
  
  // Definir a data mínima como um dia antes da data de hoje
  const minDate = dayjs().subtract(1, 'day');

  // Definir o valor inicial do DatePicker/RangePicker com base na atividade, se disponível
  useEffect(() => {
    if (atividade) {
      if (isEditing) {
        // Se for edição, usa a data de criação e data de encerramento da atividade
        setValue('dataCriacao', atividade.dataCriacao);
        setValue('dataEncerramento', atividade.dataEncerramento);
      } else {
        // Se não for edição, usa o range de datas da atividade
        setRangePickerValue([
          dayjs(atividade.dataCriacao), 
          dayjs(atividade.dataEncerramento)
        ]);
      }
    }
  }, [atividade, isEditing, setValue]);

  const handleRangeDateChange = (dates) => {
    setRangePickerValue(dates);
    
    if (dates && dates.length === 2) {
      // Atribuindo as datas de criação e encerramento
      setValue('dataCriacao', dates[0].format("YYYY-MM-DD"));
      setValue('dataEncerramento', dates[1].format("YYYY-MM-DD"));
    }
  };

  function handleDateChange(date) {
    setValue('dataCriacao', atividade.dataCriacao)
    setValue('dataEncerramento', dayjs(date).format("YYYY-MM-DD"));
    setValue('turma', atividade.turma)
    
  }

  return (
    <>
      <div className="form-atividade-group">
        <label>Nome da atividade *</label>
        <input type="text" {...register('nome', { required: "Este campo é obrigatório" })} className="input-atividade"/>
        {errors.nome && <span className="error">{errors.nome.message}</span>}
      </div>
      <div className="form-atividade-group">
        <label>Turma *</label>
        <select className="input-atividade"
          {...register('turma', { required: "Este campo é obrigatório" })}>
          <option value="">Selecione...</option>
          {turmasOptions.map((turma) => (
            <option key={turma.id} value={turma.id}>{turma.nome}</option>
          ))}
        </select>
        {errors.turma && <span className="error">{errors.turma.message}</span>}
      </div>
          {isEditing ? (
            <div className="form-atividade-group">
              <div className="input-with-icon">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField']}>
                    <DateField
                      label="Data de Fechamento"
                      format="DD/MM/YYYY"
                      defaultValue={atividade ? dayjs('2024-11-28') : dayjs('01/01/2024')}
                      onChange={(date) => handleDateChange(date)} // Atualiza a data única e usa o register
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          ) : (
            <>
              <div className="form-atividade-group">
                <RangePicker
                  format="DD/MM/YYYY"
                  value={rangePickerValue}
                  onChange={handleRangeDateChange} // Atualiza as datas e usa o register
                  disabledDate={(current) => current && current.isBefore(minDate, 'day')} // Desabilita datas antes do mínimo
                />
              </div>
            </>
          )}
      <div className="form-atividade-group">
        <label>Descrição</label>
        <textarea {...register('descricao')} rows="2" className="input-atividade"></textarea>
      </div>
    </>
  );
};

export default DetalhesAtividadeForm;
