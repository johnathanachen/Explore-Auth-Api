# Fitness API

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

## Requests
- [RESTful][]
- [GraphQL][]


## Built With
- [Git](https://git-scm.com/) - Version Control
- [Node.js](https://nodejs.org/) - JS Runtime Environment
- [GraphQL](http://graphql.org/) - API Query Language and Runtime
- [MongoDb](https://www.mongodb.com/download-center#community)
- [Yarn](https://yarnpkg.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [ESLint](https://eslint.org/) - Linting Tool
- [Atom](https://atom.io//) - Code Editor


## Author
* [Johnathan Chen](https://github.com/johnathanachen)


[RESTful]: /Explore-Auth-Api/documentation/graphql/
[GraphQL]: /Explore-Auth-Api/documentation/graphql/
