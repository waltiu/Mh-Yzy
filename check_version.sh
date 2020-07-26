#!/bin/bash

# 检出当前分支版本, 构建类型

# 分支版本
lastCommit=''
lastCommitDate=''
currentBranch=''
BuildData=''
buildType=''

function getGitInfo() {
    info=`git log -1`
    lastCommit=`echo $info | grep -i commit | awk '{print $2}'`
    lastCommitDate=`echo $info | grep -i date`
    currentBranch=`git rev-parse --abbrev-ref HEAD`
}

# 参数 $1 目标文件地址
function formatDataToJs() {
    echo 'Write Version Info To '$1
    echo "var version = {
  buildGit: '$lastCommit',
  buildData: '`date`',
  buildType: '$buildType',
  currentBranch: '$currentBranch'
}

export default {
  version
    }" > $1
}

if [[ $1 == dev ]]; then
    buildType='测试版本'
fi

if [[ $1 == build ]]; then
    buildType='生产版本'
fi

getGitInfo
formatDataToJs "`pwd`/src/command/version.js"