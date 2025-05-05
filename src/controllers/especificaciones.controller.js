const Especificacion = require('../models/especificacion.model');

exports.getEspecificacionesByProducto = async (req, res) => {
  try {
    const especificaciones = await Especificacion.getByProducto(req.params.productoId);
    res.status(200).json(especificaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener especificaciones del producto' });
  }
};

exports.getEspecificacionById = async (req, res) => {
  try {
    const especificacion = await Especificacion.getById(req.params.id);
    if (!especificacion) {
      return res.status(404).json({ message: 'Especificación no encontrada' });
    }
    res.status(200).json(especificacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la especificación' });
  }
};

exports.createEspecificacion = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.valor || !req.params.productoId) {
      return res.status(400).json({ 
        message: 'El nombre, valor y ID del producto son obligatorios' 
      });
    }
    
    // Asegúrate de que el producto_id se asigne correctamente
    const especificacion = {
      ...req.body,
      producto_id: req.params.productoId
    };
    
    const id = await Especificacion.create(especificacion);
    res.status(201).json({ id, ...especificacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la especificación' });
  }
};

exports.updateEspecificacion = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre || !req.body.valor) {
      return res.status(400).json({ message: 'El nombre y valor son obligatorios' });
    }
    
    const especificacion = {
      nombre: req.body.nombre,
      valor: req.body.valor
    };
    
    const result = await Especificacion.update(req.params.id, especificacion);
    if (result === 0) {
      return res.status(404).json({ message: 'Especificación no encontrada' });
    }
    res.status(200).json({ id: req.params.id, ...especificacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la especificación' });
  }
};

exports.deleteEspecificacion = async (req, res) => {
  try {
    const result = await Especificacion.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Especificación no encontrada' });
    }
    res.status(200).json({ message: 'Especificación eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la especificación' });
  }
};