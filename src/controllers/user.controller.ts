/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userModel } from '../models/user';
import { utils } from '../utils/utils';
import Ejabberd from '../services/ejabberd.service';
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
      const val = await userModel.getUser(regColl, data);
      result = {
        output: val,
        msg: { status_code: 200, err_code: 0, affected_rows: 1, message: 'Sip registration completed' },
      };
    } else {
      result = {
        output: {},
        msg: { status_code: 422, err_code: -1, affected_rows: 0, message: 'invalid domain' },
      };
    }
    return result;
  } catch (err) {
    return { msg: { status_code: 500, err_code: -1, affected_rows: 0, message: 'internal server error' } };
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
          msg: { status_code: 200, err_code: 0, affected_rows: 1, message: 'Got user password' },
        };
      } else {
        result = {
          output: {},
          msg: {
            status_code: 422,
            err_code: -1,
            affected_rows: 0,
            message: 'No entry available for user_id in dir_users',
          },
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

userController.sipGetUser = async (body: any, sipRegister: any, sipDomain: any, dirUsers: any, dirDomains: any) => {
  try {
    let result = {};
    let data = body;
    let val: any = null;
    let outputArr: any = {};
    let presence: any = [];
    let doaminDetails = await userModel.getDomains(sipDomain, data.domain_name);
    if (utils.isObject(doaminDetails)) {
      data.Domain_id = doaminDetails.domain_id;
      val = await userModel.getUser(sipRegister, data);
      if (utils.isObject(val) && val.length > 0) {
        // find sip login id
        let dirDoaminDetails = await userModel.getDirDomains(dirDomains, data.domain_name);
        const sipId = await userModel.getSipId(dirUsers, data, dirDoaminDetails.id);
        console.log(sipId.sip_login_id);
        //get presence status
        if (sipId.sip_login_id !== null) {
          const ejabberd = new Ejabberd();
          presence = await ejabberd.getPresenceStatus(sipId.sip_login_id);
          console.log(presence);
          for (let i = 0; i < val.length; i++) {
            if (presence.length !== 0) {
              for (let j = 0; j < presence.length; j++) {
                if (presence[j].resource === val[i].Call_id) {
                  if ((presence[j].status = 'available')) {
                    val[i].presence_status = 1;
                  } else {
                    val[i].presence_status = 0;
                  }
                } else {
                  val[i].presence_status = 0;
                }
              }
            } else {
              val[i].presence_status = 0;
            }
          }
        } else {
          for (let i = 0; i < val.length; i++) {
            val[i].presence_status = 0;
          }
        }

        outputArr['data'] = val;
        outputArr['presence_status'] = presence;
        //
        result = {
          output: val,
          msg: { status_code: 200, err_code: 0, affected_rows: 1, message: 'Got Registered User Info Details' },
        };
      } else {
        result = {
          output: {},
          msg: { status_code: 422, err_code: -1, affected_rows: 0, message: 'No entry found in Sip_Register' },
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

//module.exports = userController;
