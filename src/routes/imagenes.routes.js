const express = require('express');
const router = express.Router();
const imagenesController = require('../controllers/imagenes.controller');

// Estas rutas son relativas a /api/productos/:productoId/imagenes
router.get('/', imagenesController.getImagenesByProducto);
router.post('/', imagenesController.createImagen);
router.get('/:id', imagenesController.getImagenById);
router.put('/:id', imagenesController.updateImagen);
router.delete('/:id', imagenesController.deleteImagen);

module.exports = router;