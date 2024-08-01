import express from 'express';
import bodyParser from 'body-parser';
import connectDB from "./config/db";
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api', eventRoutes);
app.use('/api', bookingRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
