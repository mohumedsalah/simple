const expect = require('chai').expect;
const { describe, beforeEach, it } = require('mocha');
const bcrypt = require('bcrypt');
const config = require('config');
const userService = require('../../userService');
const userSchema = require('../../userSchema');

describe('register with specific object', () => {
	beforeEach(async () => {
		await userSchema.deleteMany({});
	});
	it('should return result if need to login with correct account', async () => {
		const user = {
			first_name: 'salah',
			last_name: 'omar',
			phone_number: '01550417457',
			email: 'mohume@gmail.com',
			avatar: '/upload/a.png',
			country_code: 'EG',
			gender: 'male',
			password: '1234',
			birthdate: '5-2-1996'
		};
		await userService.addingUser(user);

		const { result, error } = await userService.logInUser({ phone_number: '01550417457', password: '1234' });
		expect(error).to.be.undefined;
		expect(result).to.be.not.undefined;
		expect(result.token).to.be.not.undefined;
	});
	it('should return result if need to login with not correct account', async () => {
		const user = {
			first_name: 'salah',
			last_name: 'omar',
			phone_number: '01550417457',
			email: 'mohume@gmail.com',
			avatar: '/upload/a.png',
			country_code: 'EG',
			gender: 'male',
			password: '1234',
			birthdate: '5-2-1996'
		};
		await userService.addingUser(user);
		const { result, error } = await userService.addingStatusToUser({
			user: { phone_number: '01550417457' },
			status: { content: 'hello from the gggggg side' }
		});
		expect(result).to.be.not.undefined;
		expect(error).to.be.undefined;
		expect(result.status).to.be.not.undefined;
	});
});
