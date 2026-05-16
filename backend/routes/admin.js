import express from 'express';
import { createSafari, getAllSafaris, getSafariById, updateSafari, deleteSafari } from '../controller/safariController.js';
import { createResort, getAllResorts, getResortById, updateResort, deleteResort } from '../controller/resortController.js';
import { getAllBookings, updateBookingStatus } from '../controller/bookingController.js';
import { protectRoute, requireAdmin } from '../middleware/authMiddleware.js';

const adminRouter = express.Router();

// Safari Routes
adminRouter.post('/safari', protectRoute, createSafari);
adminRouter.get('/safari', getAllSafaris);
adminRouter.get('/safari/:id', getSafariById);
adminRouter.put('/safari/:id', protectRoute, updateSafari);
adminRouter.delete('/safari/:id', protectRoute, deleteSafari);

// Resort Routes
adminRouter.post('/resort', protectRoute, createResort);
adminRouter.get('/resort', getAllResorts);
adminRouter.get('/resort/:id', getResortById);
adminRouter.put('/resort/:id', protectRoute, updateResort);
adminRouter.delete('/resort/:id', protectRoute, deleteResort);

// Booking Routes
adminRouter.get('/bookings', protectRoute, requireAdmin, getAllBookings);
adminRouter.patch('/bookings/:id/status', protectRoute, requireAdmin, updateBookingStatus);

export default adminRouter;
