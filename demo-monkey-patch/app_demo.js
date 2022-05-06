const monModule = require("./module");
require('./monkey_patch')
console.log(monModule)
monModule.method()
monModule.method2()