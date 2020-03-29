#!/usr/bin/env node

const yargs = require('yargs');
const util = require('util');
const fs = require('fs');
const CCTransform = require('./utils/transformer');
const stream = require('stream');
const validator =require('./utils/validator');

const pipeline = util.promisify(stream.pipeline);

yargs
  .usage('Usage: -s <shift>')
  .option('s', {
    alias: 'shift',
    describe: 'a shift',
    type: 'number',
    demandOption: true
  })
  .option('i', {
    alias: 'input',
    describe: 'an input file',
    type: 'string',
    demandOption: false
  })
  .option('o', {
    alias: 'output',
    describe: 'an output file',
    type: 'string',
    demandOption: false
  })
  .option('a', {
    alias: 'action',
    describe: 'an action encode/decode',
    type: 'string',
    demandOption: true
  });

  process.on('exit', code => process.stdout.write(`Code: ${code}`));
  process.on('SIGINT', _ => { process.exit(0); });

(async _ => {
  const { shift, input, output, action } = yargs.argv;
  if(!validator.isIntNumber(shift)){
    process.stderr.write(`Shift must be integer!\n`);
    process.exit(1);
  }
  if(!validator.isIn(action, ['encode','decode'])){
    process.stderr.write(`Action must be "encode" or "decode"\n`);
    process.exit(1);
  }
  validator.isEmpty(input) && process.stdout.write('Enter the text and press ENTER to encode/decode(press CTRL + C to exit):')
  const ReadableStream = !validator.isEmpty(input) ? fs.createReadStream(input) : process.stdin;
  const WriteableStream = !validator.isEmpty(output)
    ? fs.createWriteStream(output)
    : process.stdout;
  try {
    await pipeline(
      ReadableStream,
      new CCTransform(shift, action),
      WriteableStream
    );
    process.stdout.write(`Text ${action}d\n`);
  } catch (e) {
    process.stderr.write(` ${e.message}\n`);
    process.exit(1);
  }
})();

