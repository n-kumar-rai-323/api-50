class BaseService {
    #modelClass;
    constructor(_modelClass) {
        this.#modelClass = _modelClass
    }
    dataStore = async (data) => {
        try {
            const obj = new this.#modelClass(data);
            return await obj.save();
        } catch (exception) {

            throw exception;
        }
    }
    getSingleRowByfilter = async (filter) => {
        try {
            return await this.#modelClass.findOne(filter);
        } catch (exception) {
            throw exception;
        }
    }
    updateOneByFilter = async (filter, data) => {
        try {
            return await this.#modelClass.findOneAndUpdate(filter, { $set: data }, { new: true });
        } catch (exception) {
            throw exception;
        }
    }

}

module.exports = BaseService;