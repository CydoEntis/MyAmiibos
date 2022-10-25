import User from '../models/user.model.js';
import { BadRequestError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		throw new Error('please privde all values');
	}

	const userAlreadyExists = await User.findOne({ email });

	if (userAlreadyExists) {
		throw new BadRequestError('User with this email already exists');
	}

	const user = await User.create({ username, email, password });

	// Add JWT
	const token = user.createJWT();

	res.status(StatusCodes.OK).json({
		user,
		token,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide all values');
	}

	const user = await User.findOne({ email: email }).select('+password');

	if (!user) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const isCorrectPassword = await user.comparePassword(password);

	if (!isCorrectPassword) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const token = user.createJWT();
	user.password = undefined;

	res.status(StatusCodes.OK).json({
		user,
		token,
	});
};

const updateUser = async (req, res) => {
	res.send('Update User');
};

export { register, login, updateUser };
