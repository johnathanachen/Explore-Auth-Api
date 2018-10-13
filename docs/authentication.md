# Authentication

## Login

### Request

    POST /api/v1/users/login?username={username}&password={password}

### Response

``` json
{
    "success": true,
    "message": "Enjoy your API token!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5ueSIsImlkIjoiNWJiYWU4OTc3NzE4Y2M4NTc5OTg2YmVkIiwiYWRtaW4iOnRydWUsImV4cCI6MTU0NDU5MTY2MywiaWF0IjoxNTM5NDA0MDYzfQ.94ysp_2Pf1f7_6J_sSFeGrgTbumWsWNAN9VBfq9C2s-"
}
```
