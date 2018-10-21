# build:
#   docker build --force-rm -t lary/tennis-api .
# run:
#   docker run --rm --it --env-file=path/to/.env --name tennis-api -p 3001:3001 lary/tennis-api
#

FROM node:8.12.0-alpine
LABEL maintainer "songlairui@126.com"

ENV NODE_ENV production

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN yarn global add sequelize-cli
RUN yarn --production

EXPOSE 3001

CMD ["yarn", "start"]