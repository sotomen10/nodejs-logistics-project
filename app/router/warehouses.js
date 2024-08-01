// Importa el objeto Router desde el módulo 'express' para definir las rutas de la aplicación.
import { Router } from "express";

// Importa las funciones de controlador para manejar las solicitudes relacionadas con almacenes.
import { getAll, insert, update } from "../controllers/warehouseController.js";

// Crea una instancia de Router para definir rutas específicas para almacenes.
const warehouseRouter = Router();

// Define una ruta para manejar las solicitudes GET en la ruta raíz ('/').
// Esta ruta llamará a la función getAll del controlador para obtener todos los almacenes.
warehouseRouter.get("/", getAll);

// Define una ruta para manejar las solicitudes POST en la ruta raíz ('/').
// Esta ruta llamará a la función insert del controlador para crear un nuevo almacén.
warehouseRouter.post("/", insert);

// Define una ruta para manejar las solicitudes PUT en la ruta con un parámetro de ID (':id').
// Esta ruta llamará a la función update del controlador para actualizar un almacén específico basado en el ID.
warehouseRouter.put("/:id", update);

// Exporta el router configurado para que pueda ser utilizado en otras partes de la aplicación.
export default warehouseRouter;
