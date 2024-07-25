import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error.handler.js';
import routerWarehouses from './routes/warehouses.js';
import routerDrivers from './routes/drivers.js';
import routerShipments from './routes/shipments.js';
import routerVehicles from './routes/vehicles.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3010

app.use("/warehouses", routerWarehouses)
app.use("/drivers", routerDrivers)
app.use("/shipments", routerShipments)
app.use("/vehicles", routerVehicles)

app.use(errorHandler);

app.listen(PORT, () => 
    {console.log(`Servidor escuchando en http://localhost: ${PORT}`)});