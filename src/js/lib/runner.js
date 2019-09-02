require("@babel/polyfill");
require("@babel/register");

module.exports = {
        addModule : require("./addModule"),
        devSSH : require("./devSSH"),
        sync : require("./sync")
    };

