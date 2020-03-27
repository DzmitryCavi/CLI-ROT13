#!/usr/bin/env node

const yargs = require('yargs');
const util = require('util');
const fs = require('fs');
const CCTransform = require('./utils/transformer');
const stream = require('stream');

const pipeline = util.promisify(stream.pipeline);

process.on('exit', code => {console.log(`\nCode: ${code}`)});

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

(async _ => {
  const { shift, input, output, action } = yargs.argv;
  const ReadableStream = input ? fs.createReadStream(input) : process.stdin;
  const WriteableStream = output
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

