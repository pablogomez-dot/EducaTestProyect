const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([]);
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Role updated' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'User deleted' });
});

module.exports = router;
