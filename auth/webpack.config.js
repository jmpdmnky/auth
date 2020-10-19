/* originally based on https://medium.com/js-dojo/how-to-configure-webpack-4-with-vuejs-a-complete-guide-209e943c4772 */

'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
    module.exports = require('./config/webpack.config.dev');
} else {
    module.exports = require('./config/webpack.config.prod');
}
