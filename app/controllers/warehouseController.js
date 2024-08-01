// Importa funciones desde el modelo de datos de almacenes.
import { findAll, save, updateWarehouse } from "../models/warehouseModel.js";

// Exporta la función que maneja la solicitud para obtener todos los almacenes.
export const getAll = async (_, res) => {
    // Llama a la función findAll que devuelve todos los almacenes desde la base de datos.
    const warehouses = await findAll();

    // Imprime el resultado de warehouses en la consola para fines de depuración.
    console.log(warehouses);

    // Envía una respuesta JSON con un mensaje y los datos de los almacenes.
    res.json({ message: "Ok", data: warehouses });
};

// Exporta la función que maneja la solicitud para insertar un nuevo almacén.
export const insert = async (req, res) => {
    // Desestructura el nombre y la ubicación del cuerpo de la solicitud.
    const { name, location } = req.body;

    // Imprime el nombre y la ubicación en la consola para fines de depuración.
    console.log(name, location);

    // Llama a la función save para guardar un nuevo almacén con el nombre y la ubicación proporcionados.
    const warehouseCreated = await save({ name, location });

    // Envía una respuesta con el estado 201 (Creado) y un mensaje de éxito junto con los datos del almacén creado.
    res.status(201).send({
        message: "Successfully created",
        data: warehouseCreated
    });
};

// Exporta la función que maneja la solicitud para actualizar un almacén existente.
export const update = async (req, res) => {
    // Obtiene el ID del almacén desde los parámetros de la solicitud.
    const warehouseId = req.params.id;

    // Imprime los parámetros de la solicitud en la consola para fines de depuración.
    console.log(req.params);

    // Desestructura el nombre y la ubicación del cuerpo de la solicitud.
    const { name, location } = req.body;

    // Llama a la función updateWarehouse para actualizar el almacén con el ID proporcionado y los nuevos datos.
    const updatedWarehouse = await updateWarehouse(warehouseId, { name, location });

    // Envía una respuesta con el estado 204 (Sin Contenido) y un mensaje de éxito junto con la respuesta de la actualización.
    res.status(204).json({ message: "Updated successfully", response: updatedWarehouse });
};
