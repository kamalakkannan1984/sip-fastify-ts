/**
 * @createdBy kamal
 * @createdOn 05th Mar 2020
 */

import { userSchema } from '../schema/user';
/**
 * @param {Object} fastify - fastify
 */
export const configureRoutes = (fastify: any, options: any, done: any) => {
  const apihandler = require('../handlers/user');
  const opts = {
    schema: {
      body: userSchema.commanReq.body,
      response: userSchema.commanRes,
    },
  };
  fastify.post('/api', opts, apihandler.comman);
  done();
};
