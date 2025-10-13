const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/hms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
