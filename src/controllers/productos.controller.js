const Producto = require('../models/producto.model');

exports.getAllProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const resultado = await Producto.getAll(page, limit);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.getById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

exports.getProductosByCategoria = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const resultado = await Producto.getByCategoria(req.params.categoriaId, page, limit);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos por categoría' });
  }
};

exports.getProductosBySubcategoria = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const resultado = await Producto.getBySubcategoria(req.params.subcategoriaId, page, limit);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos por subcategoría' });
  }
};

exports.getProductosByMarca = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const resultado = await Producto.getByMarca(req.params.marcaId, page, limit);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos por marca' });
  }
};

exports.getProductosDestacados = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const productos = await Producto.getDestacados(limit);
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos destacados' });
  }
};

exports.getProductosNuevos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const productos = await Producto.getNuevos(limit);
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos nuevos' });
  }
};

exports.buscarProductos = async (req, res) => {
  try {
    const termino = req.query.q;
    if (!termino) {
      return res.status(400).json({ message: 'Es necesario proporcionar un término de búsqueda' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const resultado = await Producto.buscar(termino, page, limit);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar productos' });
  }
};

exports.createProducto = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.codigo || !req.body.precio || !req.body.categoria_id) {
      return res.status(400).json({ 
        message: 'El nombre, código, precio y categoria_id son obligatorios' 
      });
    }
    
    const id = await Producto.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.codigo || !req.body.precio || !req.body.categoria_id) {
      return res.status(400).json({ 
        message: 'El nombre, código, precio y categoria_id son obligatorios' 
      });
    }
    
    const result = await Producto.update(req.params.id, req.body);
    if (result === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const result = await Producto.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};