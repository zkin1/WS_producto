const pool = require('../config/database');

class Imagen {
  static async getByProducto(productoId) {
    const [rows] = await pool.query(
      'SELECT * FROM imagenes_producto WHERE producto_id = ? ORDER BY orden, es_principal DESC',
      [productoId]
    );
    return rows;
  }
  
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM imagenes_producto WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async create(imagen) {
    // Si es_principal=true, actualizar otras imágenes a es_principal=false
    if (imagen.es_principal) {
      await pool.query(
        'UPDATE imagenes_producto SET es_principal = FALSE WHERE producto_id = ?',
        [imagen.producto_id]
      );
    }
    
    const [result] = await pool.query(
      'INSERT INTO imagenes_producto (producto_id, url, orden, es_principal) VALUES (?, ?, ?, ?)',
      [
        imagen.producto_id,
        imagen.url,
        imagen.orden || 0,
        imagen.es_principal || false
      ]
    );
    return result.insertId;
  }
  
  static async update(id, imagen) {
    // Si es_principal=true, actualizar otras imágenes a es_principal=false
    if (imagen.es_principal) {
      await pool.query(
        'UPDATE imagenes_producto SET es_principal = FALSE WHERE producto_id = ? AND id != ?',
        [imagen.producto_id, id]
      );
    }
    
    const [result] = await pool.query(
      'UPDATE imagenes_producto SET url = ?, orden = ?, es_principal = ? WHERE id = ?',
      [imagen.url, imagen.orden || 0, imagen.es_principal || false, id]
    );
    return result.affectedRows;
  }
  
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM imagenes_producto WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Imagen;