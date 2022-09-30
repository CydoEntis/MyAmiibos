import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import Amiibo from '../models/amiibo.model';

// const getAmiibos = async (req, res) => {
//   const { head, tail } =

//   try {

//   } catch (error) {

//   }
// }

const collectAmiibo = async (req, res) => {
	const { amiiboSeries, character, gameSeries, image, name, release, type } =
		req.body;

	try {
		const amiibo = await Amiibo.create({
			amiiboSeries,
			character,
			gameSeries,
			image,
			name,
			release,
			type,
			collected: true,
			wishlistAmiibo: false,
		});

		res.status(StatusCodes.CREATED).json({
			amiibo,
		});
	} catch (error) {
		throw new BadRequestError('Amiibo could not be collected');
	}
};

const wishlistAmiibo = (req, res) => {};

export { collectAmiibo, wishlistAmiibo };
