# Assignments
## Live site
https://jingyuyao-webdev-1.herokuapp.com/

## Assignment 1 - jQuery
- Spring Boot service: `src/main/java/com/jingyuyao/webdev1`
- jQuery client: `src/main/resources/static/jquery`

## Assignment 2 - React
- Spring Boot service: `src/main/java/com/jingyuyao/webdev1`
- React client: `src/main/js/react`, `src/main/resources/static/react`

# Development
## Intellij Idea CE
Create an `Application` run configuration with the database environment variables set.
Point to `com.jingyuyao.webdev1.Assignment` as the main class and use `webdev-1` as the module path.
Enable `Build Project Automatically` in Compiler settings.
Mark `src/main/js` folder as a `Sources Root` in the project view (so changes to JS files will also
trigger a rebuild).
After starting the application, invoke `./webpack_watch.sh` to re-compile frontend file changes.
