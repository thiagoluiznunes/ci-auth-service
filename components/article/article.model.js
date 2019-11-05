import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Informe o id do usuário.']
  },
  author: {
    type: String,
    required: [true, 'Informe o autor do artigo.']
  },
  title: {
    type: String,
    required: [true, 'Informe o título do artigo.']
  },
  brief_description: {
    type: String,
    required: [true, 'Informe uma breve descripção do artigo.']
  },
  banner: {
    type: String,
    required: [true, 'Informe o banner do artigo.']
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date()
  },
  time_reading: {
    type: Number,
    required: [true, 'Informe tempo de leitura do artigo.']
  },
  article_body: {
    type: Array,
    required: false,
    default: []
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  },
  views: {
    type: Number,
    required: false,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    required: false,
    default: false
  }
});

export default mongoose.model('Article', articleSchema);
