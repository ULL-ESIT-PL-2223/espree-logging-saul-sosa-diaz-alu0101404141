const constructSentence = function () {
  console.log(`Entering <anonymous function>() at line 2`);
  const argv_str = process.argv.slice(2);
  let result = '';
  for (let i = 0; i < argv_str.length; i++) {
    result += argv_str[i];
  }
  if (result.slice(-1) !== '.') {
    throw 'El último caracter no era un (.).';
  } else {
    return result;
  }
};
function main() {
  console.log(`Entering main() at line 15`);
  try {
    const stringToCount = constructSentence();
    console.log(countNumberOfA(stringToCount));
  } catch (err) {
    console.log(err);
  }
}
main();