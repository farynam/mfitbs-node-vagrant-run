const utils = require('../util/util.js');

const REMOTE_USER="vagrant";
const REMOTE_ADDR="127.0.0.1";
const REMOTE_PATH="/vagrant";
const SSH_PRIVATE_KEY=".vagrant/machines/default/virtualbox/private_key";



// d1/d2/somescript.js -env1=var1 -env2=var2 -env3=var3
module.exports = (async function () {
    const REMOTE_PORT=(await utils.ex("vagrant port | grep 22| cut -f 8 -d ' '")).replace(/\r?\n|\r/g, "");
    const cmdArgs = process.argv.reduce((acc, curr, currentIndex) =>{
        if (currentIndex > 1) {
            acc.push(curr);
        }
        return acc;
    }, []);

    utils.exssh(`node src/js/lib/dev.js`, {
        remote_user: REMOTE_USER,
        remote_addr : REMOTE_ADDR,
        remote_path : REMOTE_PATH,
        remote_port : REMOTE_PORT,
        ssh_private_key : SSH_PRIVATE_KEY,
    }, ...cmdArgs);
});