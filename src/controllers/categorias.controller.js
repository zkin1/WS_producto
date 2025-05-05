const Categoria = require('../models/categoria.model');

exports.getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.getAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

exports.getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.getById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la categoría' });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.slug) {
      return res.status(400).json({ message: 'El nombre y el slug son obligatorios' });
    }
    
    const id = await Categoria.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.slug) {
      return res.status(400).json({ message: 'El nombre y el slug son obligatorios' });
    }
    
    const result = await Categoria.update(req.params.id, req.body);
    if (result === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la categoría' });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    const result = await Categoria.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
};