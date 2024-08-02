# nodejs-logistics-project
CREATE TABLE drivers (
id INT PRIMARY KEY AUTO_INCREMENT, 
name VARCHAR(100) NOT NULL,
shipments_id INT,
FOREIGN KEY(shipments_id) REFERENCES shipments(id)
);
CREATE TABLE vehicles (
id INT PRIMARY KEY AUTO_INCREMENT, 
model VARCHAR(100) NOT NULL,
year YEAR, 
driver_id INT,
FOREIGN KEY(driver_id) REFERENCES drivers(id)
);
CREATE TABLE warehouses (
id INT PRIMARY KEY AUTO_INCREMENT, 
name VARCHAR(100) NOT NULL,
location VARCHAR(100) NOT NULL,
vehicle_id INT,
driver_id INT,
FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
FOREIGN KEY(driver_id) REFERENCES drivers(id)
);
CREATE TABLE shipments (
id INT PRIMARY KEY AUTO_INCREMENT, 
item VARCHAR(100) NOT NULL,
quantity INT NOT NULL,
warehouse_id INT,
vehicle_id INT,
FOREIGN KEY(warehouse_id) REFERENCES warehouses(id),
FOREIGN KEY(vehicle_id) REFERENCES vehicles(id)
)

