const express = require('express');
const cors = require('cors');
const path = require('path'); // Añadido para manejo de rutas de archivos
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos para imágenes

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de productos funcionando correctamente',
    version: '1.0.0'
  });
});

// Ruta de prueba para verificar que el proxy funciona
app.get('/test', (req, res) => {
  res.json({ message: 'La ruta /test de la API de productos funciona correctamente' });
});

// Importar rutas
const categoriasRoutes = require('./routes/categorias.routes');
const subcategoriasRoutes = require('./routes/subcategorias.routes');
const marcasRoutes = require('./routes/marcas.routes');
const productosRoutes = require('./routes/productos.routes');
const imagenesRoutes = require('./routes/imagenes.routes');
const especificacionesRoutes = require('./routes/especificaciones.routes');

// Importar controlador de imágenes para la búsqueda por nombre
const imagenesController = require('./controllers/imagenes.controller');

// Rutas de la API
app.use('/categorias', categoriasRoutes);
app.use('/subcategorias', subcategoriasRoutes);
app.use('/marcas', marcasRoutes);
app.use('/productos', productosRoutes);

// Nueva ruta para buscar imágenes por nombre de producto
app.get('/imagenes/search', imagenesController.searchImagenesByProductName);

// Rutas anidadas para imágenes y especificaciones
app.use('/productos/:productoId/imagenes', (req, res, next) => {
  req.productoId = req.params.productoId;
  next();
}, imagenesRoutes);

app.use('/productos/:productoId/especificaciones', (req, res, next) => {
  req.productoId = req.params.productoId;
  next();
}, especificacionesRoutes);

// Rutas adicionales para las relaciones entre entidades
app.get('/categorias/:categoriaId/subcategorias', 
  require('./controllers/subcategorias.controller').getSubcategoriasByCategoria);

app.get('/categorias/:categoriaId/productos', 
  require('./controllers/productos.controller').getProductosByCategoria);

app.get('/subcategorias/:subcategoriaId/productos', 
  require('./controllers/productos.controller').getProductosBySubcategoria);

app.get('/marcas/:marcaId/productos', 
  require('./controllers/productos.controller').getProductosByMarca);

// Middleware para manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor de API de productos corriendo en http://localhost:${port}`);
});