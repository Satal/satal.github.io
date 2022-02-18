#! /bin/bash

docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app ruby:2.7 bundle install
docker-compose -f ./docker/docker-compose.build-image.yml build
