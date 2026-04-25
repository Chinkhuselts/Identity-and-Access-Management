const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// GET /users - Admin only - list all users
router.get('/', authMiddleware, checkRole('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.username, u.email, u.is_active, u.created_at,
              r.name as role
       FROM users u
       LEFT JOIN user_roles ur ON u.id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.id
       ORDER BY u.created_at DESC`
    );

    await pool.query(
      `INSERT INTO audit_logs (user_id, action, resource, ip_address)
       VALUES ($1, $2, $3, $4)`,
      [req.user.id, 'VIEW_ALL_USERS', 'users', req.ip]
    );

    res.json({ users: result.rows });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users/:id/roles - Admin only - assign a role
router.post('/:id/roles', authMiddleware, checkRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { role_name } = req.body;

  if (!role_name) {
    return res.status(400).json({ error: 'role_name is required' });
  }

  try {
    const roleResult = await pool.query(
      'SELECT id FROM roles WHERE name = $1',
      [role_name]
    );

    if (roleResult.rows.length === 0) {
      return res.status(404).json({ error: `Role '${role_name}' not found` });
    }

    const role_id = roleResult.rows[0].id;

    await pool.query(
      `INSERT INTO user_roles (user_id, role_id, assigned_by)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, role_id) DO NOTHING`,
      [id, role_id, req.user.id]
    );

    await pool.query(
      `INSERT INTO audit_logs (user_id, action, resource, ip_address)
       VALUES ($1, $2, $3, $4)`,
      [req.user.id, 'ASSIGN_ROLE', `user:${id}`, req.ip]
    );

    res.json({ message: `Role '${role_name}' assigned to user ${id}` });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id - Admin only - deactivate a user
router.delete('/:id', authMiddleware, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE users SET is_active = false
       WHERE id = $1 RETURNING id, username, email`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await pool.query(
      `INSERT INTO audit_logs (user_id, action, resource, ip_address)
       VALUES ($1, $2, $3, $4)`,
      [req.user.id, 'DEACTIVATE_USER', `user:${id}`, req.ip]
    );

    res.json({ 
      message: `User ${id} has been deactivated`,
      user: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;