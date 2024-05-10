#!/usr/bin/env node

import { program } from 'commander';

import genDiff from '../index.js';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((path1, path2) => {
    // El código de llamada está dentro de la acción
    // La salida en pantalla ocurre aquí, no dentro de la biblioteca
    console.log(genDiff(path1, path2, program.opts().format));
  })
  .parse(process.argv);
