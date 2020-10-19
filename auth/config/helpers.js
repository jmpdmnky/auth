/* originally based on https://medium.com/js-dojo/how-to-configure-webpack-4-with-vuejs-a-complete-guide-209e943c4772 */

'use strict';

const path = require('path');

const _root = path.resolve(__dirname, '..');

exports.root = function (args) {
    args = Array.prototype.slice.call(arguments, 0);

    return path.join.apply(path, [ _root ].concat(args));
};

exports.assetsPath = function (_path) {
    return path.posix.join('static', _path);
};
