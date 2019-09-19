const expect = require('chai').expect;
const { describe, beforeEach, it } = require('mocha');
const validationUserDocument = require('../../validation/validationUserDocument');
const userSchema = require('../../userSchema');

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
    await userSchema.deleteMany({});
    req.body = {
      first_name: 'Ali',
      last_name: 'Gamal',
      country_code: 'EG',
      phone_number: '010012311467',
      gender: 'male',
      birthdate: '1988-03-29',
      password: '1324'
    };

    req.file = {};
    req.file.path = 'aaaa';
    req.file.originalname = 'aaaa.png';
  });

  it('should return  "first_name": [{ "error": "blank" }], if not first_name found', async () => {
    delete req.body.first_name;
    const errors = await validationUserDocument(req);
    expect(errors.first_name).to.be.an('array');
    expect(errors.first_name[0].error).to.equal('required');
  });
  it('should return  "last_name": [{ "error": "blank" }], if not last_name found', async () => {
    delete req.body.last_name;
    const errors = await validationUserDocument(req);
    expect(errors.last_name).to.be.an('array');
    expect(errors.last_name[0].error).to.equal('required');
  });
  it('should return "country_code": [{ "error": "inclusion" }], if not in ["EG","US"]', async () => {
    req.body.country_code = 'FF';
    const errors = await validationUserDocument(req);
    expect(errors.country_code).to.be.an('array');
    expect(errors.country_code[0].error).to.equal('inclusion');
  });
  it('should return { "error": "blank" } if no phone_number send', async () => {
    delete req.body.phone_number;
    const errors = await validationUserDocument(req);
    expect(errors.phone_number).to.be.an('array');
    expect(errors.phone_number[0].error).to.equal('required');
  });

  it('should return  { "error": "not_a_number" } if one character is not number', async () => {
    req.body.phone_number = '1234567981aa';
    const errors = await validationUserDocument(req);
    expect(errors.phone_number).to.be.an('array');
    expect(errors.phone_number[0].error).to.equal('not_a_number');
  });

  it(' should return    { "error": "too_short", "count": 10 } if it\'s number less than 10', async () => {
    req.body.phone_number = '16798112';
    const errors = await validationUserDocument(req);
    expect(errors.phone_number).to.be.an('array');
    expect(errors.phone_number[0].error).to.equal('too_short');
  });
  it(' should return    { "error": "too_short", "count": 10 } if it\'s number less than 10', async () => {
    req.body.phone_number = '167911111111111111111118112';
    const errors = await validationUserDocument(req);
    expect(errors.phone_number).to.be.an('array');
    expect(errors.phone_number[0].error).to.equal('too_long');
  });
  it('should return "gender": [{ "error": "inclusion" }], if not in ["male","female"]', async () => {
    req.body.gender = 'FF';
    const errors = await validationUserDocument(req);
    expect(errors.gender).to.be.an('array');
    expect(errors.gender[0].error).to.equal('inclusion');
  });
  it('should return  "birthdate": [{ "error": "blank" }], if not birthdate found', async () => {
    delete req.body.birthdate;
    const errors = await validationUserDocument(req);
    expect(errors.birthdate).to.be.an('array');
    expect(errors.birthdate[0].error).to.equal('required');
  });
  it('should return { "error": "in_the_future" } if in future ', async () => {
    req.body.birthdate = '2020-03-29';
    const errors = await validationUserDocument(req);
    expect(errors.birthdate).to.be.an('array');
    expect(errors.birthdate[0].error).to.equal('future date');
  });
  it('should return { "error": "blank" } if no avatar', async () => {
    delete req.file;
    const errors = await validationUserDocument(req);
    expect(errors.avatar).to.be.an('array');
    expect(errors.avatar[0].error).to.equal('blank');
  });

  it('should return { "error": "blank" } if no avatar', async () => {
    req.file.path = 'aaaa';
    req.file.originalname = 'aaaa.wpg';
    const errors = await validationUserDocument(req);
    expect(errors.avatar).to.be.an('array');
    expect(errors.avatar[0].error).to.equal('invalid_content_type');
  });

  it('should return { "error": "invalid" } in email not valid mail', async () => {
    req.body.email = 'asdfasdfasdfsda';
    const errors = await validationUserDocument(req);
    expect(errors.email).to.be.an('array');
    expect(errors.email[0].error).to.equal('invalid');
  });

  it('should return { "error": "token" } in email token before', async () => {
    const user1 = await userSchema.create({
      first_name: 'Ali',
      last_name: 'Gamal',
      country_code: 'EG',
      phone_number: '01001234567',
      gender: 'male',
      birthdate: '1988-03-29',
      password: '1324',
      avatar: 'adsf.png',
      email: 'gasdfasdfcom@gmail.com'
    });
    await user1.save();
    req.body.email = 'gasdfasdfcom@gmail.com';
    const errors = await validationUserDocument(req);
    expect(errors.email).to.be.an('array');
    expect(errors.email[0].error).to.equal('taken');
    await userSchema.deleteMany({});
  });
});
