import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const warehousesFilePath = path.join(_dirname, "../../data/warehouses.json");

async function readWarehouses() {
    try {
        const warehousesData = await fs.readFile(warehousesFilePath);
        return JSON.parse(warehousesData);
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`);
    }
};

async function writeWarehouses(warehouses) {
    try {
        await fs.writeFile(warehousesFilePath, JSON.stringify(warehouses, null, 2));
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`);
    }
};

router.post("/", async (req, res) => {
    const warehouses = await readWarehouses();
    const newWarehouse = {
        id: warehouses.length + 1,
        name: req.body.name,
        location: req.body.location
    };
    warehouses.push(newWarehouse);
    await writeWarehouses(warehouses);
    res.status(201).json({ message: "Warehouse creado exitosamente", Warehouse: newWarehouse });
});

router.get("/", async (req, res) => {
    const warehouses = await readWarehouses();
    res.json(warehouses);
});

router.get("/:id", async (req, res) => {
    const warehouses = await readWarehouses();
    const warehouse = warehouses.find(warehouse => warehouse.id === parseInt(req.params.id));
    if (!warehouse) {
        return res.status(404).json({ message: "Warehouse no encontrado" });
    }
    res.json(warehouse);
});

router.put("/:id", async (req, res) => {
    const warehouses = await readWarehouses();
    const warehouseIndex = warehouses.findIndex((warehouse) => warehouse.id === parseInt(req.params.id));
    if (warehouseIndex === -1) {
        return res.status(404).json({ message: 'Warehouse no existe' });
    }
    const updatedWarehouse = {
        ...warehouses[warehouseIndex],
        name: req.body.name,
        location: req.body.location,
    };
    warehouses[warehouseIndex] = updatedWarehouse;
    await writeWarehouses(warehouses);
    res.json({ message: "Warehouse actualizado exitosamente", warehouse: updatedWarehouse });
});

router.delete("/:id", async (req, res) => {
    const warehouses = await readWarehouses();
    const newWarehouses = warehouses.filter((warehouse) => warehouse.id !== parseInt(req.params.id));
    if (warehouses.length === newWarehouses.length) {
        return res.status(404).json({ message: "Warehouse no encontrado" });
    }
    await writeWarehouses(newWarehouses);
    res.json({ message: "Warehouse eliminado exitosamente" });
});

export default router;
