require("@babel/polyfill");
require("@babel/register")({
    // Array of ignore conditions, either a regex or a function. (Optional)
    // File paths that match any condition are not compiled.
    //ignore: pack.babel.ignore,
    cache : true
});

console.log(`Node:${process.argv[0]}`);
console.log(`Executing:${process.cwd()}/${process.argv[2]}`);
require(`${process.cwd()}/${process.argv[2]}`);



