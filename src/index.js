import fs from 'fs';
import path from 'path';
// Función para seleccionar el formateador en formatters/index.js. Este es una fachada.
import format from './formatters/index.js';
// El análisis lo movemos a un módulo separado
import parse from './parsers.js';
// La construcción de la representación interna en un módulo separado
import buildTree from './treeBuilder.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
// Tomamos el formato de los datos basado en la extensión del archivo
const extractFormat = (filepath) => path.extname(filepath).slice(1);
// Trabajamos con la fábrica de parsers
const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), extractFormat(filepath));

const genDiff = (path1, path2, formatName = 'stylish') => {
  // Proceso principal
  // => Leemos archivos y formato
  // => Analizamos los datos
  // => Construimos el árbol interno => Devolvemos los datos formateados
  // Aquí no puede haber nada más. El propio procesamiento se construye como un pipeline.

  const data1 = getData(buildFullPath(path1));
  const data2 = getData(buildFullPath(path2));

  const internalTree = buildTree(data1, data2);
  // Trabajamos con la fábrica de formateadores
  return format(internalTree, formatName);
};

export default genDiff;
