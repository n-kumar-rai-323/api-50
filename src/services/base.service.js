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

    getAllRowsByFilter = async(filter, query={})=>{
        try{
            const limit = +query.pageSize || 10
            const page = +query.page || 1
            const skip = (page-1)* limit
            const allDataList = await this.#modelClass.find(filter).skip(skip).limit(limit)
            const count = await this.#modelClass.countDocuments(filter);
            return {
                data: allDataList,
                pagination:{
                    total: count,
                    page:page,
                    pageSize:limit
                }
            }
        }catch(exception){
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