'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  router.post('/products', controller.product.create)
  router.delete('/products', controller.product.delete)
  router.put('/products/:id', controller.product.update)
  router.get('/products', controller.product.list)
  // router.get('/products/:id', controller.product.index)

  router.post('/nodes', controller.node.create)
  router.delete('/nodes', controller.node.delete)
  router.put('/nodes/:id', controller.node.update)
  router.get('/nodes', controller.node.list)
  // router.get('/nodes/:id', controller.node.index)
}
