const router = require('express').Router();

// const authRoutes = require('./auth');
import userRoutes from './user';
// const addressRoutes = require('./address');
// const newsletterRoutes = require('./newsletter');
import productRoutes from './product';
// import categoryRoutes from './category';
// import brandRoutes from './brand';
// const contactRoutes = require('./contact');
// const merchantRoutes = require('./merchant');
import cartRoutes from './cart';
// const orderRoutes = require('./order');
// const reviewRoutes = require('./review');
// const wishlistRoutes = require('./wishlist');

// auth routes
// router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
// router.use('/address', addressRoutes);

// newsletter routes
// router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
// router.use('/category', categoryRoutes);

// brand routes
// router.use('/brand', brandRoutes);

// contact routes
// router.use('/contact', contactRoutes);

// // merchant routes
// router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// // order routes
// router.use('/order', orderRoutes);

// // Review routes
// router.use('/review', reviewRoutes);

// // Wishlist routes
// router.use('/wishlist', wishlistRoutes);

export default router;
