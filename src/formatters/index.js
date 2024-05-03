import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatters = {
  plain: formatPlain,
  stylish: formatStylish,
  // Se necesita deducir (con la ayuda de consejos) que nuestro árbol interno
  // es la mejor representación para el procesamiento por máquina
  json: JSON.stringify,
};

// Hacia el exterior, debemos exponer funciones en lugar de estructuras de datos (formateadores)
export default (ast, type) => {
  const format = formatters[type];
  if (!format) {
    // El manejo de errores no es obligatorio
    throw new Error(`Unknown format '${type}'`);
  }
  return format(ast);
};
