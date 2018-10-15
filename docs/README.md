<p align="center">
  <img href="https://johnathanachen.github.io/Fitii/" src="https://raw.githubusercontent.com/johnathanachen/Fitii/master/docs/logo.png" width="300" alt="Fitii">
  <br>
  <a href="#"><img src="https://img.shields.io/badge/npm-v1.0.0-42b983.svg" alt="Version"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Travis CI"></a>
</p>

> ***Fitii*** is a fitness API that lets users select workout programs, track their progress. This project is built with Node using Express and persist to Mongo DB using Mongoose.

- [Setup](#Setup)
- [Usage](#Routes)
- [Feedback](#Feedback)
- [Contact](#Contact)

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

## Routes

### [User](user/readme.md)
- [```POST``` Login](user/POST_login.md)
- [```POST``` Signup](user/POST_signup.md)

### [Program](program/readme.md)
- [```GET``` Program List](program/GET_list.md)
- [```POST``` Create Program](program/POST_create.md)
- [```PUT``` Update Program](program/UPDATE_program.md)
- [```DELETE``` Remove Program](program/REMOVE_program.md)

### [Schedule](schedule/readme.md)
- [```GET``` Schedule List](schedule/GET_list.md)
- [```POST``` Create Schedule](schedule/CREATE_schedule.md)
- [```PUT``` Update Schedule](schedule/UPDATE_schedule.md)
- [```DELETE``` Remove Schedule](schedule/REMOVE_schedule.md)
- [```GET``` Log List](schedule/GET_logs_list.md)
- [```PUT``` Add Exercise](schedule/CREATE_logs_exercise.md)
- [```PUT``` Remove Exercise](schedule/REMOVE_logs_exercise.md)

### [Admin](README.md)
- [```GET``` Setup](admin/GET_setup.md)
- [```GET``` User List](admin/GET_user_list.md)
- [```POST``` Login](admin/POST_login.md)
- [```DELETE``` Remove User](admin/REMOVE_user.md)

## Feedback
Find a bug or have a feature request? Please file an <a href="https://github.com/johnathanachen/FitnessAPI/issues" targe="_blank">issue</a>!

## Contact
Email: [johnathanchenn@outlook.com](mailto:johnathanchenn@outlook.com)
