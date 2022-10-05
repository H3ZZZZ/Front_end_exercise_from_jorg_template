#!/usr/bin/env bash

PROJECT_NAME="html"
DROPLET_URL="frederikhess.dk"
echo -n "please enter the project name as it appears on the server in /var/www/"
read -r 
PROJECT_NAME=$REPLY
echo -n "please enter the droplet url (e.g myserver.dk)"
read -r
DROPLET_URL=$REPLY

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$PROJECT_NAME