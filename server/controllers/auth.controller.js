const register = async (req, res) => {
	const {username, email, password } = req.body;

	if(!username || !email ||!password) {
		throw new Error("please privde all values");
	}

	// const userAlreadyExists = await 
};

const login = async (req, res) => {
	res.send('Login User');
};

const updateUser = async (req, res) => {
	res.send('Update User');
};

export { register, login, updateUser };
