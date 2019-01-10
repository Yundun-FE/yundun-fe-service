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

  router.post('/products', controller.product.create);
  router.delete('/products', controller.product.delete);
  router.put('/products/:id', controller.product.update);
  router.get('/products', controller.product.list);
  // router.get('/products/:id', controller.product.index)

  router.post('/jobs', controller.job.create);
  router.delete('/jobs', controller.job.delete);
  router.put('/jobs/:id', controller.job.update);
  router.get('/jobs', controller.job.list);
  router.get('/jobs/:id', controller.job.id);
  router.get('/jobs/executor/:name/:number', controller.job.jobExecutorNumber);
  router.get('/jobs/executor/:name', controller.job.jobExecutor);

  router.post('/accounts', controller.account.create);
  router.delete('/accounts/:id', controller.account.delete);
  router.put('/accounts/:id', controller.account.update);
  router.get('/accounts', controller.account.list);

  router.post('/cmds', controller.cmd.create);
  router.delete('/cmds', controller.cmd.delete);
  router.put('/cmds/:id', controller.cmd.update);
  router.get('/cmds', controller.cmd.list);

  router.post('/websites', controller.website.create);
  router.delete('/websites/:id', controller.website.delete);
  router.put('/websites/:id', controller.website.update);
  router.get('/websites', controller.website.list);

  router.get('/progresses', controller.progress.list);
  router.get('/progresses/:name', controller.progress.name);

  // router.get('/jobs-executor', controller.job.executor)

  router.get('/notices', controller.notice.list);

  router.post('/agents', controller.agent.create);
  router.delete('/agents/:id', controller.agent.delete);
  router.put('/agents/:id', controller.agent.update);
  router.get('/agents', controller.agent.list);
  router.get('/agents/:id', controller.agent.id);

  router.post('/brands', controller.brand.create);
  router.delete('/brands/:id', controller.brand.delete);
  router.put('/brands/:id', controller.brand.update);
  router.get('/brands', controller.brand.list);
  router.get('/brands/:id', controller.brand.id);

  router.post('/brandsVersion', controller.brandVersion.create);
  router.delete('/brandsVersion/:id', controller.brandVersion.delete);
  router.put('/brandsVersion/:id', controller.brandVersion.update);
  router.get('/brandsVersion', controller.brandVersion.list);
  router.get('/brandsVersion/:id', controller.brandVersion.id);

  // router.post('/menus', controller.menu.create);
  // router.delete('/menus/:id', controller.menu.delete);
  // router.put('/menus/:id', controller.menu.update);
  // router.get('/menus', controller.menu.list);
  // router.get('/menus/:id', controller.menu.id);

  router.post('/menusVersion', controller.menuVersion.create);
  router.delete('/menusVersion/:id', controller.menuVersion.delete);
  router.put('/menusVersion/:id', controller.menuVersion.update);
  router.get('/menusVersion', controller.menuVersion.list);
  router.get('/menusVersion/:id', controller.menuVersion.id);

  router.post('/applications', controller.application.create);
  router.delete('/applications/:id', controller.application.delete);
  router.put('/applications/:id', controller.application.update);
  router.get('/applications', controller.application.list);
  router.get('/applications/:id', controller.application.id);
};
