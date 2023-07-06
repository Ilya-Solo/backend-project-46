#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from './src/gendiff.js';
const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((path1, path2) => console.log(gendiff(path1, path2)));

program.parse();