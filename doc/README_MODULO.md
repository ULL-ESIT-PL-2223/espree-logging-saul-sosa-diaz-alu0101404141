<a name="module_transpiler"></a>

## transpiler
Módulo que contiene funciones para transpilar código fuente.


* [transpiler](#module_transpiler)
    * _static_
        * [.transpile(inputFile, [outputFile])](#module_transpiler.transpile)
    * _inner_
        * [~addLogging(code)](#module_transpiler..addLogging) ⇒ <code>string</code>
        * [~addBeforeCode(node)](#module_transpiler..addBeforeCode) ⇒ <code>void</code>

<a name="module_transpiler.transpile"></a>

### transpiler.transpile(inputFile, [outputFile])
Transpila el archivo de entrada agregando registro de eventos y escribe el resultado en un archivo de salida o lo imprime en la consola.

**Kind**: static method of [<code>transpiler</code>](#module_transpiler)  

| Param | Type | Description |
| --- | --- | --- |
| inputFile | <code>string</code> | La ruta del archivo de entrada. |
| [outputFile] | <code>string</code> | La ruta del archivo de salida. Si no se especifica, el resultado se imprime en la consola. |

<a name="module_transpiler..addLogging"></a>

### transpiler~addLogging(code) ⇒ <code>string</code>
Agrega registro de eventos al código proporcionado y devuelve el código modificado.

**Kind**: inner method of [<code>transpiler</code>](#module_transpiler)  
**Returns**: <code>string</code> - El código modificado con el registro de eventos.  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | El código al que se le agregará el registro de eventos. |

<a name="module_transpiler..addBeforeCode"></a>

### transpiler~addBeforeCode(node) ⇒ <code>void</code>
**Kind**: inner method of [<code>transpiler</code>](#module_transpiler)  
**Brief**: Agrega código de registro de eventos antes del código de la función especificada en el nodo.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | El nodo del árbol de análisis sintáctico que contiene la función a la que se le agregará el registro de eventos. |

