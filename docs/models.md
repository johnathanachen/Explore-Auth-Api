# Models

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

## Schedule

Field | Data Type | Description
--------- | ----------- | -----------
name | String | name of schedule
programName | String | name of selected program
logs | [Exercise] | a list of completed exercise
userId | ObjectId | user's uuid
username | String | username

## Exercise

Field | Data Type | Description
--------- | ----------- | -----------
date | Date | date created
name | String | name of the exercise
setQuantity | Number | number of sets
repetition | Number | number of repetition
weight | String | total weight used during session

## User

Field | Data Type | Description
--------- | ----------- | -----------
createdAt | Date | date created
username | String | username
password | String | password
first | String | first name
admin | Bool | if user is admin
