const pool = require('../config/database');

class Marca {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM marcas WHERE activo = TRUE');
    return rows;
  }
  
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM marcas WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async create(marca) {
    const [result] = await pool.query(
      'INSERT INTO marcas (nombre, logo, descripcion) VALUES (?, ?, ?)',
      [marca.nombre, marca.logo, marca.descripcion]
    );
    return result.insertId;
  }
  
  static async update(id, marca) {
    const [result] = await pool.query(
      'UPDATE marcas SET nombre = ?, logo = ?, descripcion = ?, activo = ? WHERE id = ?',
      [
        marca.nombre, 
        marca.logo, 
        marca.descripcion, 
        marca.activo !== undefined ? marca.activo : true, 
        id
      ]
    );
    return result.affectedRows;
  }
  
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM marcas WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Marca;