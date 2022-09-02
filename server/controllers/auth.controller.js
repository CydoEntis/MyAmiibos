import userModel from '../models/user.model.js';
import { BadRequestError } from '../errors/index.js';
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		throw new Error('please privde all values');
	}

	const userAlreadyExists = await userModel.findOne({ email });

	if (userAlreadyExists) {
		throw new BadRequestError('User with this email already exists');
	}

	const user = await userModel.create({username, email, password});

	// Add JWT

	res.status(StatusCodes.OK).json({
		user: {
			username: user.username,
			email: user.email,
		}
	})
};

const login = async (req, res) => {
	// TODO: Add login functionality
	res.send('Login User');
};

const updateUser = async (req, res) => {
	res.send('Update User');
};

export { register, login, updateUser };
