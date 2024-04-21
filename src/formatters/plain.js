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

  return String(value);
};

const mapping = {

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

const renderPlain = (ast) => {
  const iter = (node, currentPath) => mapping[node.type](node, currentPath, iter);
  return iter(ast, []).join('\n');
};

export default renderPlain;
