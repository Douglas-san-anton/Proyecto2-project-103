import _ from 'lodash';

// La forma correcta de verificar una clave en un objeto es mediante _.has
// El árbol no sabe nada sobre la salida y no puede preparar datos para ello
// El árbol describe la diferencia entre objetos (no visualmente)

// La forma correcta de construir un árbol es encontrar la unión de claves y realizar un único recorrido
// Cada nodo debe tener un tipo. Hay un total de 5 (por la cantidad de diferentes comportamientos posibles)
const buildDiff = (data1, data2) => {
  // Es fundamental que aquí se utilice la unión (y se realice la ordenación)
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  // Evitamos las mutaciones usando sortBy
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      // El tipo de nodo puede tener cualquier otro nombre
      // La clave con su valor puede llamarse value1/value2
      return { key, type: 'added', value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }

    // Los hijos existen solo cuando ambos valores son objetos, pero no arrays
    // @see https://lodash.com/docs/#isPlainObject
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      // Es importante que aquí se utilice hijos en lugar de "value"
      // "hijos" es parte de la estructura, "value" son simplemente los datos
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }
    // En una comparación simple, los arrays se compararían incorrectamente, por lo tanto, se utiliza isEqual.
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }

    return { key, type: 'unchanged', value: data2[key] };
    // La utilidad trabaja con dos archivos diferentes, no con uno en diferentes estados
    // Por lo tanto, aquí no puede haber "estados", "valores anteriores" o "nuevos" valores
  });

  return diff;
};

// El árbol puede ser representado por un array de arrays o por un objeto:
export default (data1, data2) => ({
  type: 'root',
  children: buildDiff(data1, data2),
});
