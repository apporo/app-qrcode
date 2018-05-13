'use strict';

const Devebot = require('devebot');
const chores = Devebot.require('chores');
const lodash = Devebot.require('lodash');
const Writable = require('stream').Writable;
const qr = require('qr-image');
const through2 = require('through2');
const misc = require('../toolkits/util');

function QrcodeService(params) {
  params = params || {};

  let self = this;
  let LX = params.loggingFactory.getLogger();
  let TR = params.loggingFactory.getTracer();
  let packageName = params.packageName || 'app-qrcode';
  let blockRef = chores.getBlockRef(__filename, packageName);

  LX.has('silly') && LX.log('silly', TR.toMessage({
    tags: [ blockRef, 'constructor-begin' ],
    text: ' + constructor start ...'
  }));

  let pluginCfg = params.sandboxConfig;
  this.generate = function(opts, inputData, outputStream) {
    opts = opts || {};
    return new Promise(function(onResolved, onRejected) {
      if (outputStream instanceof Writable) {
        var qrStream = qr.image(misc.stringify(inputData), { type: 'svg' });
        qrStream
          .pipe(outputStream)
          .on('error', onRejected)
          .on('finish', onResolved);
      } else {
        onResolved(qr.imageSync(misc.stringify(inputData), { type: 'svg' }));
      }
    });
  }

  LX.has('silly') && LX.log('silly', TR.toMessage({
    tags: [ blockRef, 'constructor-end' ],
    text: ' - constructor end!'
  }));
};

module.exports = QrcodeService;
