markdown# API de Productos

## Requisitos
- Node.js (v14 o superior)
- MySQL (v8 o superior)

## Instalación

### 1. Base de datos
1. Importa el archivo `ws_producto_db_backup.sql` en MySQL:
mysql -u tu_usuario -p < ws_producto_db_backup.sql

### 2. Proyecto Node.js
1. Descomprime el archivo ZIP
2. Copia el archivo `.env.example` a `.env` y configura los datos de conexión
3. Instala las dependencias:
npm install
4. Inicia el servidor:
npm run dev

## Uso
La API estará disponible en: http://localhost:3000

### Endpoints principales
- Categorías: `/api/categorias`
- Subcategorías: `/api/subcategorias`
- Marcas: `/api/marcas`
- Productos: `/api/productos`