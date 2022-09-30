import mongoose from 'mongoose';

const AmiiboSchema = new mongoose.Schema({
	amiiboSeries: {
		type: String,
		required: true,
	},
	character: {
		type: String,
		required: true,
	},
	gameSeries: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	release: {
		type: String,
	},
	type: {
		type: String,
		required: true,
	},
	amiiboId: {
		type: String,
		required: true,
	},
  collected: {
    type: Boolean,
    default: false,
  },
  wishlisted: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model('Amiibo', AmiiboSchema);
