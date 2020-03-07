/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

import { userModel } from '../models/user';
export const userController: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - user signup function
 */
userController.sipRegister = async (body: any, regColl: any, domainColl: any) => {
  try {
    /*domainColl
      .find()
      .toArray()
      .then(user => {
        console.log(user);
      });*/
    let result = {};
    let data = body;
    let doaminDetails = await userModel.getDomains(domainColl, data.domain_name);

    if (doaminDetails && doaminDetails !== null && doaminDetails !== 'undefined') {
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

userController.userRegistrationAuth = async (body: any, userController: any) => {
  try {
    const findUser = await userController.findOne({
      username: body.input.username,
    });
    console.log(findUser);
    body.output = { statusCode: 200, message: 'success' };

    return body;
  } catch (err) {
    return new Error();
  }
};

//module.exports = userController;
