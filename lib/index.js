const fs = require("fs");
const mongodb = require("mongodb");

const saved_keys = ["path", "db", "connect", "collection", "render"];

function Collection() {
    this.data = [];

    this.read = (filter_obj) => {
        const filtered = this.data.filter((v) => {
            pass = true;
            for (let x in filter_obj) {
                if (!v[x]) {
                    pass = false;
                    continue;
                }
                if (filter_obj[x] !== v[x]) {
                    pass = false;
                }
            }
            return pass;
        });
        return filtered;
    };

    this.create = (obj, upsert = true) => {
        if (!obj._id) {
            obj._id = new mongodb.ObjectId();
            this.data.push(obj);
        } else {
            const index = this.data.findIndex((v) => v._id === obj._id);
            if (index !== -1 && upsert) {
                this.data[index] = obj;
            } else {
                this.data.push(obj);
            }
        }
    };

    this.update = (filter_obj, obj, upsert = true) => {
        if (obj._id) {
            delete obj._id;
        }
        const record_set = this.read(filter_obj);
        if (!record_set.length && upsert) {
            obj._id = new mongodb.ObjectId();
            this.data.push(obj);
            return true;
        }
        for (let x in record_set) {
            const index = this.data.findIndex(
                (v) => v._id === record_set[x]._id
            );
            new_val = Object.assign(record_set[x], obj);
            console.log(new_val);
            this.data[index] = new_val;
        }
    };

    this.delete = (filter_obj) => {
        const record_set = this.read(filter_obj);
        const index = this.data.findIndex((v) => v._id === record_set[0]._id);
        this.data.splice(index, record_set.length);
    };
}

function Db(path) {
    this.path = `${path}.db.json`;
    this.db = null;

    this.connect = () => {
        if (fs.existsSync(this.path))
            this.db = JSON.parse(fs.readFileSync(this.path, "utf8"));
        else {
            fs.writeFileSync(this.path, JSON.stringify({}));
            this.db = {};
        }
    };

    this.collection = (name) => {
        if (!this[name]) this[name] = new Collection();
        return this[name];
    };

    this.render = () => {
        const filtered_keys = Object.keys(this).filter(
            (k) => !saved_keys.includes(k)
        );
        const data = {};
        for (let x of filtered_keys) {
            data[x] = this[x].data;
        }
        fs.writeFileSync(this.path, JSON.stringify(data));
    };
}
module.exports = Db;
