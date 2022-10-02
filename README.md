# documicro
A local document db. It is to NoSQL what SQLite is to SQL.

> :disclamer: **There is no npm package yet**

## install
`npm i --save documicro`

## usage
index.js:
```
const documicro = require('documicro');

const db = new doculite('./ofer');
db.connect();
db.collection('users');
db.users.create({ name: "ofer", age: 35});
db.users.create({ name: "ofer", age: 33});
db.users.create({ name: "shai", age: 35});
db.render();
```

## functions
### constructor
*arguments* path: string;
Specifies the path to the file. Files extention is `*.db.json`

### connect
Loads the data from the specified file. Creates a file if it doesn't exists.

### collection 
*arguments* name: string;
Creates a collection by the given name.
Adds the new collection as a property of the db instance.

### render
Collects all collections and writes all data to the specified file.

### Collection / create
*arguments* obj: object; upsert: boolean (deafault true);
Pushes a new object to the collection. If the object does not contain an `_id` field, adds an ObjectId to it.
If `_id` exists and `upsert` is left as `true`, updates the exisitng objects.

### Collection / read
*arguments* filter_obj: object;
Returns a filtered record_set by the filter's key-value pairs.

### Collection / update
*arguments* filter_obj: object;
Finds the filtered records, removes them from the collection.

### Collection / delete
*arguments* filter_obj: object;
Returns a filtered record_set by the filter's key-value pairs.
