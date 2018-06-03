# Assignments
## Live site
https://jingyuyao-webdev-1.herokuapp.com/

## Assignment 1 - jQuery
- Spring Boot service: `src/main/java/com/jingyuyao/webdev1`
- jQuery client: `src/main/resources/static/jquery`

## Assignment 2 - React
- Spring Boot service: `src/main/java/com/jingyuyao/webdev1`
- React client: `src/main/js/react`, `src/main/resources/static/react`

## Assignment 3 - React + Redux
- Spring Boot service: `src/main/java/com/jingyuyao/webdev1`
- React client: `src/main/js/react`, `src/main/resources/static/react`

## Assignment 4 - React Native
- Spring Boot service: `src/main/java/com/jingyuyao/webdev1`
- React Native client: https://github.com/jingyuyao/webdev-1-native

# Deployment
```./mvnw spring-boot:run```

# Development
## Intellij Idea CE
Create an `Application` run configuration with the database environment variables set.
Point to `com.jingyuyao.webdev1.Assignment` as the main class and use `webdev-1` as the module path.
After starting the application, invoke `./webpack_watch.sh` to re-compile frontend file changes.
The project needs to be manually re-built using the `Build Project (Ctrl+F9)` command for the
changes to take effect on the running server.
