import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide a username'],
		minlength: 3,
		maxlength: 20,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide a valid email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 6,
		trim: true,
		select: false,
	},
});

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

UserSchema.methods.comparePassword = async function (userPassword) {
	const doesMatch = await bcrypt.compare(userPassword, this.password);
	return doesMatch;
}

export default mongoose.model('User', UserSchema);
