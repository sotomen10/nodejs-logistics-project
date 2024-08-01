// Importa el pool de conexiones desde el archivo de configuración de la base de datos.
import { pool } from "../../config/db.js";

// Función para guardar un nuevo almacén en la base de datos.
export const save = async (warehouse) => {
    try {
        // Ejecuta una consulta para insertar un nuevo almacén en la tabla 'warehouses'.
        // ? es un marcador de posición que será reemplazado por los valores proporcionados en el array.
        const [resolve] = await pool.query(
            "INSERT INTO warehouses (name, location) VALUES (?, ?)", 
            [warehouse.name, warehouse.location]
        );

        // Ejecuta una consulta para obtener el almacén recién creado usando el ID generado por la inserción.
        const [[warehouseCreated]] = await pool.query(
            "SELECT * FROM warehouses WHERE id = ?", 
            [resolve.insertId]
        );

        // Devuelve el almacén creado.
        return warehouseCreated;
    } catch (err) {
        // Lanza un error si ocurre algún problema durante la inserción.
        throw new Error("Ocurrió un error", err);
    }
};

// Función para obtener todos los almacenes de la base de datos.
export async function findAll() {
    try {
        // Ejecuta una consulta para seleccionar todos los almacenes de la tabla 'warehouses'.
        const [warehouses] = await pool.query("SELECT * FROM warehouses");
        // Devuelve el resultado de la consulta.
        return warehouses;
    } catch (err) {
        // Imprime el error en la consola si ocurre un problema durante la consulta.
        console.log(err);
    }
}

// Función para encontrar un almacén por su ID.
export const findById = async (id) => {
    try {
        // Ejecuta una consulta para seleccionar el almacén con el ID especificado.
        const [[warehouseFound]] = await pool.query(
            "SELECT * FROM warehouses WHERE id = ?", 
            [id]
        );
        // Devuelve el almacén encontrado.
        return warehouseFound;
    } catch (error) {
        // Lanza un error si el almacén no se encuentra.
        throw new Error("Warehouse not found", error);
    }
};

// Función para actualizar un almacén existente en la base de datos.
export const update = async (id, newWarehouse) => {
    console.log(id); // Imprime el ID del almacén que se va a actualizar para fines de depuración.
    try {
        // Ejecuta una consulta para actualizar el almacén con el ID especificado.
        const [resolve] = await pool.query(
            "UPDATE warehouses SET name = ?, location = ? WHERE id = ?", 
            [newWarehouse.name, newWarehouse.location, id]
        );
        // Devuelve el resultado de la operación de actualización.
        return resolve;
    } catch (error) {
        // Lanza un error si ocurre un problema durante la actualización.
        throw new Error("Warehouse has not been updated", error);
    }
};

// Función para actualizar un almacén después de verificar su existencia.
export const updateWarehouse = async (id, newWarehouse) => {
    try {
        // Primero verifica que el almacén existe llamando a findById.
        await findById(id);
        // Luego llama a la función update para realizar la actualización.
        await update(id, newWarehouse);
        // Devuelve un mensaje indicando que el almacén ha sido actualizado.
        return "Warehouse updated";
    } catch (err) {
        // Lanza un error si el almacén no se puede actualizar.
        throw new Error("Warehouse has not been updated", err);
    }
};
