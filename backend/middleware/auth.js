/**
 * Middleware verificarToken - Autenticación JWT para Express.
 *
 * Este middleware protege rutas que requieren autenticación.
 * Verifica que la petición tenga un token JWT válido en el header
 * 'Authorization: Bearer <token>'.
 *
 * Uso en endpoints:
 *   app.get('/api/ruta-protegida', verificarToken, (req, res) => { ... });
 *
 * Flujo:
 *   1. Extrae el header 'authorization' de la petición.
 *   2. Si no existe, retorna error 403 (Acceso Denegado).
 *   3. Formato esperado: "Bearer <token>" → separa y extrae el token.
 *   4. Si el token no existe después de separar, retorna error 403.
 *   5. Intenta verificar el token con jwt.verify() y la clave secreta.
 *   6. Si es válido: decodifica el payload (id, rol) y lo agrega a req.user.
 *   7. Llama a next() para continuar al siguiente middleware o endpoint.
 *   8. Si falla la verificación (token inválido/expirado), retorna error 401.
 *
 * Códigos de error:
 *   403: No se proporcionó token o formato inválido
 *   401: Token inválido o expirado
 */

// Importa jsonwebtoken - librería para crear y verificar tokens JWT
const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación JWT.
 * @param {Object} req - Objeto de petición de Express (contiene headers, body, params)
 * @param {Object} res - Objeto de respuesta de Express (para enviar respuestas HTTP)
 * @param {Function} next - Función para continuar al siguiente middleware/endpoint
 */
function verificarToken(req, res, next) {
    // Extrae el header 'authorization' de la petición HTTP
    const authHeader = req.headers['authorization'];
    
    // Si no hay header Authorization, deniega el acceso (error 403)
    if (!authHeader) {
        return res.status(403).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    // El formato esperado es "Bearer <token>", así que separamos por espacio
    // authHeader.split(' ') → ["Bearer", "eyJhbGci..."]
    // [1] obtiene la segunda parte que es el token
    const token = authHeader.split(' ')[1];

    // Si después de separar no hay token, retorna error 403
    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado. Formato de token inválido.' });
    }

    try {
        // Verifica la integridad y caducidad del token usando la clave secreta
        // jwt.verify() decodifica el payload si el token es válido
        // Lanza error si el token es inválido o está expirado
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // Agrega la información decodificada del usuario (id, rol) al objeto req
        // Esto permite que los endpoints posteriores accedan a req.user.id, req.user.rol
        req.user = decodificado;
        
        // Continúa al siguiente middleware o al handler del endpoint
        next();
    } catch (error) {
        // Si jwt.verify() falla (token inválido, expirado o corrupto), retorna error 401
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
}

// Exporta la función verificarToken para usarla en server.js
module.exports = { verificarToken };
