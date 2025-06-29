const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: 'TraceLink',
    themeColor: '#003366',
    manifestOptions: {
      short_name: 'TraceLink',
      start_url: '.',
      display: 'standalone',
      background_color: '#ffffff'
    },
    workboxPluginMode: 'GenerateSW'
  }
});
