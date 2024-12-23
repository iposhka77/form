Этот проект использует React для фронтенда и MongoDB для хранения данных. Для корректной работы MongoDB должен быть установлен и запущен на порту 27017.

Установка

cd form-main

npm install


Запуск
Откройте два терминала:


В первом терминале запустите сервер:


cd form-main/server

node server


Во втором терминале запустите клиентскую часть:


cd form-main

npm start

Структура проекта


/FORM-MAIN
│
│── /node_modules
│── /public    
│── /server
│    ├── server.js    
│    ├── /uploads     
│── /src
│    ├── /components
│    │   ├── FormComponent.js
│    │   ├── FormList.js
│    ├── App.css
│    ├── App.js 

