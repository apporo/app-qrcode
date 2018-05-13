'use strict';

var Buffer = global.Buffer || require('buffer').Buffer;

function Misc() {
  this.stringify = function (data) {
    return typeof data === 'string' ? data : JSON.stringify(data);
  };
  this.bufferify = function (data) {
    return data instanceof Buffer ? data : new Buffer(this.stringify(data));
  };
}

module.exports = new Misc();
