FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY src/main .

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java","-jar","target/*.jar"]