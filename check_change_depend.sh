#!/bin/bash
# 检查 Web 项目的更改依赖

function start() {
    echo -e "\033[32m[+] $1\033[0m"    
}

function end() {
    echo -e "\033[32m[✔︎] $1\033[0m"    
}

function find_out_master() {
    echo -e "\033[34m[-] $1\033[0m"
}

function find_out_children() {
    echo -e  "  \033[31m\033[01m[x] $1\033[0m"
}

function to_index() {
    # 传入path, 判断是否存在index.vue, 如果存在, 返回index.vue, 不存在, 查找是否包含xx.vue, 包含返回 xxx.vue 否则 返回 xxx
    ls $1/index.vue > /dev/null 2>&1 && \
    echo $1/index.vue || \
    (ls $1.vue > /dev/null 2>&1 && \
    echo $1.vue || \
    echo $1)
}
# 查询更改
start 'Read Git Changes...'
row_git_list=`git status --short | awk '{print $2}'`

#构建文件列表
start 'Build Files List...'
all_list=`find ./src -type f`
home_page=`pwd`

# 使更改正常
# echo $row_git_list | while read git_change
start 'Find depend...'
time for git_change in $row_git_list
do
    # 最短依赖名称
    change=`to_index $git_change`
    find_out_master "`realpath $change`"

    for file_path in $all_list
    do
        # 单个文件的依赖项目
        target=`cat $file_path | grep 'import' | grep 'from' | grep -v '//' 2>/dev/null | awk '{print $4}' | sed "s/'//g" `

        for com in $target
        do
            # $com 是import xxx from '$com'
            echo $com | grep '@' > /dev/null && \
            # 是否包含依赖, 带 @ 的为绝对路径
            depend_path=`echo $com | sed "s/@/src/g"` || \
            # 相对路径
            depend_path=`echo $file_path | awk -F '/' 'OFS="/"{$NF="";print}'`/$com
            
            to_index `realpath $depend_path` | grep $change > /dev/null && find_out_children $file_path

        done
    done
done

end 'Dependency analysis completed.'
