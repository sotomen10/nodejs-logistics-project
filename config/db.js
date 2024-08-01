// Importa el módulo mysql2/promise para trabajar con MySQL usando promesas.
import mysql2 from 'mysql2/promise';

// Declara una variable para almacenar la instancia del pool de conexiones.
let pool;

try {
    // Crea una instancia del pool de conexiones con la configuración proporcionada.
    // Un pool de conexiones es una forma eficiente de manejar múltiples conexiones a la base de datos.
    pool = mysql2.createPool({
        host: 'b0m91voppvz74ioul0wn-mysql.services.clever-cloud.com', // La dirección del servidor de la base de datos.
        user: 'u7a8s3u6ybr12geb', // El nombre de usuario para autenticar la conexión a la base de datos.
        database: 'b0m91voppvz74ioul0wn', // El nombre de la base de datos a la que se conecta.
        port: 3306, // El puerto en el que el servidor de la base de datos está escuchando (puerto MySQL por defecto).
        password: 'WzWTXQpFwsU3PpWkIQUc', // La contraseña para autenticar la conexión a la base de datos.
    });

    // Si la conexión es exitosa, imprime un mensaje en la consola.
    console.log('Data base connected');
} catch (err) {
    // Si ocurre un error durante la creación del pool, imprime el error en la consola.
    console.log(err);
}

// Exporta el pool para que pueda ser utilizado en otras partes de la aplicación.
export { pool };
