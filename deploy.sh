git pull
docker build -t yundun-fe-service .

docker stop yundun-fe-service
docker rm yundun-fe-service

docker run -d \
  --name yundun-fe-service \
  -e TZ="Asia/Shanghai" \
  -p 9100:80 \
  --restart always \
  yundun-fe-service
