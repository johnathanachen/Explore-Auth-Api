<p align="center">
  <a href="http://docs.fitii.fit"><img src="http://www.nancywudesign.com/sites/default/files/styles/front_page_thumbnail/public/GregBlue_LOGO_2c_940.png?itok=lMBvwrWn" width="300" alt="Fitii"></a>
  <br>
  <a href="#"><img src="https://img.shields.io/badge/npm-v1.4.5-42b983.svg" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="#"><img src="https://travis-ci.org/johnathanachen/Fitii.svg?branch=master" alt="Travis CI"></a>
</p>

A custom API on Node using Express and connect to Mongo DB using Mongoose.

> Refer `package.json`'s ***dependencies*** and ***devDependencies*** to see the npm packages and versions used.

### Important Files and Folders

|File/Folder|Description|
|-----------|-----------|
|**index.html**| The main file|
|**server**| Express Server|
|**mongoose**| Folder related to Mongoose(mongodb) *Schema* and *Model*|
|**graphql**| GraphQL’s logic |
|**graphql/mutations**| Files for Graphql CRUD |


## Production
To build and serve the app for production, run the following in your terminal:
```bash
npm run build 
```
Then:
```bash
npm run start
```

## Built With
- [Git](https://git-scm.com/) - Version Control
- [Node.js](https://nodejs.org/) - JS Runtime Environment
- [GraphQL](http://graphql.org/) - API Query Language and Runtime
- [MongoDb](https://www.mongodb.com/download-center#community)
- [Yarn](https://yarnpkg.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [ESLint](https://eslint.org/) - Linting Tool
- [Passport](http://www.passportjs.org/) - Authentication
- [JWT](https://jwt.io/) - Authorization
- [Atom](https://atom.io//) - Code Editor

## Style Guide
- [Airbnb](https://github.com/airbnb/javascript)

## Requests
- [RESTful][]
- [GraphQL][]

## Testing
- Chai
```bash
npm test
```

## Author
* [Johnathan Chen](https://github.com/johnathanachen)


[RESTful]: /Explore-Auth-Api/documentation/graphql/
[GraphQL]: /Explore-Auth-Api/documentation/graphql/
