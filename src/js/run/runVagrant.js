const RAMDISK_NAME="RAMDisk";
const RAMDISK_SIZE="2097152";

const run = require("../lib/runner");

run.sync({
    ramDiskName : RAMDISK_NAME,
    ramDiskSize : RAMDISK_SIZE
});
