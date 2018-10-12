<p align="center">
  <img href="https://johnathanachen.github.io/Fitii/" src="https://raw.githubusercontent.com/johnathanachen/Fitii/master/docs/logo.png" width="300" alt="Fitii">
  <br>
  <a href="#"><img src="https://img.shields.io/badge/npm-v1.0.0-42b983.svg" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Travis CI"></a>
</p>

> ***Fitii*** is a custom API on Node using Express and connect to Mongo DB using Mongoose.

- [features](#features)
- [installation](#installation)
- [usage](#usage)
- [contributing](#contributing)
- [license](#license)

## Setup

### Installation

```js
$ npm install
```

### Run

```js
$ nodemon
```

### Test

```js
$ npm test
```

## Resources
### [User](User.md)
- [```GET``` Admin User List]()
- [```POST``` User Login]()
- [```POST``` User Signup]()
- [```DELETE``` Admin Remove User]()

### [Program](Program.md)
- [```GET``` Program List]()
- [```POST``` Admin Create Program]()
- [```POST``` User Create Program]()
- [```PUT``` User Update Program]()
- [```DELETE``` Admin Remove Program]()
- [```DELETE``` User Remove Program]()

### [Schedule](schedule.md)
- [```GET``` User Schedule List]()
- [```POST``` User Create Schedule]()
- [```PUT``` User Update Schedule]()
- [```DELETE``` User Remove Schedule]()

### [Log](log.md)
- [```GET``` User Log List]()
- [```POST``` User Create Log]()
- [```PUT``` User Update Log]()
- [```DELETE``` User Remove Exercise]()

### [Exercise](exercise.md)
- [```GET``` User Exercise List]()
- [```POST``` User Create Exercise]()
- [```PUT``` User Update Exercise]()
- [```DELETE``` User Remove Exercise]()

GET /api/v1/users                     [TESTED]
GET /api/v1/users/current       [DONE][TESTED]
POST /api/v1/users/login        [DONE][TESTED]
POST /api/v1/users/signup       [DONE][TESTED]
PUT /api/v1/users/{id}/edit

GET /api/v1/user/programs            [DONE]
POST /api/v1/user/programs/new       [DONE]
PUT /api/v1/user/programs/:id/edit   [DONE]
DELETE /api/v1/user/programs/:id     [DONE]
GET /api/v1/programs (public programs thats preset)

GET /api/v1/user/schedules             [BUG]
POST /api/v1/user/schedules/new        [DONE][CHECKED]
PUT /api/v1/user/schedules/:id/edit    [DONE][CHECKED]
DELETE /api/v1/user/schedules/:id      [DONE][CHECKED]

GET /api/v1/user/schedules/logs
POST /api/v1/user/schedules/logs/new       [DONE][CHECKED]
PUT /api/v1/user/schedules/logs/:id/edit   [BUG]
DELETE /api/v1/user/schedules/logs/:id

GET /api/v1/user/schedules/logs/exercises
POST /api/v1/user/schedules/logs/exercises/new
PUT /api/v1/user/schedules/logs/exercises/:id/edit
DELETE /api/v1/user/schedules/logs/exercises/:id


## Feedback
Find a bug or have a feature request? Please file an <a href="https://github.com/johnathanachen/FitnessAPI/issues" targe="_blank">issue</a>!

## Contact
Email: [johnathanchenn@outlook.com](mailto:johnathanchenn@outlook.com)
