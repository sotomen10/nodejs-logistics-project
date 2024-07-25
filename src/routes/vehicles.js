import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const vehiclesFilePath = path.join(_dirname, "../../data/vehicles.json");

async function readVehicles() {
    try {
        const vehiclesData = await fs.readFile(vehiclesFilePath);
        return JSON.parse(vehiclesData);
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`);
    }
}

async function writeVehicles(vehicles) {
    try {
        await fs.writeFile(vehiclesFilePath, JSON.stringify(vehicles, null, 2));
    } catch (error) {
        throw new Error(`Error en la promesa ${error.message}`);
    }
}

router.post("/", async (req, res) => {
    const vehicles = await readVehicles();
    const newVehicle = {
        id: vehicles.length + 1,
        model: req.body.model,
        year: req.body.year
    };
    vehicles.push(newVehicle);
    await writeVehicles(vehicles);
    res.status(201).json({ message: "Vehicle creado exitosamente", vehicle: newVehicle });
});

router.get("/", async (req, res) => {
    const vehicles = await readVehicles();
    res.json(vehicles);
});

router.get("/:id", async (req, res) => {
    const vehicles = await readVehicles();
    const vehicle = vehicles.find(vehicle => vehicle.id === parseInt(req.params.id));
    if (!vehicle) {
        return res.status(404).json({ message: "Vehicle no encontrado" });
    }
    res.json(vehicle);
});

router.put("/:id", async (req, res) => {
    const vehicles = await readVehicles();
    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === parseInt(req.params.id));
    if (vehicleIndex === -1) {
        return res.status(404).json({ message: 'Vehicle no existe' });
    }
    const updatedVehicle = {
        ...vehicles[vehicleIndex],
        model: req.body.model,
        year: req.body.year
    };
    vehicles[vehicleIndex] = updatedVehicle;
    await writeVehicles(vehicles);
    res.json({ message: "Vehicle actualizado exitosamente", vehicle: updatedVehicle });
});

router.delete("/:id", async (req, res) => {
    const vehicles = await readVehicles();
    const newVehicles = vehicles.filter((vehicle) => vehicle.id !== parseInt(req.params.id));
    if (vehicles.length === newVehicles.length) {
        return res.status(404).json({ message: "Vehicle no encontrado" });
    }
    await writeVehicles(newVehicles);
    res.json({ message: "Vehicle eliminado exitosamente" });
});

export default router;
