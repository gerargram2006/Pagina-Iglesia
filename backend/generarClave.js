const bcrypt = require('bcrypt');

// Vamos a encriptar la clave '123456'
bcrypt.hash('123456', 10, (err, hash) => {
    if (err) throw err;
    console.log('Tu contraseña encriptada es:');
    console.log(hash);
});