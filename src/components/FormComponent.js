import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormComponent = ({ onFormSubmit }) => {
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('contact', data.contact);
    formData.append('gender', data.gender); 
    formData.append('subject', data.subject); 
    formData.append('url', data.url);
    formData.append('about', data.about);
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:5000/api/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      onFormSubmit(response.data.form); 
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <h2>Форма в React</h2>
      {submitted && <p>Форма успешно отправлена!</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Имя*</label>
          <input type="text" {...register('firstName', { required: true })} />
        </div>
        <div className="form-group">
          <label>Фамилия*</label>
          <input type="text" {...register('lastName', { required: true })} />
        </div>
        <div className="form-group">
          <label>Email*</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div className="form-group">
          <label>Контакт*</label>
          <input type="text" {...register('contact', { required: true })} />
        </div>
        <div className="form-group">
          <label>Пол*</label>
          <div className="gender-options">
            <label>
              <input type="radio" {...register('gender', { required: true })} value="Мужчина" /> Мужчина
            </label>
            <label>
              <input type="radio" {...register('gender', { required: true })} value="Женщина" /> Женщина
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Ваш лучший предмет</label>
          <select {...register('subject', { required: true })}>
            <option value="Математика">Математика</option>
            <option value="Наука">Наука</option>
            <option value="История">История</option>
            <option value="Английский">Английский</option>
            <option value="Искусство">Искусство</option>
            <option value="Музыка">Музыка</option>
            <option value="Спорт">Спорт</option>
            <option value="Литература">Литература</option>
            <option value="Философия">Философия</option>
          </select>
        </div>
        <div className="form-group">
          <label>Загрузите резюме*</label>
          <input type="file" onChange={onFileChange} required />
        </div>
        <div className="form-group">
          <label>Введите URL*</label>
          <input type="url" {...register('url', { required: true })} />
        </div>
        <div className="form-group">
          <label>О себе</label>
          <textarea {...register('about')} />
        </div>
        <div className="button-group">
          <button type="button" onClick={() => reset()} className="reset-btn">Сбросить</button>
          <button type="submit" className="submit-btn">Отправить</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
