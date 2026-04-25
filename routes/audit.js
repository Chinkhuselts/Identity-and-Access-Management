const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const authMiddleware = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// GET /audit - Admin only - view all audit logs
router.get('/', authMiddleware, checkRole('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT al.id, u.username, al.action, al.resource,
              al.ip_address, al.details, al.created_at
       FROM audit_logs al
       LEFT JOIN users u ON al.user_id = u.id
       ORDER BY al.created_at DESC`
    );

    res.json({ logs: result.rows });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;