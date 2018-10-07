# Create Program


## Example
### Request

    POST https://api.localhost:3000/v1/theaters

#### Request Body
```json
{
    "name" : "5x5",
    "duration" : "12 Weeks",
    "exercises" : ["squat", "bench press", "barbell row", "overhead press", "deadlift"],
    "frequency": "5x5",
    "repetition" : 73,
    "set": 100,
    "weight": 100
}
```

### Response
```json
{
    "status": {
        "text": "OK",
        "status_code": 200
    },
    "result": {
      "_id" : 1,
      "name" : "5x5",
      "exercises" : ["squat", "bench press", "barbell row", "overhead press", "deadlift"],
      "frequency": "5x5",
      "repetition" : 73,
      "set": 100,
      "weight": 100
  }
}
```
