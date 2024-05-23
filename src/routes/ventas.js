const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Listar ventas
router.get('/ventas', ventaController.list);

// Guardar venta
router.post('/ventas/add', ventaController.save);

// Editar venta
router.get('/ventas/edit/:id_venta', ventaController.edit);
router.post('/ventas/update/:id_venta', ventaController.update);

// Eliminar venta
router.get('/ventas/delete/:id_venta', ventaController.delete);

module.exports = router;
