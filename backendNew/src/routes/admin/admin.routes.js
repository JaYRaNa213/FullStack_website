// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

// src/routes/admin/admin.routes.js

import express from 'express';
import {
  
  verifyToken,
  isAdmin,
  authMiddleware,
  authorizeRoles,
} from '../../middleware/auth.middleware.js';

import {
  getPujaBookings,
  updatePujaBookingStatus,
  deletePujaBooking,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
} from '../../controllers/admin.controller.js';

import {
  addBlog,
  updateBlog,
  deleteBlog,
} from '../../controllers/blog.controller.js';

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/product.controller.js';

import upload from '../../middleware/multer.middleware.js'; // for blog/product image uploads

import { getUserAdminDashboardSummary } from '../../controllers/admin.controller.js';

const router = express.Router();

// ✅ Apply admin auth globally to all routes below
router.use(authMiddleware, authorizeRoles('admin'));

// ✅ Dashboard Summary
router.get('/dashboard-summary', getUserAdminDashboardSummary);



// ✅ Blog Management
router.post('/blogs', upload.single('image'), addBlog);
router.put('/blogs/:id', upload.single('image'), updateBlog);
router.delete('/blogs/:id', deleteBlog);

// ✅ Product Management
router.post('/products', upload.single('image'), addProduct);
router.patch('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

// ✅ User Management (Admin Only)
router.get('/users', getAllUsers
  
);
router.put('/users/:id', updateUserByAdmin);
router.delete('/users/:id', deleteUserByAdmin);

router.get("/puja/bookings",verifyToken,getPujaBookings);
router.delete("/puja/bookings/:id", verifyToken,deletePujaBooking);
router.put("/puja/bookings/:id/status", verifyToken, updatePujaBookingStatus);



export default router;
