const validateLoginRequest = require('../validation/validateLoginRequest');
const expect = require('chai').expect;
const { describe, beforeEach, it } = require('mocha');

describe('Unit test for validate register document', () => {
  const req = { body: null };
  beforeEach(async () => {
    req.body = {
      phone_number: '01550417457',
      password: '1324'
    };
  });

  it('should return  "phone_number": [{ "error": "required" }], if not phone_number found', async () => {
    delete req.body.phone_number;
    const errors = await validateLoginRequest(req);
    expect(errors.phone_number).to.be.an('array');
    expect(errors.phone_number[0].error).to.equal('required');
  });

  it('should return  "password": [{ "error": "required" }], if not password found', async () => {
    delete req.body.password;
    const errors = await validateLoginRequest(req);
    expect(errors.password).to.be.an('array');
    expect(errors.password[0].error).to.equal('required');
  });
});
