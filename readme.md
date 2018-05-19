# Live site
https://jingyuyao-webdev-1.herokuapp.com/

# Assignment 1 - jQuery
- Spring Boot service: `src/main/java/com/jingyuyao/webdev1`
- jQuery client: `src/main/resources/static/jquery`

# Development
## Intellij Idea CE
Create an `Application` run configuration with the database environment variables set.
Point to `com.jingyuyao.webdev1.Assignment` as the main class and use `webdev-1` as the module path.
After starting the application, invoke `./webpack_watch.sh` to re-compile frontend file changes.
The project needs to be manually re-built using the `Build Project (Ctrl+F9)` command for the
changes to take effect on the running server.
