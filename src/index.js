const through = require('through2');
const bce = require('baidubce-sdk');
const fs = require('fs');
// const path = require('path');

class OssClient {
  constructor(option) {
    this.client = new bce.BosClient(option);
    this.option = option;
  }
  put(ossPath, file, opts) {
    return this.client.putObjectFromFile(this.option.bucket, ossPath, file.path);
  }
  head(ossPath) {
    return Promise.reject('Object not exists');
    // return new Promise((resolve, reject) => {
    //   this.client.headObject({
    //     Bucket: this.option.Bucket,
    //     Region: this.option.Region,
    //     Key: ossPath,
    //   }, function (err, data) {
    //     err ? reject(err) : resolve(data);
    //   });
    // });
  }
}

/**
 *
 * @param {MyFile} file
 * @param {string} prefix
 */
function getFileKey(file, prefix) {
  var str = file.path
    .replace(file.cwd, '')
    .replace(/\\/g, '/')
    .replace(file.base, '')
    .replace(/^\/+/, '');

  return (
    prefix + (!prefix || prefix[prefix.length - 1] === '/' ? '' : '/') + str
  );
}

/**
 * 上传到阿里云oss
 * @param {OssClient} client
 * @param {string} ossPath
 * @param {*} file
 * @param {OSS.PutObjectOptions} opts
 */
async function uploadFile(client, ossPath, file, opts) {
  try {
    await client.head(ossPath);
  } catch (err) {
    if (err.message === 'Object not exists') {
      return client.put(ossPath, file, opts);
    } else {
      throw err;
    }
  }
}

/**
 * 上传到阿里云oss
 * @param {OssClient} client
 * @param {string} ossPath
 * @param {*} file
 * @param {OSS.PutObjectOptions} opts
 */
function uploadFile2(client, ossPath, file, opts) {
  return client.put(ossPath, file, opts);
}

/**
 *
 * @param {MyOptions} option
 * @returns
 */
function main(option) {
  const client = new OssClient(option);

  return through.obj(function (file, enc, cb) {
    // if (file.isBuffer()) {
    //   var code = file.contents.toString("utf-8");
    //   code = replacePath(code, file.path, baseUrl, paths);
    //   file.contents = Buffer.from(code, 'utf-8');
    // } else if (file.isStream()) {
    //   var code = fs.readFileSync(file.path, "utf8");
    //   code = replacePath(code, file.path, baseUrl, paths);
    //   file.contents = Buffer.from(code, 'utf-8');
    // }

    if (file.isBuffer()) {
      const ossPath = getFileKey(file, option.prefix);
      const uploadFunc = option.ignoreExist ? uploadFile : uploadFile2;

      uploadFunc(client, ossPath, file, option.putOptions)
        .then(function () {
          cb(null, file);
        })
        .catch(function (err) {
          console.error('上传失败', err);
          cb(err, null);
        });
    } else if (file.isStream()) {
      // var code = fs.readFileSync(file.path, "utf8");
      // file.contents = Buffer.from(code, 'utf-8');
      cb(null, file);
    } else {
      cb(null, file);
    }
  });
}

module.exports = main;
