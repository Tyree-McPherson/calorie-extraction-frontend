module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files:[
      "node_modules/@angular/core/testing",
      { pattern: './src/**/*.spec.ts' }
    ],
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    }
  });
};