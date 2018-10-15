# LOGIN User

## Request

    POST /api/v1/users/login?username={username}&password={password}

## Response
```json
{
    "success": true,
    "message": "Enjoy your API token!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5ueSIsImlkIjoiNWJiYWU4OTc3NzE4Y2M4NTc5OTg2YmVkIiwiYWRtaW4iOnRydWUsImV4cCI6MTU0NDc2MzIyNCwiaWF0IjoxNTM5NTc1NjI0fQ.jenUfm-ewONssw13nF7cYsW97jvTNuIo48RV7m2hRCE"
}
```
