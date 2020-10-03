# Denjoy

##### Тестовое задание:

 - Развернуть сервер с использованием node.js
 - Реализовать две ручки: 
   - на авторизацию 
   - на проверку, авторизован ли пользователь, без использования библиотек для работы с сессиями (сессии можно хранить локально, но лучше в redis)
 - Пройти авторизацию при помощи telnet или curl (прислать скрины запросов и результатов)
 - Реализовать две ручки на загрузку файла через form-data и на его отдачу без использования библиотек.



Install the dependencies and devDependencies and start the server.

```sh
$ npm install 
```
```sh
$ npm start 
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:3000
```


#### Routes:

To upload files to the server.
```sh
$ http://localhost:3000/upload
```
To download files from the server. (yourFile - name of the file uploaded to the server)
```sh
$ http://localhost:3000/download?filename=${yourFile}
```
##### With Curl:
Authorization check.
```sh
$ curl -X GET http://localhost:3000/users
```
Getting a token. 
```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"username":"user1","password":"123"}' http://localhost:3000/login
```
Authorization check with token.
```sh
$ curl -H "Authorization: Bearer dXNlcjEuMTIzLmJhYg==" http://localhost:3000/users
```