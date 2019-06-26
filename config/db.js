import mongoose from 'mongoose';
import { NODE_ENV, DB_NAME, DB_USER, DB_USER_PASS } from 'babel-dotenv';

const initConnection = async () => {
  if (NODE_ENV === 'dev') {
    mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
      useNewUrlParser: true,
      auth: {
        user: DB_USER,
        password: DB_USER_PASS
      },
    });
  } else {
    const uri = 'mongodb://@ds239128.mlab.com:39128/ci-auth-db';
    mongoose.connect(uri, {
      useNewUrlParser: true,
      auth: {
        user: DB_USER,
        password: DB_USER_PASS
      },
      server: {
        socketOptions: { keepAlive: 1 }
      }
    });
  }

  const connection = mongoose.connection;
  connection.on('connected', () => {
    console.log('Connected to db');
  });

  connection.on('disconnected', () => {
    console.log('Disconnected to db');
  });

  connection.on('error', (error) => {
    console.log('Db connection error ', error);
    process.exit(1);
  });
}

export default { initConnection };

// db.createUser(
//   {
//     user: "",
//     pwd: "",
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//   }
// )
