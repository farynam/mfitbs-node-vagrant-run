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



