import {ArgsParser} from "mfitbs-js-utils/utils/ArgsParser";
import {exec} from "child_process";
import {readline} from "readline";


const SSH_OPTS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o LogLevel=ERROR -o IdentitiesOnly=yes";

export function ex(cmd) {
    return new Promise((resolve, reject) => {
        const run = exec(cmd, {maxBuffer: 1024 * 1024}, (error, stdout, stderr) => {

            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });

        run.stdout.setEncoding('utf8');
        run.stdout.on('data', console.log);
        run.stderr.setEncoding('utf8');
        run.stderr.on('data', console.error);
    });
}

export function readLine(promptMessage) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let pr = new Promise((resolve, reject) => {
        rl.question(promptMessage, (answer) => {
            resolve(answer);
        });
    });

    pr.then(function(value){
        rl.close();
    });

    return pr;
}

export function exssh(cmd, options, ...args) {
    let env = "";

    const argsParser = new ArgsParser(args);
    const parsedArgs = argsParser.args;

    console.log("ENV:");
    if (Object.keys(parsedArgs).length > 1) {
        for (let [k,v] of Object.entries(parsedArgs)) {
            if (k === "unnamed") {
                continue;
            }
            console.log(`${k}=${v}`);
            env = `${env};export ${k}=${v}`;
        }
    }

    parsedArgs.unnamed.forEach((arg) =>{
       cmd = `${cmd} ${arg}`;
    });




    const ssh_cmd = `ssh -p ${options.remote_port} ${SSH_OPTS} -i ${options.ssh_private_key}`;
    return ex(`${ssh_cmd} ${options.remote_user}@${options.remote_addr} 'bash -l -c "cd ${options.remote_path}${env};${cmd}"'`);
}

export function rsyncToLocal(options) {
    const ssh_cmd = `ssh -p ${options.remote_port} ${SSH_OPTS} -i ${options.ssh_private_key}`;
    return ex(`rsync -rav -e "${ssh_cmd}" ${options.remote_user}@${options.remote_addr}:${options.remote_path} ${options.local_path}`);
}

export function rsyncToRemote(options) {
    const ssh_cmd = `ssh -p ${options.remote_port} ${SSH_OPTS} -i ${options.ssh_private_key}`;
    return ex(`rsync -rav -e "${ssh_cmd}" ${options.local_path} ${options.remote_user}@${options.remote_addr}:${options.remote_path}`);
};
