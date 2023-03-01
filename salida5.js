const a = function (n) {
    console.log(`Entering <anonymous function>(${ n }) at line 2`);
    if (n === 0) {
        return 1;
    } else {
        return n * a(n - 1);
    }
};
a(5);