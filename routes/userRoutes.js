import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'username']
    });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

router.get('/admin',
    authenticateToken,
    authorizeRoles('admin'),
    async(req,res)=>{
    const users = await User.findAll({attributes:['id','username','role']});
    res.json(users);
    }
);

export default router;