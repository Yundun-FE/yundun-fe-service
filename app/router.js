'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, service } = app;
  router.get('/', controller.home.index);
  router.get('/install', controller.home.install);

  router.post('/api/v1/accounts/captchas/sms', controller.accounts.captchas.sms);
  router.post('/api/v1/register', controller.accounts.users.register);

  router.get('/api/v1/jenkins/jobs', controller.jenkins.jobs);
  router.post('/api/v1/jenkins/jobs/:name/start', controller.jenkins.jobsStart);
  router.get('/api/v1/jenkins/jobs/:name', controller.jenkins.jobName);

  router.get('/api/v1/:env/explorer/jobs/:name', controller.explorer.job);
  router.resources('products', '/api/v1/products', controller.products.index);
  router.resources('products/settings', '/api/v1/products/:productId/settings', controller.products.settings);
  router.resources('jobs', '/api/v1/jobs', controller.jobs.v1);
  router.resources('jobs', '/api/v2/jobs', controller.jobs.v2);
  router.resources('jobs/settings', '/api/v2/jobs/:jobId/settings', controller.jobs.settings);
  // router.post('/api/v2/products/:id/release', controller.products.release);

  // STAGE
  // router.get('/update', controller.home.update);
  // router.post('/events', controller.events.create);
  // router.get('/jobs/executor/:name/:number', controller.jobs.jobExecutorNumber);
  // router.get('/jobs/executor/:name', controller.jobs.jobExecutor);

  // router.get('/progresses/:name', controller.progress.name);
  // router.get('/notices', controller.notice.list);

  // router.resources('forms', '/forms', 'forms');
  router.resources('jobs', '/api/jobs', 'jobs.v1');
  // router.resources('blocks', '/blocks', 'blocks');
  // router.resources('websites', '/websites', 'websites');
  // router.resources('applications', '/applications', 'applications');
  // router.resources('applicationsPages', '/applicationsPages', 'applicationsPages');
  // router.resources('applicationsVersions', '/applicationsVersions', 'applicationsVersions');

  router.get('/explorer/pages/:code', controller.explorer.page);
  // router.get('/explorer/jobs/:name', controller.explorer.job);
  router.get('/explorer/jobs/:name/env/:env', controller.explorer.job);
  // router.get('/explorer/assets/:code', controller.explorer.assets);
  router.get('/api/upload/token', controller.upload.token);

};
