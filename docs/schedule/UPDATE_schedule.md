# UPDATE Edit Schedule

## Request

    POST /api/v1/users/schedules/{schedule name}

### Request Body
```json
{
	 "name": "Shredded",
    "programName": "5x5",
    "userId": "5bbae8977718cc8579986bed",
    "username": "johnny"
}
```

## Response
```json
{
    "result": {
        "name": "Shredded",
        "programName": "5x5",
        "userId": "5bbae8977718cc8579986bed",
        "username": "johnny",
        "logs": []
    },
    "success": "Schedule added"
}
```
