/**
 * Script generarClave.js - Generador de hashes bcrypt para contraseñas.
 *
 * Este script genera un hash bcrypt a partir de una contraseña en texto plano.
 * Se usa para crear contraseñas seguras que se almacenan en la base de datos.
 *
 * Uso:
 *   cd backend && node generarClave.js
 *
 * El script imprime en consola el hash generado. Este hash debe copiarse
 * y pegarse directamente en la tabla 'usuarios' de MySQL.
 *
 * Parámetros de bcrypt.hash():
 *   - Primer argumento: la contraseña en texto plano a hashear (en este caso '123456')
 *   - Segundo argumento: salt rounds (10 = 2^10 = 1024 iteraciones, buen balance seguridad/velocidad)
 *   - Tercer argumento: callback que recibe (err, hash) - err si falla, hash si tiene éxito
 *
 * NOTA: Este script es solo para desarrollo. En producción, las contraseñas
 *       NUNCA deben ser '123456'.
 */

// Importa bcrypt - librería para hashing seguro de contraseñas (algoritmo Blowfish)
const bcrypt = require('bcrypt');

// Número de salt rounds para bcrypt (10 es el valor recomendado por defecto)
const SALT_ROUNDS = 10;

// Contraseña en texto plano que se va a hashear (solo para desarrollo)
const PASSWORD_TO_HASH = '123456';

// Genera el hash bcrypt de la contraseña
// bcrypt.hash() es una función asíncrona que usa callbacks
bcrypt.hash(PASSWORD_TO_HASH, SALT_ROUNDS, (err, hash) => {
    // Si ocurre un error durante el hasheo, lanza la excepción
    if (err) throw err;
    // Imprime el hash resultante en la consola para que el usuario lo copie
    console.log('Tu contraseña encriptada es:');
    console.log(hash);
    // Ejemplo de salida: $2b$10$3qESVBrZtLVwFzDQHEcBxOsoO5KNSOH/jPxJHxWIJncPp28Ns5rpS
});
