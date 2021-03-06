// mocha library itself, to have it set up on global
require('mocha/mocha.js');
// styles needed by the html reporter
require('!style-loader!css-loader!mocha/mocha.css');

// env variables injected via webpack.DefinePlugin
const ui = process.env.MOCHA_UI;
const reporter = process.env.MOCHA_REPORTER || 'spec';
const color = process.env.MOCHA_COLORS;
const timeout = process.env.MOCHA_TIMEOUT || 2000;

// html reporter needs a container
if (reporter === 'html') {
    const mochaContainer = document.createElement('div');
    mochaContainer.id = 'mocha';
    document.body.appendChild(mochaContainer);
}

mocha.setup({ ui, reporter, color, timeout });

const mochaStatus = {
    completed: 0,
    failed: 0,
    finished: false
};

// save test status on window to access it with puppeteer
window.mochaStatus = mochaStatus;

window.addEventListener('DOMContentLoaded', () => {
    mocha
        .run()
        .on('test end', () => mochaStatus.completed++)
        .on('fail', () => mochaStatus.failed++)
        .on('end', () => (mochaStatus.finished = true));
});
