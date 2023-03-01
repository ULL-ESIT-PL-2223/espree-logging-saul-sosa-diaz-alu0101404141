/**
 * Este código exporta una función llamada addLogging que toma un argumento de code. La función hace lo siguiente:

Analiza el code utilizando la biblioteca espree y crea un árbol sintáctico abstracto (AST).
Utiliza la biblioteca estraverse para recorrer el AST y buscar funciones. Cuando encuentra una función, llama a la función addBeforeCode para agregar código de registro antes del cuerpo de la función.
Genera el código actualizado utilizando la biblioteca escodegen y lo devuelve.
La función addBeforeCode toma un nodo AST de una función y agrega código de registro al principio del cuerpo de la función. El código de registro se genera utilizando la información del nodo de la función, como el nombre de la función, los nombres de los parámetros y la línea en la que se encuentra la función en el archivo fuente. El código de registro se agrega al principio del cuerpo de la función utilizando el método concat() que hemos descrito anteriormente.

En resumen, la función addLogging se utiliza para agregar código de registro a las funciones de un archivo JavaScript utilizando AST. Esto puede ser útil para depurar y rastrear el flujo de ejecución de un programa.
 */

import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8');
  let output = addLogging(input);
  if (outputFile === undefined) {
    console.log(output);
    return;
  }
  await fs.writeFile(outputFile, output);
}

export function addLogging(code) {
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
