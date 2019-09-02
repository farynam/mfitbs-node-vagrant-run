import {ex} from '../util/util.js';
const fs = require("fs");



module.exports = async function sync(options) {
    process.on('SIGINT', function(code) {
        ex(`vagrant halt`);
        return console.log(`About to exit with code ${code}`);
    });

    const ramDiskRoot = `/Volumes/${options.ramDiskName}`;

    if (!fs.existsSync(ramDiskRoot)) {
        await ex(`diskutil erasevolume HFS+ "${options.ramDiskName}" \`hdiutil attach -nomount ram://${options.ramDiskSize}\``);
        await ex(`mkdir ${ramDiskRoot}/Cache`);
        await ex(`mkdir ${ramDiskRoot}/target`);
    }

    await ex(`vagrant up`);
    ex(`vagrant gatling-rsync-auto`);
};


