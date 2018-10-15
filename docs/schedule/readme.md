## Schedule

Field | Data Type | Description
--------- | ----------- | -----------
name | String | name of schedule
programName | String | name of selected program
logs | [Exercise] | a list of completed exercise
userId | ObjectId | user's uuid
username | String | username

## Routes
- [```GET``` Schedule List](schedule/GET_list.md)
- [```POST``` Create Schedule](schedule/CREATE_schedule.md)
- [```PUT``` Update Schedule](schedule/UPDATE_schedule.md)
- [```DELETE``` Remove Schedule](schedule/REMOVE_schedule.md)
- [```GET``` Log List](schedule/GET_logs_list.md)
- [```PUT``` Add Exercise](schedule/CREATE_logs_exercise.md)
- [```PUT``` Remove Exercise](schedule/REMOVE_logs_exercise.md)
