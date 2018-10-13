# Update Program

    PUT /api/v1/users/programs/{program name}/edit

## Request Body
```json
{
     "name": "1x1"
}
```

## Response
``` json
{
    "result": {
        "_id": "5bc17a8d0962fb2be58ab07a",
        "name": "1x1",
        "duration": "12 weeks",
        "frequency": "ever other day",
        "repetition": 5,
        "setQuantity": 5,
        "userId": "5bbae8977718cc8579986bed",
        "exercises": [
            "squat",
            "bench",
            "deadlifts",
            "overhead press",
            "row"
        ]
    },
    "success": "Program updated"
}
```
