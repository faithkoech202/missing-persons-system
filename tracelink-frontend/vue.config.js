const { defineConfig } = require('@vue/cli-service');

module.exports = {
  pwa: {
    name: 'TraceLink',
    themeColor: '#00509e',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      short_name: 'TraceLink',
      start_url: '.',
      display: 'standalone',
      background_color: '#ffffff'
    }
  }
};
