/**
 * @createdBy Kamal
 * @createdOn 05th Mar 2020
 */

export const config = {
  server: {//10.22.7.29
    host: process.env.HOST ? process.env.HOST : '10.22.7.29',
    port: process.env.PORT ? process.env.PORT : 5002,
  },
  logger_level: process.env.LOGGER_LEVEL,
  jwt_secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'sscret',
  basic_uname: process.env.BASIC_UNAME,
  basic_pw: process.env.BASIC_PW,
  apiRoutePrefix: '/api',
  ejabberdBaseUrl: 'http://82.113.74.51:5001/api',
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
      host: `${process.env.HOST ? process.env.HOST : '10.22.7.29'}:${process.env.PORT ? process.env.PORT : 5002}`,
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
