#!/bin/bash
IMG_MANGER="registry.cn-beijing.aliyuncs.com/xsd" #私有镜像地址
PROJECT_NAME="vue-dev"
PROJECT_VERSION="4.0"

sudo docker build -t $IMG_MANGER/$PROJECT_NAME:$PROJECT_VERSION .
IMAGE_ID=`docker images|grep -i $IMG_MANGER/$PROJECT_NAME | awk '{print $3}'`
echo $IMAGE_ID
sudo docker tag $IMAGE_ID $IMG_MANGER/$PROJECT_NAME:$PROJECT_VERSION
sudo docker push $IMG_MANGER/$PROJECT_NAME:$PROJECT_VERSION
docker rmi $IMAGE_ID
curl https://cs.console.aliyun.com/hook/trigger\?triggerUrl\=Y2MxYWI4NjI0MGNjNjRiYjNiOTZhYzYzNmQxYTU3YWY2fHN5dGVzdHxyZWRlcGxveXwxYmh1cnRkanM0YnIwfA\=\=\&secret\=456771346b324e55655770514c384f49f032c6f203bff38ab2453001c9dd7dfd
