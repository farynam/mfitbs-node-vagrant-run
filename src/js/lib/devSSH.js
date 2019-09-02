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