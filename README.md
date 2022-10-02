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
