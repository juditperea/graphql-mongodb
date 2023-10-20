const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('Conexión a MongoDB establecida');
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [{
    type: mongoose.Types.ObjectId,
    ref: 'User',
  }],
});

const UserModel = mongoose.model('User', userSchema);
const GroupModel = mongoose.model('Group', groupSchema);

module.exports = {
  UserModel,
  GroupModel,
};
