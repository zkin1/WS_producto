const pool = require('../config/database');

class Categoria {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE activo = TRUE ORDER BY orden');
    return rows;
  }
  
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async create(categoria) {
    const [result] = await pool.query(
      'INSERT INTO categorias (nombre, descripcion, imagen, slug, orden) VALUES (?, ?, ?, ?, ?)',
      [categoria.nombre, categoria.descripcion, categoria.imagen, categoria.slug, categoria.orden || 0]
    );
    return result.insertId;
  }
  
  static async update(id, categoria) {
    const [result] = await pool.query(
      'UPDATE categorias SET nombre = ?, descripcion = ?, imagen = ?, slug = ?, orden = ?, activo = ? WHERE id = ?',
      [
        categoria.nombre, 
        categoria.descripcion, 
        categoria.imagen, 
        categoria.slug, 
        categoria.orden || 0, 
        categoria.activo !== undefined ? categoria.activo : true, 
        id
      ]
    );
    return result.affectedRows;
  }
  
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Categoria;