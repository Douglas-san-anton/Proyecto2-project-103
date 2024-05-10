import _ from 'lodash';

// Los espacios se forman según lo especificado en la tarea: 4 espacios por defecto
// Sin contar el marcador de 2 caracteres ('+ ', '- ', ' ').
const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

// Es importante resaltar correctamente esta función
const stringify = (data, depth, mapping) => {
  // guard expression
  if (!_.isObject(data)) {
    // El tipo de resultado siempre debe ser una cadena de texto.
    return String(data);
  }

  const output = Object.entries(data).map(
    ([key, value]) => mapping.unchanged({ key, value }, depth + 1));

  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

// El recorrido del árbol siempre debe ser en profundidad por un nivel (+1).
// No puede ser -1, +4, o descender por 4 espacios. '    '

const mapping = {
  root: ({ children }, depth, iter) => {
    const output = children.flatMap((node) => mapping[node.type](node, depth + 1, iter));
    return `{\n${output.join('\n')}\n}`;
  },
  nested: ({ key, children }, depth, iter) => {
    const output = children.flatMap((node) => mapping[node.type](node, depth + 1, iter));
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
  },
  added: (node, depth) => `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, mapping)}`,
  deleted: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, mapping)}`,
  unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, mapping)}`,
  changed: (node, depth) => {
    const { key, value1, value2 } = node;

    const data1 = `${indent(depth)}- ${key}: ${stringify(value1, depth, mapping)}`;
    const data2 = `${indent(depth)}+ ${key}: ${stringify(value2, depth, mapping)}`;

    return [data1, data2];
  },
};

// La función debe exponer solo la interfaz que espera el cliente.
const renderTree = (ast) => {
  const iter = (node, depth) => mapping[node.type](node, depth, iter);
  return iter(ast, 0);
};

export default renderTree;
