'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, service } = app;
  router.get('/', controller.home.index);
  router.get('/install', controller.home.install);
  router.get('/update', controller.home.update);
  router.post('/events', controller.events.create);

  router.get('/jenkins/jobs', controller.jenkins.jobs);
  router.post('/jenkins/jobs/:name/start', controller.jenkins.jobsStart);
  router.get('/jenkins/jobs/:name', controller.jenkins.jobName);

  router.get('/jobs/executor/:name/:number', controller.jobs.jobExecutorNumber);
  router.get('/jobs/executor/:name', controller.jobs.jobExecutor);

  router.get('/progresses/:name', controller.progress.name);
  router.get('/notices', controller.notice.list);

  router.resources('forms', '/forms', 'forms');
  router.resources('jobs', '/jobs', 'jobs');
  router.resources('blocks', '/blocks', 'blocks');
  router.resources('products', '/products', 'products');
  router.resources('accounts', '/accounts', 'accounts');
  router.resources('websites', '/websites', 'websites');
  router.resources('applications', '/applications', 'applications');
  router.resources('applicationsPages', '/applicationsPages', 'applicationsPages');

  router.get('/explorer/pages/:code', controller.explorer.page);
  router.get('/explorer/jobs/:name', controller.explorer.job);
  router.get('/explorer/assets/:code', controller.explorer.assets);
  router.get('/upload/token', controller.upload.token);
};
