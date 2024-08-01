// Importa el módulo 'express' para crear y configurar una aplicación Express.
import express from 'express';

// Importa el archivo de configuración de rutas desde './routes/routes.js',
// que define las rutas y los enrutadores utilizados por la aplicación.
import routes from './routes/routes.js';

// Crea una instancia de una aplicación Express.
const server = express();

// Configura la aplicación para usar el middleware express.json().
// Esto permite que la aplicación pueda manejar solicitudes con cuerpos en formato JSON.
server.use(express.json());

// Usa el enrutador de rutas importado para manejar todas las solicitudes
// que lleguen a la raíz ('/') de la aplicación. 
// El enrutador de rutas se encarga de definir y gestionar las rutas específicas.
server.use("/", routes);

// Configura el servidor para escuchar en el puerto 3000.
// Cuando el servidor esté en funcionamiento, se ejecutará la función de callback
// que imprime un mensaje en la consola indicando que el servidor está conectado.
server.listen(3000, () => {
    console.log("Servidor conectado");
});
