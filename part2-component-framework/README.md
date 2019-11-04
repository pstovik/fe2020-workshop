# Part2

## how this repo was created
- used bobril-build configuration TODO (bobril.com/example/package.json)
    - ? with / without tslint configured
- .gitignore configured to not version `node_modules`

## how to use this repo
- `npm i` to install dev/dependencies
- `npm run watch` to run bobril-build stack (TODO link)
    - open url [http://localhost:8080], should show application
    - open url [http://localhost:8080/bb], should show "unit test" report of bobril build
- game board state can be changed by url hash modification
    - default game http://localhost:8080/
    - circle game http://localhost:8080/#B-180_S-0_B-270_S-90_E-0_S-90_B-90_S-0_B-0
    - win count, loss count can be also passed http://localhost:8080/#B-180_S-0_B-0_S-0_E-0_S-90_B-90_S-0_B-0_W-8_L-20