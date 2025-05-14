const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de productos funcionando correctamente',
    version: '1.0.0'
  });
});

// Importar rutas
const categoriasRoutes = require('./routes/categorias.routes');
const subcategoriasRoutes = require('./routes/subcategorias.routes');
const marcasRoutes = require('./routes/marcas.routes');
const productosRoutes = require('./routes/productos.routes');
const imagenesRoutes = require('./controllers/imagenes.controller');
const especificacionesRoutes = require('./controllers/especificaciones.controller');

// Rutas de la API
app.use('/api/categorias', categoriasRoutes);
app.use('/api/subcategorias', subcategoriasRoutes);
app.use('/api/marcas', marcasRoutes);
app.use('/api/productos', productosRoutes);

// Rutas anidadas para imágenes y especificaciones
app.use('/api/productos/:productoId/imagenes', (req, res, next) => {
  // Middleware para pasar el productoId a los controladores
  req.productoId = req.params.productoId;
  next();
}, require('./routes/imagenes.routes'));

app.use('/api/productos/:productoId/especificaciones', (req, res, next) => {
  // Middleware para pasar el productoId a los controladores
  req.productoId = req.params.productoId;
  next();
}, require('./routes/especificaciones.routes'));

// Rutas adicionales para las relaciones entre entidades
app.get('/api/categorias/:categoriaId/subcategorias', 
  require('./controllers/subcategorias.controller').getSubcategoriasByCategoria);

app.get('/api/categorias/:categoriaId/productos', 
  require('./controllers/productos.controller').getProductosByCategoria);

app.get('/api/subcategorias/:subcategoriaId/productos', 
  require('./controllers/productos.controller').getProductosBySubcategoria);

app.get('/api/marcas/:marcaId/productos', 
  require('./controllers/productos.controller').getProductosByMarca);

// Middleware para manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});