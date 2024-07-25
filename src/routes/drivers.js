import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const driversFilePath = path.join(_dirname, "../../data/drivers.json");

async function readDrivers() {
    try {
        const driversData = await fs.readFile(driversFilePath);
        return JSON.parse(driversData);
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`);
    }
}

async function writeDrivers(drivers) {
    try {
        await fs.writeFile(driversFilePath, JSON.stringify(drivers, null, 2));
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`);
    }
}

router.post("/", async (req, res) => {
    const drivers = await readDrivers();
    const newDriver = {
        id: drivers.length + 1,
        name: req.body.name
    };
    drivers.push(newDriver);
    await writeDrivers(drivers);
    res.status(201).json({ message: "Driver creado exitosamente", driver: newDriver });
});

router.get("/", async (req, res) => {
    const drivers = await readDrivers();
    res.json(drivers);
});

router.get("/:id", async (req, res) => {
    const drivers = await readDrivers();
    const driver = drivers.find(driver => driver.id === parseInt(req.params.id));
    if (!driver) {
        return res.status(404).json({ message: "Driver no encontrado" });
    }
    res.json(driver);
});

router.put("/:id", async (req, res) => {
    const drivers = await readDrivers();
    const driverIndex = drivers.findIndex((driver) => driver.id === parseInt(req.params.id));
    if (driverIndex === -1) {
        return res.status(404).json({ message: 'Driver no existe' });
    }
    const updatedDriver = {
        ...drivers[driverIndex],
        name: req.body.name
    };
    drivers[driverIndex] = updatedDriver;
    await writeDrivers(drivers);
    res.json({ message: "Driver actualizado exitosamente", driver: updatedDriver });
});

router.delete("/:id", async (req, res) => {
    const drivers = await readDrivers();
    const newDrivers = drivers.filter((driver) => driver.id !== parseInt(req.params.id));
    if (drivers.length === newDrivers.length) {
        return res.status(404).json({ message: "Driver no encontrado" });
    }
    await writeDrivers(newDrivers);
    res.json({ message: "Driver eliminado exitosamente" });
});

export default router;

