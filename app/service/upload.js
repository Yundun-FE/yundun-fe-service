'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');

class UploadService extends Service {
  token() {
    const { app } = this;
    const accessKey = app.config.qiniu.accessKey;
    const secretKey = app.config.qiniu.secretKey;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    const options = {
      scope: app.config.qiniu.bucket,
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }

  async uploadCdn(filePath, filename) {
    const baseUrl = this.app.config.qiniu.url;
    const uploadToken = this.token();

    // 实例化config
    const config = new qiniu.conf.Config();

    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();

    // 文件上传
    return new Promise((resolved, reject) => {
      formUploader.putFile(uploadToken, filename, filePath, putExtra, function(respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          respBody.url = `${baseUrl}/${respBody.key}`;
          resolved(respBody);
        } else {
          resolved(respBody);
        }
      });
    });
  }
}

module.exports = UploadService;
