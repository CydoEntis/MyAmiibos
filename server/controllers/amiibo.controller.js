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

const saveAmiibo = async (req, res) => {
	const {
		amiiboSeries,
		character,
		gameSeries,
		image,
		name,
		release,
		type,
		amiiboId,
		collected,
		wishlisted
	} = req.body;
	try {
		const newAmiibo = await Amiibo.create({
			amiiboSeries,
			character,
			gameSeries,
			image,
			name,
			release,
			type,
			amiiboId,
			collected,
			wishlisted
		});

		res.status(StatusCodes.CREATED).json({
			amiibo: newAmiibo,
		});
	} catch (error) {
		console.log(error);
		throw new BadRequestError('Amiibo could not be saved');
	}
};

const updateAmiibo = async (req, res) => {
	const { amiiboId, wishlisted, collected } = req.body;
	console.log(req.body);
	try {
		const foundAmiibo = await Amiibo.findOne({ amiiboId });

		if (!foundAmiibo) {
			throw new BadRequestError('Amiibo could not be collected');
		}

		const updatedAmiibo = await Amiibo.findOneAndUpdate({ amiiboId }, {
			wishlisted,
			collected
		});

		res.status(StatusCodes.CREATED).json({
			amiibo: updatedAmiibo,
		});
	} catch (error) {
		console.log(error);
	}
};


const getWishlisted = async (req, res) => {
	try {
		const amiibos = await Amiibo.find({wishlisted: true})

		res.status(StatusCodes.OK).json({
			amiibos,
		});
	} catch (error) {
		console.log(error);
		throw new BadRequestError('You have no wishlisted Amiibos');
	}
}

const getCollected = async (req, res) => {
	try {
		const amiibos = await Amiibo.find({collected: true})

		res.status(StatusCodes.OK).json({
			amiibos,
		});
	} catch (error) {
		console.log(error);
		throw new BadRequestError('You have no wishlisted Amiibos');
	}
}

export {
	getAmiibos,
	getAmiibo,
	saveAmiibo,
	updateAmiibo,
	getCollected,
	getWishlisted
};
