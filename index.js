const doculite = require('./lib');

const db = new doculite('./ofer');
db.connect();
db.collection('users');
db.users.create({ name: "ofer", age: 35});
db.users.create({ name: "shai", age: 35});
db.users.create({ name: "shahar", age: 38});
db.users.create({ name: "ofer", age: 33});
db.users.create({ name: "amir", age: 30});
db.users.create({ name: "carmel", age: 5});
db.users.create({ name: "dolev", age: 2});
db.users.update({name: "amir"},{name:"sammy", age: 16});
db.users.delete({age: 35});
const r = db.users.read();
console.log(r);
db.render();