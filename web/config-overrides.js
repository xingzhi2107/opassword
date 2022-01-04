const fs = require('fs');
const path = require('path');
const {override, babelInclude} = require('customize-cra');

function setupAlias(config, env) {
  config.resolve.alias['xxx$'] = 'xxx-path';
}

function setupS3Upload(config, env) {
  if (env !== 'production') {
    return;
  }
  const S3Plugin = require('webpack-s3-plugin');
  let exclude = /.*\.map$/;
  const s3plugin = new S3Plugin({
    directory: './build/',
    exclude,
    s3Options: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    },
    s3UploadOptions: {
      basePath: '/aster/registry',
      Bucket: process.env.REACT_APP_S3_BUCKET,
      ServerSideEncryption: 'AES256',
      CacheControl(fileName) {
        if (/\.html/.test(fileName) || /\.json/.test(fileName)) {
          return 'no-cache, no-transform, public';
        } else {
          return 'max-age=315360000, no-transform, public';
        }
      },
    },
    basePath: '/aster/registry',
  });

  config.plugins.push(s3plugin);
}

function setupBundleAnalyzer (config, env) {
  if (process.env.REACT_APP_BUNDLE_ANALYZE_MODE !== '1') {
    return;
  }
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  config.plugins.push(new BundleAnalyzerPlugin());
}

function fixRNCalendarModule(config, env) {
  override(
    babelInclude([
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules/react-native-calendar'),
      path.resolve(__dirname, 'node_modules/react-native-swipe-gestures'),
    ]),
  )(config, env);
}

module.exports = (config, env) => {
  // 各类覆盖webpack的例子
  // setupAlias(config, env);
  // setupS3Upload(config, env);
  // setupBundleAnalyzer(config, env);
  // fixRNCalendarModule(config, env);

  if (env === 'development') {
    const log = {
      config,
      env: process.env,
    };
    fs.writeFileSync('./webpack-config-val.log', JSON.stringify(log, null, 4));
  }

  return config;
};
