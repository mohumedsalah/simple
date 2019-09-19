const userService = require('./userService');

exports.addOne = async (req, res) => {
	const { error, result } = await userService.addingUser(req.body);
	if (!error) {
		console.log(result);
		return res.status(200).json(result);
	}
	return res.status(error.statusCode).json(error.message);
};

exports.logIn = async (req, res) => {
	const { error, result } = await userService.logInUser(req.body);
	if (!error) {
		return res.status(200).json(result);
	}
	return res.status(error.statusCode).json(error.message);
};

exports.addingStatus = async (req, res) => {
	const { error, result } = await userService.logInUser(req.body);
	if (!error) {
		return res.status(200).json(result);
	}
	return res.status(error.statusCode).json(error.message);
};
