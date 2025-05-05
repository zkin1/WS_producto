const pool = require('../config/database');

class Subcategoria {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM subcategorias WHERE activo = TRUE ORDER BY orden');
    return rows;
  }
  
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM subcategorias WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async getByCategoria(categoriaId) {
    const [rows] = await pool.query(
      'SELECT * FROM subcategorias WHERE categoria_id = ? AND activo = TRUE ORDER BY orden',
      [categoriaId]
    );
    return rows;
  }
  
  static async create(subcategoria) {
    const [result] = await pool.query(
      'INSERT INTO subcategorias (categoria_id, nombre, descripcion, imagen, slug, orden) VALUES (?, ?, ?, ?, ?, ?)',
      [
        subcategoria.categoria_id,
        subcategoria.nombre,
        subcategoria.descripcion,
        subcategoria.imagen,
        subcategoria.slug,
        subcategoria.orden || 0
      ]
    );
    return result.insertId;
  }
  
  static async update(id, subcategoria) {
    const [result] = await pool.query(
      'UPDATE subcategorias SET categoria_id = ?, nombre = ?, descripcion = ?, imagen = ?, slug = ?, orden = ?, activo = ? WHERE id = ?',
      [
        subcategoria.categoria_id,
        subcategoria.nombre,
        subcategoria.descripcion,
        subcategoria.imagen,
        subcategoria.slug,
        subcategoria.orden || 0,
        subcategoria.activo !== undefined ? subcategoria.activo : true,
        id
      ]
    );
    return result.affectedRows;
  }
  
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM subcategorias WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Subcategoria;