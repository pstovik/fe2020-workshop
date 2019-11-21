# Part1

## motivation
- on the simple game demonstrates basic skills and core web development technologies (static HTML/CSS/JS website)
- goal is to learn the "game domain"

## how this repo was created
- the starting point of raw HTML development https://html5boilerplate.com/ (version 7.2.0), extracted into `web` directory
- installed simple webserver [node-static](https://www.npmjs.com/package/node-static)
    - as dev dependency into package.json
    - can be run via npm script `npm start`
- .gitignore configured to not version `node_modules`

## how to use this repo
- `npm i` to install dev/dependencies
- `npm start` to run the static server
- open url [http://127.0.0.1:8080], should show boilerplate page
