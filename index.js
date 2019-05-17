const express = require('express');
const body_parser = require('body-parser');
const database = require('./config/database.config');

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use((req, res, next) => {
    res.set({ 'Content-Type' : 'application/json'});
    next();
});

const RegisterController = require('./Controller/RegisterController');
const LoginController = require('./Controller/LoginController');
const BukuController = require('./Controller/BukuController');
const UserController = require('./Controller/UserController');

app.post('/api/v1/register', RegisterController.store);
app.post('/api/v1/login', LoginController.login);

app.get('/api/v1/user', UserController.show);
app.get('/api/v1/user/:user_id', UserController.getById);
app.put('/api/v1/user/:user_id', UserController.update);
app.delete('/api/v1/user/:user_id', UserController.delete);

app.post('/api/v1/buku', BukuController.store);
app.get('/api/v1/buku', BukuController.show);
app.get('/api/v1/buku/:buku_id', BukuController.getById);
app.put('/api/v1/buku/:buku_id', BukuController.update);
app.delete('/api/v1/buku/:buku_id', BukuController.delete);

app.listen(8000, function() {
    console.log("Server is running: *8000");
});