'use strict'

module.exports = appInfo => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535530696448_9519'

  // add your config here
  config.middleware = []

  return config
}
