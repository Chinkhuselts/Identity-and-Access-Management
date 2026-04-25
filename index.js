require('dotenv').config();
 
const express = require('express');
const app     = express();
 
app.use(express.json());
 
app.use('/auth',  require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/audit', require('./routes/audit'));
 
app.get('/', (req, res) => {
  res.json({ message: 'IAM System is running', status: 'ok' });
});
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`IAM System running on http://localhost:${PORT}`);
});