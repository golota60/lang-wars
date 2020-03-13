import express from 'express';
import logger from './middleware/logger';
import cors from 'cors';
import mongoose from 'mongoose';
import { loginRouter } from './routes/login';
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URI = process.env.LOCAL_URI!;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use('/api/login', loginRouter);

mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const mongooseConnection = mongoose.connection;

mongooseConnection.once('open', () => {
    console.log('Connection with MongoDB established successfully');
})

app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}...`);
})

app.get('/', (req: any, res: any) => {
    res.send('<h1>Server Works!</h1>');
});
