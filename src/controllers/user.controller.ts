/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userModel } from '../models/user';
import { utils } from '../utils/utils';
export const userController: any = {};

/**
 *
 * @param {Object} body - body object
 * @param {Object} regColl - Sip_register collection
 * @param {Object} domainColl - Sip_domain collection
 * @description - sip registration
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
      const val = await userModel.getUser(regColl, data);
      result = {
        output: val,
        msg: { status_code: 200, err_code: 0, affected_rows: 1, message: 'Sip registration completed' }
      };
    } else {
      result = {
        output: {},
        msg: { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' }
      };
    }
    return result;
  } catch (err) {
    return { msg: { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' } };
  }
};

/**
 *
 * @param {Object} body - body object
 * @param {Object} regColl - Sip_register collection
 * @param {Object} domainColl - Sip_domain collection
 * @description - sip registration authendication
 */
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
          result = { status_code: 200, err_code: 1, affected_rows: 1, message: 'No need authentication' };
        } else {
          result = { status_code: 200, err_code: 0, affected_rows: 0, message: 'Need authentication' };
        }
      } else {
        result = { status_code: 422, err_code: 0, affected_rows: 0, message: 'Need authentication' };
      }

    } else {
      result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' };
    }
    return result;
  } catch (err) {
    return { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' };
  }
};

/**
 *
 * @param {Object} body - body object
 * @param {Object} dirUsers - dir_users collection
 * @param {Object} dirDomains - dir_domain collection
 * @description - sip registration authendication
 */
userController.sipGetUserPassword = async (body: any, dirUsers: any, dirDomains: any) => {
  try {

    let result = {};
    let data = body;
    let val: any = null;
    let doaminDetails = await userModel.getDirDomains(dirDomains, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.id;
      val = await userModel.checkPassword(dirUsers, data);
      if (utils.isObject(val)) {
        result = {
          output: { password: val.password },
          msg: { status_code: 200, err_code: 0, affected_rows: 1, message: 'Got user password' }
        };
      } else {
        result = {
          output: {},
          msg: { status_code: 422, err_code: -1, affected_rows: 0, message: 'No entry available for user_id in dir_users' }
        };
      }

    } else {
      result = { msg: { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' } };
    }
    return result;
  } catch (err) {
    return { msg: { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' } };
  }
};


/**
 *
 * @param {Object} body - body object
 * @param {Object} sipRegister - sip_users collection
 * @param {Object} sipDomain - sip_domain collection
 * @description - sip register update status
 */
userController.sipUpdateStatus = async (body: any, sipRegister: any, sipDomain: any) => {
  try {
    let result = {};
    let data = body;
    let val: any = null;
    let doaminDetails = await userModel.getDomains(sipDomain, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.domain_id;
      val = await userModel.updateStatus(sipRegister, data);
      if (val.matchedCount) {
        result = { status_code: 200, err_code: 0, affected_rows: 1, message: 'Success to update the status' };
      } else {
        result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'Failure to change the status' };
      }
    } else {
      result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' };
    }
    return result;
  } catch (err) {
    return { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' };
  }
};

/**
 *
 * @param {Object} body - body object
 * @param {Object} sipRegister - sip_users collection
 * @param {Object} sipDomain - sip_domain collection
 * @description -  sip delete user
 */
userController.sipDeleteUser = async (body: any, sipRegister: any, sipDomain: any) => {
  try {
    let result = {};
    let data = body;
    let val: any = null;
    let doaminDetails = await userModel.getDomains(sipDomain, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.domain_id;
      val = await userModel.deleteUser(sipRegister, data);
      if (val.deletedCount) {
        result = { status_code: 200, err_code: 0, affected_rows: 1, message: 'Successfully Registration deleted' };
      } else {
        result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'Failure to delete registration' };
      }
    } else {
      result = { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' };
    }
    return result;
  } catch (err) {
    return { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' };
  }
};

/**
 *
 * @param {Object} body - body object
 * @param {Object} sipRegister - sip_users collection
 * @param {Object} sipDomain - sip_domain collection
 * @description -  sip get user
 */
userController.sipGetUser = async (body: any, sipRegister: any, sipDomain: any) => {
  try {
    let result = {};
    let data = body;
    let val: any = null;
    let doaminDetails = await userModel.getDomains(sipDomain, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.domain_id;
      val = await userModel.getUser(sipRegister, data);
      if (utils.isObject(val) && val.length > 0) {
        result = {
          output: val,
          msg: { status_code: 200, err_code: 0, affected_rows: 1, message: 'Got Registered User Info Details' }
        };
      } else {
        result = {
          output: {},
          msg: { status_code: 422, err_code: -1, affected_rows: 0, message: 'No entry found in Sip_Register' }
        };
      }
    } else {
      result = { msg: { status_code: 422, err_code: -1, affected_rows: 0, message: 'No entry found in Sip_domain' } };
    }
    return result;
  } catch (err) {
    return { msg: { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' } };
  }
};
