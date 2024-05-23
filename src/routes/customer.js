const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Listar clientes
router.get('/', customerController.list);

// Guardar cliente
// Guardar cliente
router.post('/add', customerController.save);
 // Esta es la ruta para manejar la solicitud POST del formulario de agregar cliente

// Editar cliente
router.get('/edit/:id_cliente', customerController.edit);
router.post('/update/:id_cliente', customerController.update);

// Eliminar cliente
router.get('/delete/:id_cliente', customerController.delete);

module.exports = router;
