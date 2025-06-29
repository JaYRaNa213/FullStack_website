// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// backendNew/src/routes/user/booking.routes.js

import express from 'express';
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getSingleBooking,
  updateBooking,
  updateBookingStatus,
  deleteBooking,
} from '../../controllers/booking.controller.js'; 


import { authMiddleware, verifyToken } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';

const router = express.Router();

// Puja Booking (alias)
router.post('/puja',verifyToken, authMiddleware, authorizeRoles('user'), createBooking);

// Default Create Booking
router.post('/', authMiddleware, authorizeRoles('user'), createBooking);

// Admin: Get all bookings
router.get('/', authMiddleware, authorizeRoles('admin'), getAllBookings);

// User: Get own bookings
router.get('/my', authMiddleware, authorizeRoles('user'), getUserBookings);

// Admin: Single booking by ID
router.get('/:id', authMiddleware, authorizeRoles('admin'), getSingleBooking);

// Admin: Update booking
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateBooking);

// Admin: Delete booking
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteBooking);

// **NEW** Admin: Update only booking status
router.patch('/:id/status', authMiddleware, authorizeRoles('admin'), updateBookingStatus);

export default router;
