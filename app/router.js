'use strict';

module.exports = app => {
  const { router, controller, service } = app;
  router.get('/', controller.home.index);
  router.get('/install', controller.home.install);
  // users
  router.post('/api/v1/account/sms', controller.accounts.captchas.sms);
  router.post('/api/v1/register', controller.accounts.users.register);
  router.post('/api/v1/login', controller.accounts.users.login);
  router.get('/api/v1/user/info', app.jwt, controller.accounts.users.info);
  router.put('/api/v1/user/info', app.jwt, controller.accounts.users.update);
  router.post('/api/v1/user/avatar', app.jwt, controller.accounts.info.avatar);
  // jenkins
  // router.get('/api/v1/jenkins/jobs', controller.jenkins.jobs);
  // router.post('/api/v1/jenkins/jobs/:name/start', controller.jenkins.jobsStart);
  // router.get('/api/v1/jenkins/jobs/:name', controller.jenkins.jobName);
  // devops
  router.post('/api/hook/:gitType/:token', controller.devops.git.hook);
  // router.post('/api/build/release/:productName', controller.build.releases.create);
  // router.get('/api/build/flows/:flowName', controller.build.flows.flowName);
  // router.get('/api/build/flows/:productName/number/:number', controller.build.flows.productName);
  router.post('/api/build/products/:productName', controller.build.products.create);
  router.post('/api/build/hash/:hash', controller.build.products.saveHash);
  // explorer
  router.get('/api/v1/:env/explorer/jobs/:name', controller.explorers.v1.job);
  router.get('/api/v2/:env/explorer/jobs/:productName', controller.explorers.v2.job);
  router.get('/api/v2/:env/explorer/jobs/:productName/hash/:hash', controller.explorers.v2.jobHash);
  router.get('/api/v2/:env/explorer/jobs/:productName/number/:number', controller.explorers.v2.jobNumber);
  // products
  router.resources('products', '/api/v1/products', app.jwt, controller.products.index);
  router.resources('products/settings', '/api/v1/products/:productId/settings', controller.products.settings);
  router.resources('jobs', '/api/v1/jobs', controller.jobs.v1);
  router.resources('jobs', '/api/v2/jobs', controller.jobs.v2);
  router.resources('jobs/settings', '/api/v2/jobs/:jobId/settings', controller.jobs.settings);
  router.resources('jobs/deploys', '/api/v2/jobs/:jobId/deploys', controller.jobs.deploys);
  // other
  router.get('/api/upload/token', controller.upload.token);

  // STAGE
  router.resources('jobs', '/api/jobs', 'jobs.v1');
  // router.get('/update', controller.home.update);
  // router.post('/events', controller.events.create);
  // router.get('/jobs/executor/:name/:number', controller.jobs.jobExecutorNumber);
  // router.get('/jobs/executor/:name', controller.jobs.jobExecutor);
  // router.resources('blocks', '/blocks', 'blocks');
  // router.resources('applications', '/applications', 'applications');
  // router.resources('applicationsPages', '/applicationsPages', 'applicationsPages');
  // router.resources('applicationsVersions', '/applicationsVersions', 'applicationsVersions');

  // router.get('/explorer/pages/:code', controller.explorer.page);
  // router.get('/explorer/jobs/:name', controller.explorer.job);
  router.get('/explorer/jobs/:name/env/:env', controller.explorers.v1.job);
  // router.get('/explorer/assets/:code', controller.explorer.assets);
};
