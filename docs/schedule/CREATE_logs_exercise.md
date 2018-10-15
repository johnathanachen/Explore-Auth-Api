# PUT Log new exercise to schedule

## Request

    PUT /api/v1/users/schedules/{schedule name}/logs/edit

### Request Body
```json
{
	"name": "bench",
	"setQuantity": 5,
	"repetition": 5,
	"weight": 130
}
```

## Response
```json
{
    "result": {
        "_id": "5bc3f7f243d57f1977473fc3",
        "name": "Strength",
        "programName": "5x5",
        "userId": "5bbae8977718cc8579986bed",
        "username": "johnny",
        "logs": [
            {
                "weight": "130",
                "repetition": 5,
                "setQuantity": 5,
                "name": "bench",
                "_id": "5bc3f89d92378419bb05d76a",
                "date": "2018-10-15T02:17:01.079Z"
            },
            {
                "weight": "130",
                "repetition": 5,
                "setQuantity": 5,
                "name": "squat",
                "_id": "5bc406cc7cb7f31dbffd1c9e",
                "date": "2018-10-15T03:17:32.000Z"
            }
        ]
    },
    "success": "Log updated"
}
```
