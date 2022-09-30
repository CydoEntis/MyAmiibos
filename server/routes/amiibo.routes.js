import express from 'express';

import {
	saveAmiibo,
	getAmiibos,
	getAmiibo,
	updateAmiibo,
} from '../controllers/amiibo.controller.js';

const router = express.Router();

router.route('/all').get(getAmiibos);
router.route('/:id').get(getAmiibo);
router.route('/save').post(saveAmiibo);
router.route('/update').post(updateAmiibo);

export default router;
