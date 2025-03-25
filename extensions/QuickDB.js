const { QuickDB } = require("quick.db");

class QuickDBExtension extends QuickDB {
    constructor(options) {
        super(options);
    }
    async create(model, data) {
        await this.push(model, data);
        return data;
    }
    async crateMany(model, arrayData) {
        await this.push(model, ...arrayData);
        return arrayData;
    }
    async find(model, query = {}) {
        return ((await this.get(model)) || []).filter((e) => {
            for (const key in query) {
                if (e[key] !== query[key]) return false;
            }
            return true;
        });
    }
    async findOne(model, query) {
        return ((await this.get(model)) || []).filter((e) => {
            for (const key in query) {
                if (e[key] !== query[key]) return false;
            }
            return true;
        })[0];
    }
    async findOneAndUpdate(model, query, data) {
        const oldData = (await this.get(model)) || [];
        var newData = oldData;
        const index = oldData.findIndex((e) => {
            for (const key in query) {
                if (e[key] !== query[key]) return false;
            }
            return true;
        });
        if (index === -1) return null;
        newData[index] = { ...oldData[index], ...data };
        await this.set(model, newData);
        return newData[index];
    }
    async findOneAndDelete(model, query) {
        const oldData = (await this.get(model)) || [];
        const index = oldData.findIndex((e) => {
            for (const key in query) {
                if (e[key] !== query[key]) return false;
            }
            return true;
        });
        if (index === -1) return null;
        const newData = [...oldData];
        newData.splice(index, 1);
        await this.set(model, newData);
        return oldData[index];
    }
    async deleteMany(model, query) {
        const oldData = (await this.get(model)) || [];
        const deleted = oldData.filter((e) => {
            for (const key in query) {
                if (e[key] !== query[key]) return false;
            }
            return true;
        });
        const newData = oldData.filter((e) => {
            for (const key in query) {
                if (e[key] !== query[key]) return true;
            }
            return false;
        });
        await this.set(model, newData);
        return deleted;
    }
}

module.exports = QuickDBExtension;
