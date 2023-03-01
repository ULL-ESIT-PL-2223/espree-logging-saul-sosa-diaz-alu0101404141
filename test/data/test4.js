//Comprobar la entrada sin parámetros de las funciones.
const constructSentence = function () {
  const argv_str = process.argv.slice(2);
  let result = '';
  for (let i = 0; i < argv_str.length; i++) {
    result += argv_str[i];
  }
  if (result.slice(-1) !== '.') { // Check if the last character is a .
    throw 'El último caracter no era un (.).';
  } else {
    return result;
  }
};

function main() {
  try {
    const stringToCount = constructSentence();
    console.log(countNumberOfA(stringToCount));
  } catch (err) {
    console.log(err);
  }
}

main();