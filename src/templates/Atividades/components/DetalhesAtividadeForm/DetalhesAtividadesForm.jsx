import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import '../FormCriarAtividade/FormCriarAtividade.css';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const DetalhesAtividadeForm = ({ register, errors, setValue, turmasOptions }) => {
  const [rangePickerValue, setRangePickerValue] = useState([]);

  const handleDateChange = (dates) => {
    setRangePickerValue(dates);
    
    if (dates && dates.length === 2) {
      // Atribuindo as datas de criação e encerramento
      setValue('dataCriacao', dates[0].format('DD/MM/YYYY'));
      setValue('dataEncerramento', dates[1].format('DD/MM/YYYY'));
    }
  };

  return (
    <>
      <div className="form-atividade-group">
        <label>Nome da atividade *</label>
        <input type="text" {...register('nome', { required: "Este campo é obrigatório" })} />
        {errors.nome && <span className="error">{errors.nome.message}</span>}
      </div>
      <div className="form-atividade-group">
        <label>Turma *</label>
        <select
          {...register('turma', { required: "Este campo é obrigatório" })}>
          <option value="">Selecione...</option>
          {turmasOptions.map((turma) => (
            <option key={turma.id} value={turma.id}>{turma.nome}</option>
          ))}
        </select>
        {errors.turma && <span className="error">{errors.turma.message}</span>}
      </div>
      <div className="form-atividade-group">
        <label>Data</label>
        <div className="input-with-icon">
          <RangePicker
            format="DD/MM/YYYY"
            value={rangePickerValue}
            onChange={handleDateChange} // Atualiza as datas e usa o register
          />
        </div>
      </div>
      <div className="form-atividade-group">
        <label>Descrição</label>
        <textarea {...register('descricao')} rows="2"></textarea>
      </div>
    </>
  );
};

export default DetalhesAtividadeForm;
