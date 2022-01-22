#!/bin/bash
#deploy todo app into an docker images
#remove exist images => build new images

docker rmi todo
if [ ! -d /home/alex/todo ]
then
    echo "todo app not exist!"
else
    cd "/home/alex/todo"
    echo "work directory: $(pwd)"
fi
docker build -t todo .
docker images | grep todo