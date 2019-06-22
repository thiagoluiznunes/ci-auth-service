import mongoose from 'mongoose';

// class User extends mongoose.Schema {
//   constructor() {
//     super({
//       name: { type: String, required: [true, 'Informe o nome.'] },
//       email: { type: String, required: [true, 'Informe o email.'] },
//       password: { type: String, required: [true, 'Informe a senha.'] },
//       articles: [Number],
//       resetPasswordToken: { type: String }
//     });
//   }
// }

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
  articles: [Number],
  resetPasswordToken: {
    type: String
  }
});

export default mongoose.model('User', userSchema);
