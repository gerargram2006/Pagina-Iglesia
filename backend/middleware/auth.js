const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar que el usuario está autenticado mediante JWT.
 * Busca el token en el header 'Authorization: Bearer <token>'
 */
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    // Si no hay header Authorization, deniega el acceso
    if (!authHeader) {
        return res.status(403).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    // El formato esperado es "Bearer <token>", así que separamos el string
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado. Formato de token inválido.' });
    }

    try {
        // Verifica el token con la clave secreta
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agrega la info del usuario decodificado (id, rol) a la request para usarlo en el endpoint
        req.user = decodificado;
        
        // Continúa al siguiente middleware o endpoint
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
}

module.exports = { verificarToken };
