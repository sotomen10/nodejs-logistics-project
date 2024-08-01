// Importa el módulo 'express' para crear una instancia de la aplicación Express.
import express from 'express';

// Importa el enrutador de almacenes desde el archivo que define las rutas para las operaciones de almacenes.
import warehouseRouter from '../router/warehouses.js';

// Crea una instancia de una aplicación Express.
const routes = express();

// Usa el enrutador de almacenes para manejar todas las solicitudes que comienzan con '/warehouses'.
// Esto significa que cualquier solicitud a '/warehouses' o '/warehouses/...'
// será gestionada por el `warehouseRouter`.
routes.use("/warehouses", warehouseRouter);

// Exporta la instancia de la aplicación Express configurada para que pueda ser utilizada en otras partes de la aplicación.
export default routes;
