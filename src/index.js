import fs from 'fs';
import path from 'path';

import format from './formatters/index.js';

import parse from './parsers.js';

import buildTree from './treeBuilder.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const extractFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

const genDiff = (path1, path2, formatName = 'stylish') => {






  const data1 = getData(buildFullPath(path1));
  const data2 = getData(buildFullPath(path2));

  const internalTree = buildTree(data1, data2);

  return format(internalTree, formatName);
};

export default genDiff;
