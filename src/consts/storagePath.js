/**
 * storagePath.js
 */

const path = require('path')

exports.storagePath = path.resolve('data', 'todo')
exports.testStoragePath = path.resolve('data', 'todo.test')