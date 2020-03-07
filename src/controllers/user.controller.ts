/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userModel } from '../models/user';
import { utils } from '../utils/utils';
export const userController: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - user signup function
 */
userController.sipRegister = async (body: any, regColl: any, domainColl: any) => {
  try {
    let result = {};
    let data = body;
    let doaminDetails = await userModel.getDomains(domainColl, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.domain_id;
      await userModel.deleteRegister(regColl, data);
      data.Registered_date = new Date().toISOString();
      data.last_update = new Date().toISOString();
      delete data.domain_name;
      await userModel.saveRegister(regColl, data);
      result = { status_code: 200, err_code: 0, affected_rows: 1, message: 'Sip registration completed' };
    } else {
      result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' };
    }
    return result;
  } catch (err) {
    return { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' };
  }
};

userController.sipRegisterAuth = async (body: any, sipRegister: any, sipDomain: any) => {
  try {

    let result = {};
    let data = body;
    let val: any = null;
    let doaminDetails = await userModel.getDomains(sipDomain, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.domain_id;
      val = await userModel.authendicate(sipRegister, data);
      if (utils.isObject(val)) {
        if (utils.dateDiffSec(val.last_update) <= val.expires) {
          result = { status_code: 200, err_code: 0, affected_rows: 1, message: 'No need authentication' };
        } else {
          result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'Need authentication' };
        }
      } else {
        result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'Need authentication' };
      }

    } else {
      result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' };
    }
    return result;
  } catch (err) {
    return { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' };
  }
};

userController.sipGetUserPassword = async (body: any, dirUsers: any, dirDomains: any) => {
  try {

    let result = {};
    let data = body;
    let val: any = null;
    let doaminDetails = await userModel.getDirDomains(dirDomains, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.id;
      console.log(data);
      val = await userModel.checkPassword(dirUsers, data);
      if (val) {
        result = { status_code: 200, err_code: 0, affected_rows: 1, message: 'Got user password' };
      } else {
        result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'No entry available for user_id in dir_users' };
      }

    } else {
      result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' };
    }
    return result;
  } catch (err) {
    return { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' };
  }
};

//module.exports = userController;
