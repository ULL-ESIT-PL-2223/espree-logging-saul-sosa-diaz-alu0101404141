//Lamadas recursivas
const a = function (n) {
  if (n === 0) {
    return 1;
  } else {
    return n*a(n-1);
  }
}

a(5);
