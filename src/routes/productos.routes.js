const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

router.get('/', productosController.getAllProductos);
router.get('/destacados', productosController.getProductosDestacados);
router.get('/nuevos', productosController.getProductosNuevos);
router.get('/buscar', productosController.buscarProductos);
router.get('/:id', productosController.getProductoById);
router.post('/', productosController.createProducto);
router.put('/:id', productosController.updateProducto);
router.delete('/:id', productosController.deleteProducto);

module.exports = router;