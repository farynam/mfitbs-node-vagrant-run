/*
 * *
 *  * Copyright 2019 Marcin Faryna. All rights reserved.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

const utils = require('../util/util.js');

const REMOTE_USER="vagrant";
const REMOTE_ADDR="127.0.0.1";
const REMOTE_PATH="/vagrant";
const SSH_PRIVATE_KEY=".vagrant/machines/default/virtualbox/private_key";

module.exports = (async function () {
    const REMOTE_PORT=(await utils.ex("vagrant port | grep 22| cut -f 8 -d ' '")).replace(/\r?\n|\r/g, "");

    let args = process.argv[2];


    let save = "";
    if (!args) {
        args = await utils.readLine("Module name>");
        console.log(args);
        if (args) {
            save = "--save";
            if ((await utils.readLine("Save dev(n)>" )) === "y") {
                save = "--save-dev";
                console.log("y");
            }
        }
    }

    await utils.ex(`npm i ${args} ${save}`);
    await utils.exssh(`npm i ${args} ${save}`,
        {
            remote_user: REMOTE_USER,
            remote_addr : REMOTE_ADDR,
            remote_path : REMOTE_PATH,
            remote_port : REMOTE_PORT,
            ssh_private_key : SSH_PRIVATE_KEY
    });

    await utils.rsyncToLocal({
        remote_user: REMOTE_USER,
        remote_addr : REMOTE_ADDR,
        remote_path : `${REMOTE_PATH}/node_modules/`,
        local_path : "./node_modules/",
        remote_port : REMOTE_PORT,
        ssh_private_key : SSH_PRIVATE_KEY
    });
});