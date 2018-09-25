'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, service } = app
  router.get('/', controller.home.index)
  router.get('/install', controller.home.install)

  router.get('/jenkins/jobs', controller.jenkins.jobs)
  router.post('/jenkins/jobs/:name/start', controller.jenkins.jobsStart)

  router.post('/products', controller.product.create)
  router.delete('/products', controller.product.delete)
  router.put('/products/:id', controller.product.update)
  router.get('/products', controller.product.list)
  // router.get('/products/:id', controller.product.index)

  router.post('/jobs', controller.job.create)
  router.delete('/jobs', controller.job.delete)
  router.put('/jobs/:id', controller.job.update)
  router.get('/jobs', controller.job.list)
  router.get('/jobs/executor/:name/:number', controller.job.jobExecutor)

  router.post('/accounts', controller.account.create)
  router.delete('/accounts', controller.account.delete)
  router.put('/accounts/:id', controller.account.update)
  router.get('/accounts', controller.account.list)

  router.post('/cmds', controller.cmd.create)
  router.delete('/cmds', controller.cmd.delete)
  router.put('/cmds/:id', controller.cmd.update)
  router.get('/cmds', controller.cmd.list)

  router.post('/websites', controller.website.create)
  router.delete('/websites', controller.website.delete)
  router.put('/websites/:id', controller.website.update)
  router.get('/websites', controller.website.list)

  router.get('/progresses', controller.progress.list)
  router.get('/progresses/:name', controller.progress.name)

  // router.get('/jobs-executor', controller.job.executor)

  router.get('/notices', controller.notice.list)
}
