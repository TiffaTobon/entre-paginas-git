// middleware/auth.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('Error verificando el token:', err);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export { verifyToken };

