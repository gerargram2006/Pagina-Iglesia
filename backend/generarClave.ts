import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const PASSWORD_TO_HASH = '123456';

bcrypt.hash(PASSWORD_TO_HASH, SALT_ROUNDS, (err, hash) => {
  if (err) throw err;
  console.log('Tu contraseña encriptada es:');
  console.log(hash);
});
