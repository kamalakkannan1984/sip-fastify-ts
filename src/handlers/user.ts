'use strict';

/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */
import Ajv from 'ajv';
import { userController } from '../controllers/user.controller';
import { userSchema } from '../schema/user';
import { pbxcdrInfoSchema } from '../schema/pbxcdrInfo';
import { userModel } from '../models/user';
import { pbxcdrController } from '../controllers/pbxcdr.controller';
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
    let result: any = {};
    let ajv = new Ajv();
    let validate: any = '';
    const transaction_log = await this.mongo.MONGO2.db.collection('transaction_log');
    switch (body.sp_name) {
      case 'sip_do_user_registration':
        validate = ajv.compile(userSchema.sip_do_reg);
        if (validate(body)) {
          const Sip_Register = await this.mongo.MONGO2.db.collection('Sip_Register');
          const Sip_domain = await this.mongo.MONGO2.db.collection('Sip_domain');
          result = await userController.sipRegister(body.input, Sip_Register, Sip_domain);
          body.msg = result.msg;
          body.output = result.output;
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        } else {
          body.msg = { status_code: 400, message: validate.errors[0].message, error: validate.errors };
          await userModel.saveLog(body, transaction_log);
          console.log('after LOg');
          res.send(body);
        }
        // create transaction_log table

        break;
      case 'sip_authenticate_user_registration':
        validate = ajv.compile(userSchema.sip_reg_auth);
        if (validate(body)) {
          const sipRegister = await this.mongo.MONGO2.db.collection('Sip_Register');
          const sipDomain = await this.mongo.MONGO2.db.collection('Sip_domain');
          result = await userController.sipRegisterAuth(body.input, sipRegister, sipDomain);
          body.msg = result;
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        } else {
          body.msg = { status_code: 400, message: validate.errors[0].message, error: validate.errors };
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        }
        break;
      case 'sip_get_user_password':
        validate = ajv.compile(userSchema.sip_get_password);
        if (validate(body)) {
          const dirDomains = await this.mongo.MONGO2.db.collection('dir_domains');
          const dirUsers = await this.mongo.MONGO2.db.collection('dir_users');
          result = await userController.sipGetUserPassword(body.input, dirUsers, dirDomains);
          body.msg = result.msg;
          body.output = result.output;
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        } else {
          body.msg = { status_code: 400, message: validate.errors[0].message, error: validate.errors };
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        }
        break;
      case 'sip_update_registered_status':
        validate = ajv.compile(userSchema.sip_update_status);
        if (validate(body)) {
          const sipRegister = await this.mongo.MONGO2.db.collection('Sip_Register');
          const sipDomain = await this.mongo.MONGO2.db.collection('Sip_domain');
          result = await userController.sipUpdateStatus(body.input, sipRegister, sipDomain);
          body.msg = result;
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        } else {
          body.msg = { status_code: 400, message: validate.errors[0].message, error: validate.errors };
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        }
        break;
      case 'sip_delete_user_registration':
        validate = ajv.compile(userSchema.sip_delete_user);
        if (validate(body)) {
          const sipRegister = await this.mongo.MONGO2.db.collection('Sip_Register');
          const sipDomain = await this.mongo.MONGO2.db.collection('Sip_domain');
          result = await userController.sipDeleteUser(body.input, sipRegister, sipDomain);
          body.msg = result;
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        } else {
          body.msg = { status_code: 400, message: validate.errors[0].message, error: validate.errors };
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        }
        break;
      case 'sip_get_Registered_user_info':
        validate = ajv.compile(userSchema.sip_get_user);
        if (validate(body)) {
          const sipRegister = await this.mongo.MONGO2.db.collection('Sip_Register');
          const sipDomain = await this.mongo.MONGO2.db.collection('Sip_domain');
          const dirDomains = await this.mongo.MONGO2.db.collection('dir_domains');
          const dirUsers = await this.mongo.MONGO2.db.collection('dir_users');
          result = await userController.sipGetUser(body.input, sipRegister, sipDomain, dirUsers, dirDomains);
          body.msg = result.msg;
          body.output = result.output;
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        } else {
          body.msg = { status_code: 400, message: validate.errors[0].message, error: validate.errors };
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        }
        break;
      case 'pbx_cdr_info':
        validate = ajv.compile(pbxcdrInfoSchema.pbxcdrinfoReq);
        if (validate(body)) {
          const PBX_CDR_TEMP = await this.mongo.MONGO3.db.collection('PBX_CDR_TEMP');
          result = await pbxcdrController.savePBXCDRInfo(body.input, PBX_CDR_TEMP);
          body.msg = result.msg;
          body.output = result.output;
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        } else {
          body.msg = { status_code: 400, message: validate.errors[0].message, error: validate.errors };
          await userModel.saveLog(body, transaction_log);
          res.send(body);
        }
        break;
      default:
        res.send({ msg: { status_code: 500, message: 'internal server error' } });
    }
  } catch (err) {
    res.send({ msg: { status_code: 500, message: 'internal server error' } });
  }
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description -  Update PBX CDR INFO
 */
/*userHandler.pBXCDRInfo = async function (req: any, res: any, done: any) {
  try {
    let body = req.body;
    let result: any = {};
    const transaction_log = await this.mongo.MONGO2.db.collection('transaction_log');
    switch (body.sp_name) {
      case 'pbx_cdr_info':
        const PBX_CDR_TEMP = await this.mongo.MONGO3.db.collection('PBX_CDR_TEMP');
        result = await pbxcdrController.savePBXCDRInfo(body.input, PBX_CDR_TEMP);
        body.msg = result.msg;
        body.output = result.output;
        await userModel.saveLog(body, transaction_log);
        res.send(body);
        // create transaction_log table
        break;
      default:
        res.send({ msg: { status_code: 500, message: 'internal server error' } });
    }
  } catch (err) {
    res.send({ msg: { status_code: 500, message: 'internal server error' } });
  }
}; */
module.exports = userHandler;
