import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import router from './routes/auth.js';
import adminRouter from './routes/admin.js';
import uploadRouter from './routes/upload.js';
import cors from 'cors'
import path from 'path';
import paymentRouter from './routes/paymentRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

dotenv.config({quiet: true});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/', router);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);
app.use('/payment', paymentRouter);
app.use('/bookings', bookingRouter);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

connectDB(process.env.MONGODB_URL)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
