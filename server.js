const express = require('express');
const db = require('./config/connection');
const userRoutes = require('./routes/user-routes');

const PORT = 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRoutes);// this line is telling the server to use the userRoutes file for any routes that start with /api/users

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
