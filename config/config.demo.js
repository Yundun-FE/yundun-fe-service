'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535530696448_9519';

  config.sequelize = {
    dialect: 'mysql',
    database: 'yundun-fe',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'root',
    timezone: '+08:00',
  };

  config.jenkins = {
    url: '',
    interval: '10s',
  };

  // add your config here
  config.middleware = [ 'errorHandler' ];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return config;
};
