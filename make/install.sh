docker-compose -f ./docker-compose.yml -f ./docker-compose.install.yml up -d
sleep 2s
i=$(docker ps -f "name=^make_code" | grep 'seconds ago' | awk '{print $1}')
docker exec -it $i npx create-react-app temp-app
# docker exec -it $i mv -v /usr/code/temp-app/* /usr/code/
# docker exec -it $i rm -r temp-app
