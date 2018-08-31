cd /app/yundun-fe-service
git pull
docker build -t yundun-fe-service .

docker stop yundun-fe-service
docker rm yundun-fe-service

docker run -d \
  --name yundun-fe-service \
  -e TZ="Asia/Shanghai" \
  -p 9100:7001 \
  --mount type=bind,source=/app/config/yundun-fe-service,target=/app/config \
  --restart always \
  yundun-fe-service
