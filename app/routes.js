const express = require('express');
const router = express.Router();

//Controller
const AuthController = require('./controllers/AuthController');

//Home
router.get('/', (req, res) => {
    res.send('Hello, world! modified');
});

//Dos rutas: login y registro
// /api/login y /api/registro
router.post('/api/login', AuthController.signIn);
router.post('/api/registro', AuthController.signUp);

router.post('/api/perfil', AuthController.perfil);

module.exports = router;