# Create Program


## Example
### Request

    POST /api/v1/programs/new

#### Request Body
```json
{
    "name" : "5x5",
    "duration" : "12 Weeks",
    "exercises" : ["squat", "bench press", "barbell row", "overhead press", "deadlift"],
    "frequency": "5x5",
    "repetition" : 73,
    "setQuantity": 100
}
```

### Response
```json
{
    "success": {
      "name" : "5x5",
      "duration" : "12 Weeks",
      "exercises" : ["squat", "bench press", "barbell row", "overhead press", "deadlift"],
      "frequency": "5x5",
      "repetition" : 73,
      "setQuantity": 100
  }
}
```
