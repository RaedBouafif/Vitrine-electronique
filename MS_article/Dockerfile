FROM node:10
ADD package.json /app/
WORKDIR /app/
RUN npm install
ADD . /app
EXPOSE 4001 
VOLUME app/log
ADD wait-for-it.sh .
RUN ["chmod", "+x", "wait-for-it.sh"]
ENTRYPOINT ["./wait-for-it.sh", "market-eureka-service:8761", "--", "node" ]
CMD [ "src/app.js" ]
