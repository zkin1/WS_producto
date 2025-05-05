const Subcategoria = require('../models/subcategoria.model');

exports.getAllSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategoria.getAll();
    res.status(200).json(subcategorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener subcategorías' });
  }
};

exports.getSubcategoriaById = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.getById(req.params.id);
    if (!subcategoria) {
      return res.status(404).json({ message: 'Subcategoría no encontrada' });
    }
    res.status(200).json(subcategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la subcategoría' });
  }
};

exports.getSubcategoriasByCategoria = async (req, res) => {
  try {
    const subcategorias = await Subcategoria.getByCategoria(req.params.categoriaId);
    res.status(200).json(subcategorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener subcategorías por categoría' });
  }
};

exports.createSubcategoria = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.slug || !req.body.categoria_id) {
      return res.status(400).json({ 
        message: 'El nombre, slug y categoria_id son obligatorios' 
      });
    }
    
    const id = await Subcategoria.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la subcategoría' });
  }
};

exports.updateSubcategoria = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.slug || !req.body.categoria_id) {
      return res.status(400).json({ 
        message: 'El nombre, slug y categoria_id son obligatorios' 
      });
    }
    
    const result = await Subcategoria.update(req.params.id, req.body);
    if (result === 0) {
      return res.status(404).json({ message: 'Subcategoría no encontrada' });
    }
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la subcategoría' });
  }
};

exports.deleteSubcategoria = async (req, res) => {
  try {
    const result = await Subcategoria.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Subcategoría no encontrada' });
    }
    res.status(200).json({ message: 'Subcategoría eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la subcategoría' });
  }
};