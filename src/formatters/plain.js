const getPropertyName = (property, parents) => [...parents, property].join('.');
const stringify = (value) => {
  if (value === null) {
    return value;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  // El tipo de resultado siempre debe ser una cadena de texto.
  return String(value);
};

// Las cadenas están ubicadas en un solo lugar. La estructura y el resultado son visibles de inmediato.
// No hay intento de eliminar completamente la duplicación (por ejemplo, la palabra "Property").
const mapping = {
  // Si el formateador está construido con un switch case, en todas partes se devolverán cadenas, y en
  // "unchanged" - null, como indicador de la falta de valor.
  unchanged: () => [],
  root: ({ children }, path, iter) => children.flatMap((node) => iter(node, path, iter)),
  nested: ({ key, children }, path, iter) => children.flatMap((node) => iter(node, [...path, key])),
  added: (node, path) => `Property '${getPropertyName(node.key, path)}' was added with value: ${stringify(node.value)}`,
  deleted: (node, path) => `Property '${getPropertyName(node.key, path)}' was removed`,
  changed: ({ key, value1, value2 }, path) => {
    const name = getPropertyName(key, path);
    return `Property '${name}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
  },
};

// La función debe exponer solo la interfaz que espera el cliente
const renderPlain = (ast) => {
  // La construcción de cadenas a través de un array + join
  // La implementación puede ser a través de switch
  const iter = (node, currentPath) => mapping[node.type](node, currentPath, iter);
  return iter(ast, []).join('\n');
};

export default renderPlain;
