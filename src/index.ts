import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import connectToDatabase from './models/connection';
import userRouter from './routes/user';

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });

export default server;
