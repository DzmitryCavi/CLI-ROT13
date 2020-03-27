const { Transform } = require('stream');
const { encode, decode } = require('./utils.js');

class CCTransform extends Transform {
  constructor(shift, action) {
    super();
    this.shift = shift;
    this.action = action;
  }

  _transform(chunk, _, done) {
    let result = '';
    switch (this.action) {
      case 'encode':
        result = encode(chunk.toString('utf8'), this.shift);
        break;
      case 'decode':
        result = decode(chunk.toString('utf8'), this.shift);
        break;
      default:
        process.stderr.write(' Erorr: Action not found\n');
        process.exit(1);
    }

    this.push(result);
    done();
  }
}

module.exports = CCTransform;
