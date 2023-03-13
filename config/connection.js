const { connect, connection } = require('mongoose');

connect('mongodb://localhost/linkloop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
