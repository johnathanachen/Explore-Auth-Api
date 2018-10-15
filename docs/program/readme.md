## Program

Field | Data Type | Description
--------- | ----------- | -----------
name | String | name of program
duration | String | length of program
frequency | String | how many times per week
repetition | Number | number of workout repetitions
setQuantity | Number | number of workout sets
userId | ObjectId | user uuid
exercises | [String] | exercises in program

## Routes
- [```GET``` Program List](program/GET_list.md)
- [```POST``` Create Program](program/POST_create.md)
- [```PUT``` Update Program](program/UPDATE_program.md)
- [```DELETE``` Remove Program](program/REMOVE_program.md)
