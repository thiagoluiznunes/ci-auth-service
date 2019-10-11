import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Informe o nome.']
  },
  email: {
    type: String,
    required: [true, 'Informe o email.']
  },
  password: {
    type: String,
    required: [true, 'Informe a senha.']
  },
  userImage: {
    type: String
  },
  resetPasswordToken: {
    type: String
  }
});

export default mongoose.model('User', userSchema);
