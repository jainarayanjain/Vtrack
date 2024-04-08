FROM node:18-bullseye-slim

LABEL maintainer="Sumit Sharma <sumit.sharma@acsicorp.com>"

WORKDIR /vtrack

COPY ./package*.json /vtrack/

RUN npm ci --location=project
