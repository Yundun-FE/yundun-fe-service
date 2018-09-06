git pull
docker build -t yundun-fe-service .

docker stop yundun-fe-service
docker rm yundun-fe-service

docker run -d \
  --name yundun-fe-service \
  -e TZ="Asia/Shanghai" \
  -p 9100:80 \
  --mount type=bind,source=/home/kongfanbo/app/yundun-fe-service/config,target=/app/config \
  --restart always \
  yundun-fe-service
