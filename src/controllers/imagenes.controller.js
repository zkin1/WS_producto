const Imagen = require('../models/imagen.model');

exports.getImagenesByProducto = async (req, res) => {
  try {
    const imagenes = await Imagen.getByProducto(req.params.productoId);
    res.status(200).json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener imágenes del producto' });
  }
};

exports.getImagenById = async (req, res) => {
  try {
    const imagen = await Imagen.getById(req.params.id);
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.status(200).json(imagen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la imagen' });
  }
};

exports.createImagen = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.url || !req.params.productoId) {
      return res.status(400).json({ message: 'La URL y el ID del producto son obligatorios' });
    }
    
    // Asegúrate de que el producto_id se asigne correctamente
    const imagen = {
      ...req.body,
      producto_id: req.params.productoId
    };
    
    const id = await Imagen.create(imagen);
    res.status(201).json({ id, ...imagen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la imagen' });
  }
};

exports.updateImagen = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.url) {
      return res.status(400).json({ message: 'La URL es obligatoria' });
    }
    
    // Asegúrate de que el producto_id se asigne correctamente
    const imagen = {
      ...req.body,
      producto_id: req.params.productoId
    };
    
    const result = await Imagen.update(req.params.id, imagen);
    if (result === 0) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.status(200).json({ id: req.params.id, ...imagen });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la imagen' });
  }
};

exports.deleteImagen = async (req, res) => {
  try {
    const result = await Imagen.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.status(200).json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la imagen' });
  }
};