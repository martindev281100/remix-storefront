/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const cloudflarePagesConfig = {
  serverBuildTarget: 'cloudflare-pages',
  server: './server-cloudflare-pages.js',
  ignoredRouteFiles: ['**/.*'],
};
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const netlifyConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
};
/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
const devConfig = {
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/build/',
  serverBuildDirectory: 'build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
};

const prodConfig = {
  appDirectory: './app',
  assetsBuildDirectory: './public/build',
  publicPath: './build/',
  serverBuildDirectory: './build',
  devServerPort: 8002,
  ignoredRouteFiles: ['.*'],
};

// module.exports = process.env.NODE_ENV === "production" ? prodConfig : devConfig

module.exports =
    process.env.NODE_ENV === 'development'
        ? devConfig
        : process.env.CF_PAGES
            ? cloudflarePagesConfig
            : netlifyConfig;