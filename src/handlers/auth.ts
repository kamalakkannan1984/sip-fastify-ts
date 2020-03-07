/**
 * @createdBy Kamal
 * @createdOn 12th Feb 2020
 */
import { config } from '../config/app';
export const authHandler: any = {};

//validate Basic auth for public apis
authHandler.validate = (username: string, password: string, req: any, reply: any, done: any) => {
  username == config.basic_uname && password == config.basic_pw
    ? done()
    : done(new Error('Authorization token is required'));
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - reply object
 * @param {Object} done - done object can be called once verification is done
 */
authHandler.validateSession = (req: any, reply: any, done: any) => {
  try {
    done();
  } catch (err) {
    return done({});
  }
};
