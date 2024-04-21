const { program } = require('commander');
import genDiff from '../index';

program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2, program.opts().format));
  })
  .parse(process.argv);
