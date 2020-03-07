/**
 * @createdBy Kamal
 * @createdOn 05 Jan 2020
 */

/*const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const axios = require('axios');
let appConfig = require('../config/app'); */

export const utils: any = {};
//form  post req data
utils.formReqData = (req: any, reply: any, done: any) => {
  done();
};

//process response Object
utils.formResData = (req: any, reply: any, done: any) => {
  done();
};

//process error object
utils.handleError = (req: any, reply: any, error: any, done: any) => {
  console.log('error', error);

  done();
};

/**
 * @param {Object} data - data to  form the response
 */

utils.formSuccessObject = (statusCode: any, message: any, data: any) => {
  let succssObj: any = {
    statusCode: statusCode ? statusCode : 200,
    message: message ? message : 'Success',
  };

  if (data) {
    succssObj['data'] = data;
  }

  return succssObj;
};

/**
 * @param {Object} err - err to  form the response
 */
utils.formErrorObject = (statusCode: any, message: any, err: any) => {
  const errorObj: any = {
    statusCode: statusCode ? statusCode : 500,
    message: message ? message : 'Failed',
    isError: true,
  };

  if (err) {
    errorObj['err'] = err; //error object contains actual error details
  }
  console.log('errorObj', errorObj);

  return errorObj;
};
