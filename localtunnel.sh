#!/bin/bash 
until lt --port 8080 --subdomain $(grep LOCAL_TUNNEL_SUBDOMAIN .env | cut -d '=' -f 2-)
do
  echo "Try again"
done
