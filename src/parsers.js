import yaml from 'js-yaml';

// Aquí no hay nada más que datos y sus tipos. El parser analiza los datos, no los archivos
// No hay ninguna indicación sobre el sistema de archivos, lectura de archivos o extensiones
// El parsing trabaja con tipos de datos, no con extensiones
const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

// Deberíamos exponer funciones hacia afuera, no estructuras de datos (formatters)
// Se proporciona el tipo de datos y los propios datos como entrada. ¡Nada acerca de archivos!
export default (data, format) => parsers[format](data);
