#!/bin/bash
# 配置
AccessKeyId=""
AccessKeySecret=""
BucketName=""
Host="${BucketName}.oss-xx-xxxx.aliyuncs.com"

# 需上传的文件（绝对路径）
file=$1
# 需上传的key（oss上的存放路径，包含自身文件名）
key=$2

# 判断是否传参
if [ -z "$file" ] || [ -z "$key" ]; then
    printf "\n%s\n\n" "帮助"
    printf " %-10s %-20s\n" "第一个参数" "需上传文件绝对路径"
    printf " %-10s %-20s\n\n" "" "如：/d/items/test/pic.jpg"
    printf " %-10s %-20s\n" "第二个参数" "上传到oss的存放路径（从bucket根目录→上传文件名）"
    printf " %-10s %-20s\n\n" "" "如：test/pic.jpg"
    printf "\n\n\t%s\n" "例子：./oss.sh /d/items/test/pic.jpg test/pic.jp"
    exit 0
fi
printf "\n %s \n\n" "Start to upload files(${file}) to oss(/${BucketName}/${key})"
# 当前时间
DateValue=$(env LANG=en_US.UTF-8 date -u "+%a, %d %b %Y %T GMT")
# 请求数据类型
ContentType="application/octet-stream"
# 路径
Resource="/${BucketName}/${key}"
# 字符串
StringToSign="PUT\n\n${ContentType}\n${DateValue}\n${Resource}"
# 加密
Sign=$(echo -en "${StringToSign}" | openssl sha1 -hmac ${AccessKeySecret} -binary | base64)
# 开始请求
Result=$(curl -i -q -X PUT -T "${file}" \
    -H "Host: ${Host}" \
    -H "Date: ${DateValue}" \
    -H "Content-Type: ${ContentType}" \
    -H "Authorization: OSS ${AccessKeyId}:${Sign}" \
    -H "Accept: */*" \
    "https://${Host}/${key}")
echo "${Result}"
printf "\n %s \n" "The end!"
echo "Press any key to exit!"
read -rn 1
exit 0