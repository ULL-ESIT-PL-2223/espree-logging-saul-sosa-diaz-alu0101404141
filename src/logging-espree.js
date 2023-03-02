/**
 * Módulo que contiene funciones para transpilar código fuente.
 * @module transpiler
 */

import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

/**
 * Transpila el archivo de entrada agregando registro de eventos y escribe el resultado en un archivo de salida o lo imprime en la consola.
 * @async
 * @function
 * @param {string} inputFile - La ruta del archivo de entrada.
 * @param {string} [outputFile] - La ruta del archivo de salida. Si no se especifica, el resultado se imprime en la consola.
 */
export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8');
  console.log("input:\n" + input);
  let output = addLogging(input);
  if (outputFile === undefined) {
    console.log(output);
    return;
  }
  await fs.writeFile(outputFile, output);
  console.log("Output in file \'" + `${outputFile}`+"\'");
}

/**
 * Agrega registro de eventos al código proporcionado y devuelve el código modificado.
 * @function
 * @param {string} code - El código al que se le agregará el registro de eventos.
 * @returns {string} El código modificado con el registro de eventos.
 */
function addLogging(code) {
  const ast = espree.parse(code, {ecmaVersion: 12, loc: true});
  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (node.type === 'FunctionDeclaration' ||
          node.type === 'ArrowFunctionExpression' ||
          node.type === 'FunctionExpression') {
            addBeforeCode(node);
          }
    }
  })
  return escodegen.generate(ast);
}
 /**
  * @brief Agrega código de registro de eventos antes del código de la función especificada en el nodo.
  * @function
  * @param {Object} node - El nodo del árbol de análisis sintáctico que contiene la función a la que se le agregará el registro de eventos.
  * @returns {void} 
  */
function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>';
  let paramNames = '';
  if (node.params.length) {
    paramNames = "${" + node.params.map(param => param.name).join("}, ${") + "}";
  }
  const lineN = node.loc.start.line;
  const beforeCode = "console.log(`Entering " + name + "(" + paramNames + ") at line " + lineN + "`);";
  const beforeNodes = espree.parse(beforeCode, { ecmaVersion: 12 }).body;
  node.body.body = beforeNodes.concat(node.body.body);
}

