# Models

<p align="center">
  <img src="https://raw.githubusercontent.com/johnathanachen/Fitii/master/docs/assets/images/models.png" width="300">
</p>

## Log

Field | Data Type | Description
--------- | ----------- | -----------
date | Date | date of creation
exercises | [Exercise] | list of exercises completed for session


## Exercise

Field | Data Type | Description
--------- | ----------- | -----------
name | String | name of the exercise completed
setQuantity | Number | number of sets completed
repetition | Number | number of repetition completed
weight | String | total weight used during session

## Schedule

Field | Data Type | Description
--------- | ----------- | -----------
programId | String | uid of selected program
programName | String | name of selected program
logs | [Log] | a list of completed log entries


## Program

Field | Data Type | Description
--------- | ----------- | -----------
name | String | name of exercise
duration | String | number of sets
exercises | String | number of repetition
frequency | String | total weight
repetition | Number | total weight
setQuantity | Number | total weight
userId | String | total weight
