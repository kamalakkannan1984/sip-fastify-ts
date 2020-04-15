import fastify from 'fastify';
import fastify_mongodb from 'fastify-mongodb';
import { Server, IncomingMessage, ServerResponse } from 'http';
import Ajv from 'ajv';
import { config } from './config/app';
import { utils } from './utils/utils';
import { authHandler } from './handlers/auth';
import { configureRoutes } from './routes';

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
  trustProxy: true,
});

server.register(require('fastify-swagger'), config.swagger_options);
server.register(require('fastify-cors'), config.cors_options);
server.register(fastify_mongodb, {
  url: 'mongodb://java:javadb@10.22.7.230:27017/XGREGISTAR',
  name: 'MONGO1',
}).register(fastify_mongodb, {
  url: 'mongodb://smepbx:smeswitch@10.22.3.171:27017/unifiedring_pbx',
  name: 'MONGO2',
}).register(fastify_mongodb, {
  url: 'mongodb://smepbx:smeswitch@10.22.7.229:27017/unifiedring_pbx',
  name: 'MONGO3',
});

/*
kindly use below details.
server: 10.22.7.229
database: unifiedring_pbx
login: smepbx
password: smeswitch
collection: PBX_CDR_TEMP
*/

//add hooks with relevant handlers
//server.addHook('preHandler', utils.formReqData);
server.addHook('onResponse', utils.formResData);
server.addHook('onError', utils.handleError);

//decorate functions
server
  .decorate('validateSession', authHandler.validateSession)
  .register(require('fastify-auth'))
  .register(configureRoutes)
  .after(() => {
    //routes.registerRoutes(fastify);
  });

const ajv = new Ajv({
  // the fastify defaults (if needed)
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
  nullable: true,
});

//set fastify default schema compiler
server.setSchemaCompiler(schema => {
  return ajv.compile(schema);
});

//handle unhandled exception
process.on('uncaughtException', err => {
  server.log.error(err);
});

/*server.listen(3000, (err: any) => {
  if (err) {
    console.log('Error: ', err);
    process.exit(1);
  }
  console.log(' Server Started on port - 3000 ');
}); */

// Run the server!
const start = async () => {
  try {
    let host: any = config.server;
    await server.listen(host);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
