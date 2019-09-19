const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('./userModel');

class UserService {
	static async findUserWithQuery(query) {
		const find = await UserModel.findOne(query);
		if (find) {
			return true;
		} else {
			return false;
		}
	}
	static async addingUser(document) {
		const error = { message: 'error form database', statusCode: 500 };
		try {
			document.password = await bcrypt.hash(document.password, 4);
			const result = await UserModel.register(document);
			return {
				result: {
					id: result._id,
					first_name: result.first_name,
					last_name: result.last_name,
					country_code: result.country_code,
					phone_number: result.phone_number,
					gender: result.gender,
					birthdate: result.birthdate
				}
			};
		} catch (err) {
			return { error };
		}
	}

	static async logInUser(document) {
		const error = { message: 'error form database', statusCode: 500 };
		try {
			const user = await UserModel.findOne({
				phone_number: document.phone_number
			});
			if (!user) {
				return { error: { message: 'This Phone not register', statusCode: 400 } };
			}
			const ret = await bcrypt.compare(document.password, user.password);
			if (!ret) {
				return { error: { message: 'Phone number of password not correct', statusCode: 400 } };
			}
			const token = jwt.sign(
				{
					phone_number: document.phone_number,
					password: document.password
				},
				config.get('jwtPrivateKey')
			);
			return { result: { token } };
		} catch (err) {
			return { error };
		}
	}
	static async addingStatusToUser(document) {
		const error = { message: 'error from database', statusCode: 500 };
		try {
			const user = await UserModel.findOne({
				phone_number: document.user.phone_number
			});
			if (!user) {
				return { error: { message: 'error from database', statusCode: 500 } };
			}
			user.status = document.status;
			const result = await user.save();
			return { result: { status: result.status } };
		} catch (err) {
			console.log(err);
			return { error };
		}
	}
}

module.exports = UserService;
