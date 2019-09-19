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
	it('should return result if all is done and added it to database', async () => {
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
		const { result, error } = await userService.addingUser(user);
		expect(error).to.be.undefined;
		expect(result).to.be.not.undefined;
		expect(result.first_name).to.equal('salah');
		expect(result.last_name).to.equal('omar');
		expect(result.password).to.be.undefined;
		expect(result.gender).to.equal('male');
	});
	it('should return error  if one of required not in document ', async () => {
		const user = {
			first_name: 'salah',
			phone_number: '01550417457',
			email: 'mohume@gmail.com',
			avatar: '/upload/a.png',
			country_code: 'EG',
			gender: 'male',
			password: '1234',
			birthdate: '5-2-1996'
		};
		const { result, error } = await userService.addingUser(user);
		expect(error).to.be.not.undefined;
	});
});
