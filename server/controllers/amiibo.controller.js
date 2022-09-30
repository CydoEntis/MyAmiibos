import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import Amiibo from '../models/amiibo.model.js';

const getAmiibos = async (req, res) => {
	try {
		const amiibos = await Amiibo.find({});

		res.status(StatusCodes.OK).json({
			amiibos,
		});
	} catch (error) {
		console.log(error);
		throw new BadRequestError('Amiibos could not be fetched');
	}
};

const getAmiibo = async (req, res) => {
	const { id: amiiboId } = req.params;

	try {
		const amiibo = await Amiibo.find({ amiiboId });

		res.status(StatusCodes.OK).json({
			amiibo,
		});
	} catch (error) {
		console.log(error);
		throw new BadRequestError('Amiibo could not be found');
	}
};

const collectAmiibo = async (req, res) => {
	const {
		amiiboSeries,
		character,
		gameSeries,
		image,
		name,
		release,
		type,
		amiiboId,
	} = req.body;
	try {
		const amiibo = await Amiibo.create({
			amiiboSeries,
			character,
			gameSeries,
			image,
			name,
			release,
			type,
			amiiboId,
			collected: true,
			wishlistAmiibo: false,
		});

		res.status(StatusCodes.CREATED).json({
			amiibo,
		});
	} catch (error) {
		console.log(error);
		throw new BadRequestError('Amiibo could not be collected');
	}
};

const wishlistAmiibo = (req, res) => {};

export { getAmiibos, getAmiibo, collectAmiibo, wishlistAmiibo };
