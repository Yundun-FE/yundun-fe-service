'use strict';

// had enabled by egg
exports.static = true;

exports.validate = {
  enable: true,
  package: 'egg-async-validator-stage',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.i18n = {
  enable: true,
  package: 'egg-i18n',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.multipart = {
  mode: 'file',
};
