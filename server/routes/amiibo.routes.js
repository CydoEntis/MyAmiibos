import express from 'express';

import {
	collectAmiibo,
	getAmiibos,
	getAmiibo,
	wishlistAmiibo,
} from '../controllers/amiibo.controller.js';

const router = express.Router();

router.route('/all').get(getAmiibos);
router.route('/:id').get(getAmiibo);
router.route('/collect').post(collectAmiibo);
router.route('/wishlist').post(wishlistAmiibo);

export default router;
