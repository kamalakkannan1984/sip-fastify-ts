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
//mongodb://smepbx:smeswitch@10.22.3.171:27017/unifiedring_pbx
//10.22.3.172:27017
//10.30.3.161:27017
server.register(fastify_mongodb, {
  url: 'mongodb://java:javadb@10.22.7.230:27017/XGREGISTAR',
  name: 'MONGO1',
}).register(fastify_mongodb, {
  url: 'mongodb://k8s-master:27017,node-2:27017,node-1:27017/exampleDB?w=0&readPreference=nearest&replicaSet=replica-mundio&auto_reconnect=true',
  name: 'MONGO2',
});

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

//add hooks with relevant handlers
server.addHook('preHandler', utils.formReqData);
server.addHook('onResponse', utils.formResData);
server.addHook('onError', utils.handleError);

//set fastify default schema compiler
server.setSchemaCompiler(schema => {
  return ajv.compile(schema);
});

//handle unhandled exception
process.on('uncaughtException', err => {
  server.log.error(err);
});

// Run the server!
const start = async () => {
  try {
    let host: any = config.server;
    server.listen(host);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
