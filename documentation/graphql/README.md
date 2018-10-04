# GraphQL CRUD
CRUD API built with GraphQL, Node and Mongo for database

## Feature List
* View 
* Create 
* Update 
* Delete 
* Seed Database

## Getting Started
Open up a browser and visit
```bash
https://domain.com/graphiql
```

Send any of the following requests via the GraphiQL window:

## Example
### Query to CREATE New Listing
```bash
  mutation AddNewCo {
    addCompany (name: "HP"){
      name
    }
  }
```

## Response
```bash
  {
    "data": {
      "addCompany": {
        "name": "HP"
      }
    }
  }
```
