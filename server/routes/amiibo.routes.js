import express from 'express';

import {
	saveAmiibo,
	getAmiibos,
	getAmiibo,
	updateAmiibo,
	getCollected,
	getWishlisted,
} from '../controllers/amiibo.controller.js';

const router = express.Router();

router.route('/all').get(getAmiibos);
router.route('/collected').get(getCollected);
router.route('/wishlisted').get(getWishlisted);
// router.route('/:id').get(getAmiibo);
router.route('/save').post(saveAmiibo);
router.route('/update').post(updateAmiibo);

export default router;
