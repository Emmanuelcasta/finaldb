// routes/clientes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Listar clientes
router.get('/', customerController.list);

// Mostrar formulario de edición de cliente
router.get('/edit/:id_cliente', customerController.edit);

// Guardar cliente
router.post('/add', customerController.save);

// Editar cliente
router.post('/update/:id_cliente', customerController.update);

// Eliminar cliente
router.get('/delete/:id_cliente', customerController.delete);

module.exports = router;
