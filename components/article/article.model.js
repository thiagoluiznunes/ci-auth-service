import mongoose from 'mongoose';
import moment from 'moment';

const articleSchema = new mongoose.Schema({
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
    required: false,
    default: ''
  },
  banner: {
    type: String,
    required: [true, 'Informe o banner do artigo.']
  },
  date: {
    type: String,
    required: false,
    default: moment().format('L')
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
