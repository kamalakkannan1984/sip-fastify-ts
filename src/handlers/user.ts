'use strict';

/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */
import Ajv from 'ajv';
import { userController } from '../controllers/user.controller';
import { userSchema } from '../schema/user';
const userHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - user signup function
 */
userHandler.comman = async function(req: any, res: any, done: any) {
  try {
    let body = req.body;
    let result = '';
    let ajv = new Ajv();
    let validate: any = '';
    let valid = '';

    switch (body.sp_name) {
      case 'sip_do_user_registration':
        validate = ajv.compile(userSchema.sip_do_reg);
        valid = validate(body);
        if (valid) {
          const Sip_Register = await this.mongo.MONGO1.db.collection('Sip_Register');
          const Sip_domain = await this.mongo.MONGO1.db.collection('Sip_domain');
          result = await userController.sipRegister(body.input, Sip_Register, Sip_domain);
          body.msg = result;
          res.send(body);
        } else {
          res.send({ msg: { status_code: 400, message: validate.errors[0].message } });
        }
        break;
      case 'sip_authenticate_user_registration':
        validate = ajv.compile(userSchema.sip_auth);
        valid = validate(body);

        if (valid) {
          const Sip_Register = await this.mongo.MONGO1.db.collection('Sip_Register');
          const Sip_domain = await this.mongo.MONGO1.db.collection('Sip_domain');
          result = await userController.userRegistrationAuth(body, Sip_Register);
        } else {
          res.send({ statusCode: 400, message: validate.errors });
        }
        break;
      default:
        res.send({ statusCode: 500, message: 'internal server error' });
    }
  } catch (err) {
    res.send({ statusCode: 500, message: 'internal server error' });
  }
};

module.exports = userHandler;
