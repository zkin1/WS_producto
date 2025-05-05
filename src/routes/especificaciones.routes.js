const express = require('express');
const router = express.Router();
const especificacionesController = require('../controllers/especificaciones.controller');

// Estas rutas son relativas a /api/productos/:productoId/especificaciones
router.get('/', especificacionesController.getEspecificacionesByProducto);
router.post('/', especificacionesController.createEspecificacion);
router.get('/:id', especificacionesController.getEspecificacionById);
router.put('/:id', especificacionesController.updateEspecificacion);
router.delete('/:id', especificacionesController.deleteEspecificacion);

module.exports = router;