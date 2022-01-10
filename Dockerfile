FROM node:14

WORKDIR /home/node/app

# copy into the working directory we just created
COPY app .
RUN npm install
CMD npm run start

EXPOSE 8000