const pool = require('../config/database');

class Especificacion {
  static async getByProducto(productoId) {
    const [rows] = await pool.query(
      'SELECT * FROM especificaciones_producto WHERE producto_id = ?',
      [productoId]
    );
    return rows;
  }
  
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM especificaciones_producto WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async create(especificacion) {
    const [result] = await pool.query(
      'INSERT INTO especificaciones_producto (producto_id, nombre, valor) VALUES (?, ?, ?)',
      [
        especificacion.producto_id,
        especificacion.nombre,
        especificacion.valor
      ]
    );
    return result.insertId;
  }
  
  static async update(id, especificacion) {
    const [result] = await pool.query(
      'UPDATE especificaciones_producto SET nombre = ?, valor = ? WHERE id = ?',
      [especificacion.nombre, especificacion.valor, id]
    );
    return result.affectedRows;
  }
  
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM especificaciones_producto WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Especificacion;