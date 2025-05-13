const pool = require('../config/database');

class Producto {
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE activo = TRUE LIMIT ? OFFSET ?',
      [limit, offset]
    );
    
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM productos WHERE activo = TRUE');
    const total = countResult[0].total;
    
    return {
      productos: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    return rows[0];
  }
  
  static async getByCategoria(categoriaId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE categoria_id = ? AND activo = TRUE LIMIT ? OFFSET ?',
      [categoriaId, limit, offset]
    );
    
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM productos WHERE categoria_id = ? AND activo = TRUE',
      [categoriaId]
    );
    const total = countResult[0].total;
    
    return {
      productos: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  
  static async getBySubcategoria(subcategoriaId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE subcategoria_id = ? AND activo = TRUE LIMIT ? OFFSET ?',
      [subcategoriaId, limit, offset]
    );
    
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM productos WHERE subcategoria_id = ? AND activo = TRUE',
      [subcategoriaId]
    );
    const total = countResult[0].total;
    
    return {
      productos: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  
  static async getByMarca(marcaId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE marca_id = ? AND activo = TRUE LIMIT ? OFFSET ?',
      [marcaId, limit, offset]
    );
    
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM productos WHERE marca_id = ? AND activo = TRUE',
      [marcaId]
    );
    const total = countResult[0].total;
    
    return {
      productos: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  
  static async getDestacados(limit = 10) {
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE destacado = TRUE AND activo = TRUE LIMIT ?',
      [limit]
    );
    return rows;
  }
  
  static async getNuevos(limit = 10) {
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE nuevo = TRUE AND activo = TRUE LIMIT ?',
      [limit]
    );
    return rows;
  }
  
  static async buscar(termino, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const searchTerm = `%${termino}%`;
    
    const [rows] = await pool.query(
      'SELECT * FROM productos WHERE (nombre LIKE ? OR descripcion LIKE ? OR codigo LIKE ?) AND activo = TRUE LIMIT ? OFFSET ?',
      [searchTerm, searchTerm, searchTerm, limit, offset]
    );
    
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM productos WHERE (nombre LIKE ? OR descripcion LIKE ? OR codigo LIKE ?) AND activo = TRUE',
      [searchTerm, searchTerm, searchTerm]
    );
    const total = countResult[0].total;
    
    return {
      productos: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  
  static async create(producto) {
    const [result] = await pool.query(
      `INSERT INTO productos (
        codigo, nombre, descripcion, precio, precio_oferta, 
        marca_id, categoria_id, subcategoria_id, destacado, nuevo, stock
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        producto.codigo,
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.precio_oferta,
        producto.marca_id,
        producto.categoria_id,
        producto.subcategoria_id,
        producto.destacado || false,
        producto.nuevo || false,
        producto.stock || 0
      ]
    );
    return result.insertId;
  }
  
  static async update(id, producto) {
    const [result] = await pool.query(
      `UPDATE productos SET 
        codigo = ?, nombre = ?, descripcion = ?, precio = ?, precio_oferta = ?,
        marca_id = ?, categoria_id = ?, subcategoria_id = ?, 
        destacado = ?, nuevo = ?, activo = ?, stock = ?
      WHERE id = ?`,
      [
        producto.codigo,
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.precio_oferta,
        producto.marca_id,
        producto.categoria_id,
        producto.subcategoria_id,
        producto.destacado !== undefined ? producto.destacado : false,
        producto.nuevo !== undefined ? producto.nuevo : false,
        producto.activo !== undefined ? producto.activo : true,
        producto.stock !== undefined ? producto.stock : 0,
        id
      ]
    );
    return result.affectedRows;
  }
  
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    return result.affectedRows;
  }
  
  // Nuevos métodos para gestión de stock
  static async updateStock(id, cantidad) {
    const [result] = await pool.query(
      `UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?`,
      [cantidad, id, cantidad]
    );
    return result.affectedRows;
  }

  static async restoreStock(id, cantidad) {
    const [result] = await pool.query(
      `UPDATE productos SET stock = stock + ? WHERE id = ?`,
      [cantidad, id]
    );
    return result.affectedRows;
  }
  
  static async checkStockAvailability(id, cantidad) {
    const [rows] = await pool.query(
      'SELECT stock FROM productos WHERE id = ?', 
      [id]
    );
    
    if (rows.length === 0) {
      return { disponible: false, stock: 0 };
    }
    
    return { 
      disponible: rows[0].stock >= cantidad, 
      stock: rows[0].stock 
    };
  }
}

module.exports = Producto;