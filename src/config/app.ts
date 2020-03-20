/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

export const config = {
  server: {
    host: process.env.HOST ? process.env.HOST : 'localhost',
    port: process.env.PORT ? process.env.PORT : 5001,
  },
  logger_level: process.env.LOGGER_LEVEL,
  jwt_secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'sscret',
  basic_uname: process.env.BASIC_UNAME,
  basic_pw: process.env.BASIC_PW,
  apiRoutePrefix: '/api',
  cors_options: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: false,
    exposedHeaders: null,
    allowedHeaders: null,
    maxAge: null,
    preflight: true,
    hideOptionsRoute: true,
  },
  swagger_options: {
    exposeRoute: true,
    routePrefix: '/api/documentation',
    swagger: {
      host: `${process.env.HOST ? process.env.HOST : 'localhost'}:${process.env.PORT ? process.env.PORT : 5001}`,
      info: {
        title: 'SIP',
        description: 'sip api swagger documentation',
        version: process.env.VERSION,
      },
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        {
          name: 'health',
          description: 'Testing related end-points',
        },
        {
          name: 'user',
          description: 'User related end-points',
        },
      ],
    },
  },
};
