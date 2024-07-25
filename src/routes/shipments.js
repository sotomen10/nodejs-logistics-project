// Importar las dependencias necesarias
import { Router } from 'express'; // Importar Router desde Express para definir las rutas
import { promises as fs } from 'fs'; // Importar el módulo 'fs' con promesas para operaciones asíncronas con archivos
import path from 'path'; // Importar el módulo 'path' para manipular rutas y directorios
import { fileURLToPath } from 'url'; // Importar 'fileURLToPath' para convertir URLs de módulos en rutas de archivo

// Crear una instancia de Router
const router = Router();

// Obtener la ruta del archivo actual y su directorio
const _filename = fileURLToPath(import.meta.url); // Convertir la URL del módulo a una ruta de archivo
const _dirname = path.dirname(_filename); // Obtener el directorio donde se encuentra el archivo actual

// Definir la ruta del archivo JSON que almacenará los datos de envíos
const shipmentsFilePath = path.join(_dirname, "../../data/shipments.json"); // Ruta al archivo JSON que contiene los envíos

// Función asíncrona para leer los datos de envíos desde el archivo JSON
async function readShipments() {
    try {
        const shipmentsData = await fs.readFile(shipmentsFilePath); // Leer el archivo JSON
        return JSON.parse(shipmentsData); // Parsear el contenido JSON y devolverlo como objeto
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`); // Manejar errores que ocurren durante la lectura o el parseo
    }
}

// Función asíncrona para escribir los datos de envíos en el archivo JSON
async function writeShipments(shipments) {
    try {
        await fs.writeFile(shipmentsFilePath, JSON.stringify(shipments, null, 2)); // Convertir el objeto de envíos a JSON y escribirlo en el archivo
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`); // Manejar errores que ocurren durante la escritura
    }
}

// Ruta POST para crear un nuevo envío
router.post("/", async (req, res) => {
    const shipments = await readShipments(); // Leer los envíos actuales desde el archivo
    const newShipment = {
        id: shipments.length + 1, // Asignar un nuevo ID incrementando el número de envíos existentes
        item: req.body.item, // Obtener el ítem del cuerpo de la solicitud
        quantity: req.body.quantity, // Obtener la cantidad del cuerpo de la solicitud
        warehouseId: req.body.warehouseId // Obtener el ID del almacén del cuerpo de la solicitud
    };
    shipments.push(newShipment); // Agregar el nuevo envío a la lista de envíos
    await writeShipments(shipments); // Guardar la lista actualizada en el archivo JSON
    res.status(201).json({ message: "Shipment creado exitosamente", shipment: newShipment }); // Responder con el mensaje de éxito y el nuevo envío
});

// Ruta GET para obtener todos los envíos
router.get("/", async (req, res) => {
    const shipments = await readShipments(); // Leer todos los envíos desde el archivo
    res.json(shipments); // Enviar todos los envíos en la respuesta JSON
});

// Ruta GET para obtener un envío específico por ID
router.get("/:id", async (req, res) => {
    const shipments = await readShipments(); // Leer todos los envíos desde el archivo
    const shipment = shipments.find(shipment => shipment.id === parseInt(req.params.id)); // Buscar el envío por su ID
    if (!shipment) {
        return res.status(404).json({ message: "Shipment no encontrado" }); // Responder con un mensaje de error si el envío no se encuentra
    }
    res.json(shipment); // Enviar el envío encontrado en la respuesta JSON
});

// Ruta PUT para actualizar un envío existente por ID
router.put("/:id", async (req, res) => {
    const shipments = await readShipments(); // Leer todos los envíos desde el archivo
    const shipmentIndex = shipments.findIndex((shipment) => shipment.id === parseInt(req.params.id)); // Encontrar el índice del envío a actualizar
    if (shipmentIndex === -1) {
        return res.status(404).json({ message: 'Shipment no existe' }); // Responder con un mensaje de error si el envío no existe
    }
    const updatedShipment = {
        ...shipments[shipmentIndex], // Mantener los datos existentes del envío
        item: req.body.item, // Actualizar el ítem del envío
        quantity: req.body.quantity, // Actualizar la cantidad del envío
        warehouseId: req.body.warehouseId // Actualizar el ID del almacén del envío
    };
    shipments[shipmentIndex] = updatedShipment; // Reemplazar el envío existente con el actualizado
    await writeShipments(shipments); // Guardar la lista actualizada en el archivo JSON
    res.json({ message: "Shipment actualizado exitosamente", shipment: updatedShipment }); // Responder con el mensaje de éxito y el envío actualizado
});

// Ruta DELETE para eliminar un envío por ID
router.delete("/:id", async (req, res) => {
    const shipments = await readShipments(); // Leer todos los envíos desde el archivo
    const newShipments = shipments.filter((shipment) => shipment.id !== parseInt(req.params.id)); // Filtrar el envío a eliminar
    if (shipments.length === newShipments.length) {
        return res.status(404).json({ message: "Shipment no encontrado" }); // Responder con un mensaje de error si el envío no se encuentra
    }
    await writeShipments(newShipments); // Guardar la lista actualizada en el archivo JSON
    res.json({ message: "Shipment eliminado exitosamente" }); // Responder con un mensaje de éxito
});

// Exportar el enrutador para que pueda ser utilizado en otros módulos de la aplicación
export default router;
