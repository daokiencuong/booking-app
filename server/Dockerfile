# Stage 1: Build app with Gradle
FROM gradle:7.6.2-jdk17 AS builder
WORKDIR /app

# Copy source code
COPY . .

# Build ứng dụng Spring Boot (tạo file jar trong build/libs)
RUN ./gradlew clean bootJar --no-daemon

# Stage 2: Run app
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy jar từ builder
COPY --from=builder /app/build/libs/*.jar app.jar

# Chạy Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]

# Expose port (Spring Boot default: 8080)
EXPOSE 8080
