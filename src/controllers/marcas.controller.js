const Marca = require('../models/marca.model');

exports.getAllMarcas = async (req, res) => {
  try {
    const marcas = await Marca.getAll();
    res.status(200).json(marcas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener marcas' });
  }
};

exports.getMarcaById = async (req, res) => {
  try {
    const marca = await Marca.getById(req.params.id);
    if (!marca) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.status(200).json(marca);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la marca' });
  }
};

exports.createMarca = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    
    const id = await Marca.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la marca' });
  }
};

exports.updateMarca = async (req, res) => {
  try {
    // Validación básica
    if (!req.body.nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    
    const result = await Marca.update(req.params.id, req.body);
    if (result === 0) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.status(200).json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la marca' });
  }
};

exports.deleteMarca = async (req, res) => {
  try {
    const result = await Marca.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Marca no encontrada' });
    }
    res.status(200).json({ message: 'Marca eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la marca' });
  }
};