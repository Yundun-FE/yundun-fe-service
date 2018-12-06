'use strict';

// exports.isDef =

function isDef(value) {
  return value !== undefined && value !== null;
}

function clearnDef(obj) {
  Object.keys(obj).forEach(key => {
    if (!isDef(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
}

exports.clearnDef = clearnDef;
