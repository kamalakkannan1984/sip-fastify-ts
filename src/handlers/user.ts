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
userHandler.comman = async function (req: any, res: any, done: any) {
  try {
    let body = req.body;
    let result = '';
    let ajv = new Ajv();
    let validate: any = '';

    switch (body.sp_name) {
      case 'sip_do_user_registration':
        validate = ajv.compile(userSchema.sip_do_reg);
        if (validate(body)) {
          const Sip_Register = await this.mongo.MONGO2.db.collection('Sip_Register');
          const Sip_domain = await this.mongo.MONGO2.db.collection('Sip_domain');
          result = await userController.sipRegister(body.input, Sip_Register, Sip_domain);
          body.msg = result;
          res.send(body);
        } else {
          res.send({ msg: { status_code: 400, message: validate.errors[0].message } });
        }
        break;
      case 'sip_authenticate_user_registration':
        validate = ajv.compile(userSchema.sip_reg_auth);
        if (validate(body)) {
          const sipRegister = await this.mongo.MONGO2.db.collection('Sip_Register');
          const sipDomain = await this.mongo.MONGO2.db.collection('Sip_domain');
          result = await userController.sipRegisterAuth(body.input, sipRegister, sipDomain);
          body.msg = result;
          res.send(body);
        } else {
          res.send({ msg: { status_code: 400, message: validate.errors[0].message } });
        }
        break;
      case 'sip_get_user_password':
        validate = ajv.compile(userSchema.sip_get_password);
        if (validate(body)) {
          const dirDomains = await this.mongo.MONGO2.db.collection('dir_domains');
          const dirUsers = await this.mongo.MONGO2.db.collection('dir_users');
          result = await userController.sipGetUserPassword(body.input, dirUsers, dirDomains);
          body.msg = result;
          res.send(body);
        } else {
          res.send({ msg: { status_code: 400, message: validate.errors[0].message } });
        }
        break;
      default:
        res.send({ msg: { status_code: 500, message: 'internal server error' } });
    }
  } catch (err) {
    res.send({ msg: { status_code: 500, message: 'internal server error' } });
  }
};

module.exports = userHandler;
