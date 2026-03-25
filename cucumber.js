module.exports = {
  default: {
    require: ['features/support/*.js', 'features/step_definitions/*.js'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    formatOptions: { snippetInterface: 'async-await' },
  },
};
