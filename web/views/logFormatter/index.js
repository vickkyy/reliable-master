/* ================================================================
 * reliable-master by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Nov 20 2015 17:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright zichen.zzc
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var EOL = require('os').EOL;
var Convert = require('ansi-to-html');

var screenshot = require('./screenshot');
var performance = require('./performance');

var perfFragments;
var convert = new Convert();

function handler(type, log) {
  if (typeof type !== 'string') {
    throw new TypeError('type must be string.');
  }
  if (typeof log !== 'string') {
    throw new TypeError('log must be string.');
  }
  type = type.trim().toLowerCase();
  log = log.trim();
  switch (type) {
    case 'screenshot':
      return screenshot(log);
      break;
    case 'performance':
      perfFragments += performance(log);
      return ' ';
      break;
    default:
      return '';
  }
}

function hasPerformanceData(logs) {
  var perfPattern = /\<\# performance[\s\S]*\#\>/g;
  return perfPattern.test(logs);
}

function beautify(logs) {
  return convert.toHtml(logs).replace(/\n+/g, '\n\n');
}

function format(logs) {
  logs = beautify(logs);
  var pattern = /\<\#([\s\S]*?)\#\>/g;
  perfFragments = hasPerformanceData(logs) ? EOL + '<p>Performance Table:</p>' : '';
  return logs.replace(pattern, function(matchStr, identifyStr) {
    var arr = identifyStr.split('|');
    var type = arr[0];
    var log = arr[1];
    if (type && log) {
      var res = handler(type, log);
      if (res) {
        return res;
      }
    }
    return matchStr;
  }) + perfFragments;
}

module.exports = format;
