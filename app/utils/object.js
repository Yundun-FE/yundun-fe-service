const { isDef } = require('./');

function mergeShare(reference, object) {
  const data = {};
  Object.keys(reference).forEach(key => {
    data[key] = isDef(object[key]) ? object[key] : reference[key];
  });
  return data;
}

exports.mergeShare = mergeShare;
