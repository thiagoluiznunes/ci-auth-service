import mongoose from 'mongoose';

const initConnection = (dbName) => {
  mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true });
}

export default { initConnection };
