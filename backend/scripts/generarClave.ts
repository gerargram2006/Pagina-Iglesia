// Importa bcrypt para encriptar la contraseña
import bcrypt from 'bcrypt';

// Número de rondas de sal que usa bcrypt para el hash
const SALT_ROUNDS = 10;
// Contraseña que se va a encriptar
const PASSWORD_TO_HASH = '123456';

// Encripta la contraseña usando bcrypt con las rondas de sal definidas
bcrypt.hash(PASSWORD_TO_HASH, SALT_ROUNDS, (err, hash) => {
  // Si ocurre un error, lo lanza
  if (err) throw err;
  // Muestra el mensaje que anuncia la contraseña encriptada
  console.log('Tu contraseña encriptada es:');
  // Muestra el hash generado
  console.log(hash);
});
