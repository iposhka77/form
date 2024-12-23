import React from 'react';

const FormList = ({ forms }) => {
  return (
    <div className="form-list-container">
      <h2>Отправленные анкеты</h2>
      {forms.length === 0 ? (
        <p>Анкеты еще не отправлены.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Email</th>
              <th>Контакт</th>
              <th>Пол</th>
              <th>Предмет</th>
              <th>URL</th>
              <th>О себе</th>
              <th>Резюме</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id}>
                <td>{form.firstName}</td>
                <td>{form.lastName}</td>
                <td>{form.email}</td>
                <td>{form.contact}</td>
                <td>{form.gender}</td>
                <td>{form.subject}</td>
                <td>{form.url}</td>
                <td>{form.about}</td>
                <td>
                  {form.resume && (
                    <a 
                      href={`http://localhost:5000/uploads/${form.resume}`} 
                      target="_blank" 
                      rel="noopener noreferrer">
                      <button>Скачать</button>
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormList;
