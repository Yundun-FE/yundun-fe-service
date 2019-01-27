'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, service } = app;
  router.get('/', controller.home.index);
  router.get('/install', controller.home.install);

  router.get('/jenkins/jobs', controller.jenkins.jobs);
  router.post('/jenkins/jobs/:name/start', controller.jenkins.jobsStart);
  router.get('/jenkins/jobs/:name', controller.jenkins.jobName);

  router.post('/jobs', controller.job.create);
  router.delete('/jobs', controller.job.delete);
  router.put('/jobs/:id', controller.job.update);
  router.get('/jobs', controller.job.list);
  router.get('/jobs/:id', controller.job.id);
  router.get('/jobs/executor/:name/:number', controller.job.jobExecutorNumber);
  router.get('/jobs/executor/:name', controller.job.jobExecutor);

  router.get('/progresses', controller.progress.list);
  router.get('/progresses/:name', controller.progress.name);
  router.get('/notices', controller.notice.list);

  router.resources('products', '/products', 'products');
  router.resources('accounts', '/accounts', 'accounts');
  router.resources('websites', '/websites', 'websites');
  router.resources('applications', '/applications', 'applications');
  router.resources('applicationsPages', '/applicationsPages', 'applicationsPages');

  router.get('/explorer/pages/:code', controller.explorer.page);
  router.get('/explorer/assets/:code', controller.explorer.assets);
  router.get('/upload/token', controller.upload.token);
};
