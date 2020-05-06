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
  /*const schemaPBXCDR = {
    schema: {
      body: pbxcdrInfoSchema.commanReq.body,
      response: pbxcdrInfoSchema.commanRes,
    },
  };*/
  fastify.post('/api', opts, apihandler.comman);
  //fastify.post('/api/PBX_CDR_Info', schemaPBXCDR, apihandler.pBXCDRInfo)
  done();
};
