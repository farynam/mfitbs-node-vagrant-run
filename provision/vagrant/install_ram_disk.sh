#!/bin/bash
set -e

RAMDISK_NAME="RAMDisk";
RAMDISK_SIZE="2048M";

RAMDISK_PATH="/mnt/${RAMDISK_NAME}"

TARGET="/vagrant/target"

if [ ! -d "${RAMDISK_PATH}" ]; then
    mkdir ${RAMDISK_PATH}
    echo "tmpfs       ${RAMDISK_PATH} tmpfs   nodev,nosuid,noexec,nodiratime,size=${RAMDISK_SIZE}   0 0" >> /etc/fstab
fi

chown vagrant ${RAMDISK_PATH}


if [ ! -d "${TARGET}" ]; then
    ln -s ${RAMDISK_PATH} ${TARGET}
    chown vagrant ${TARGET}
fi

reboot

