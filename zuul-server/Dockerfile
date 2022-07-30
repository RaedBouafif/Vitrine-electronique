FROM openjdk:8
VOLUME /tmp
ADD wait-for-it.sh .
RUN ["chmod", "+x", "wait-for-it.sh"]
ADD zuul-server/target/zuul-server-0.0.1-SNAPSHOT.jar app.jar 
EXPOSE 9004
ENTRYPOINT ["./wait-for-it.sh", "market-eureka-service:8761", "--","java","-jar","app.jar"]