const expect = require('chai').expect;
const { describe, beforeEach, it } = require('mocha');
const validationOfAddingStatus = require('../validation/validationOfAddingStatus');

describe('Unit test for validate register document', () => {
  /**
   *
   * * Unit
   *
   * @first_name
   * should return  "first_name": [{ "error": "blank" }], if not first_name found *
   *
   * @last_name
   * should return  "last_name": [{ "error": "blank" }], if not last_name found *
   *
   * @country_code
   * should return "country_code": [{ "error": "inclusion" }], if not in ["EG","US"] *
   * @phone_number
   *  should return { "error": "blank" } if no phone_number send *
   *  should return  { "error": "not_a_number" } if one character is not number *
   *  should return   { "error": "taken" } if it duplicate in database(Integration)
   *  should return    { "error": "too_short", "count": 10 } if it's number less than 10*
   *  should return    { "error": "too_long", "count": 15 } if it's number more than 15*
   *  @gender
   *   should return "country_code": [{ "error": "inclusion" }], if not in ["male","female"]*
   *
   * @birthdate
   *  should return { "error": "blank" } if no birthdate send *
   *  should return { "error": "in_the_future" } if in future *
   *
   * @avatar
   * should return { "error": "blank" } if no avatar *
   * should return { "error": "invalid_content_type" } if avatar content not PNG jpg jpeg *
   *
   * @email
   * should return { "error": "invalid" } in email not valid mail *
   *
   * "email": [{ "error": "taken" }, { "error": "invalid" }](integration test)
   *
   */

  const req = { body: null };
  /* const INVALID_OBJECTID = 'This field must be a valid ObjectId';
  const MINLENGTH = value => `This Field must be at least ${value} characters`;
  const MAXLENGTH = value => `This Field must be at most ${value} characters`; */

  beforeEach(async () => {
    req.body = {
      phone_number: '010012311467',
      token: '1as5df165as4fd4',
      status: { content: 'hello from the other word' }
    };
  });

  it('should return  "phone_number": [{ "error": "blank" }], if not first_name found', async () => {
    delete req.body.phone_number;
    const errors = await validationOfAddingStatus(req);
    expect(errors.phone_number).to.be.an('array');
    expect(errors.phone_number[0].error).to.equal('required');
  });
  it('should return  "token": [{ "error": "blank" }], if not token found', async () => {
    delete req.body.token;
    const errors = await validationOfAddingStatus(req);
    expect(errors.token).to.be.an('array');
    expect(errors.token[0].error).to.equal('required');
  });

  it('should return  "token": [{ "error": "blank" }], if not token found', async () => {
    delete req.body.status;
    const errors = await validationOfAddingStatus(req);
    expect(errors.status).to.be.an('array');
    expect(errors.status[0].error).to.equal('blank');
  });
});
