# GET User list

## Request

    GET /admin/users

## Response
```json
{
    "result": [
        {
            "_id": "5bbae8977718cc8579986bed",
            "username": "johnny",
            "password": "password",
            "admin": true,
            "__v": 0
        },
        {
            "_id": "5bc40fa215330b2772fc0bd3",
            "username": "new awesome user",
            "password": "new awesome user",
            "admin": false,
            "__v": 0
        },
        {
            "_id": "5bc4115f21a44e281ee88395",
            "username": "admin",
            "password": "password",
            "admin": true,
            "__v": 0
        }
    ],
    "success": "Users fetched"
}
```
