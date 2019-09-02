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

const { series, src, dest } = require('gulp');
const { exec } = require('child_process');
const fs = require("fs");
const babel = require('gulp-babel');

const rootDir = "target/out";

function handleScripts() {
    return src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest(rootDir));
}

function handleResources() {
    return src(["./*",'!src/**',
        "!node_modules/**",
        "!target/**","!\.*",
        "!gulpfile.babel.js",
        "!jest.config.js",
        "!package-lock.json"
    ])
        .pipe(dest(rootDir));
}

function rmDir(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            let curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                rmDir(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}


function clean(cb) {
    rmDir(rootDir);
    cb();
}

function publish() {
     const run = exec("npm publish", {cwd : rootDir});

    run.stdout.setEncoding('utf8');
    run.stdout.on('data', console.log);
    run.stderr.setEncoding('utf8');
    run.stderr.on('data', console.error);

    return run;
}

exports.build = series(clean, handleScripts, handleResources);
exports.publish = publish;
exports.clean = clean;
exports.default = series(exports.build, publish);