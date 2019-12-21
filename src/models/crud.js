const DB_NAME = process.env.DB_NAME;

exports.readDetail = async (collection, condition, options = {}) => {
    const db = client.db(DB_NAME);
    
    try {
        let result = db.collection(collection).findOne(condition, {...options});

        return result;
    } catch (error) {
        logger.error('Could not read document!');
        logger.error(error);

        return null;
    }
};

exports.read = async (collection, page = 1, limit = 20, sortBy = 'createdAt', orderBy = -1, filter, options = {})=>{
    const db = client.db(DB_NAME);

    try {
        let query = db.collection(collection).find(filter, {...options});
        let total = await query.count();
        let data = await query.skip((page-1)*limit).limit(limit).sort({[sortBy]: orderBy}).toArray();
        return {
            total,
            page,
            limit,
            data
        };
    } catch (error) {
        logger.error('Could not read documents!');
        logger.error(error);

        return null;
    }
};

exports.readOnly = async (collection, filter) => {
    const db = client.db(DB_NAME);

    try {
        const query = db.collection(collection).find(filter);

        const result = await query.toArray();
        return result;
    } catch (error) {
        logger.error('Could not read documents!');
        logger.error(error);

        return null;
    }
};

exports.aggregate = async (collection, page = 1, limit = 20, sortBy = 'createdAt', orderBy = 1, aggParams = {})=>{
    const db = client.db(DB_NAME);

    const { lookupClause, filter } = aggParams;

    try {
        let query = db.collection(collection).aggregate([{$lookup: lookupClause}, {$match: filter}]);

        let count = await db.collection(collection).aggregate([lookupClause, filter, {$count: 'total'}]).next();
        let data = await query.sort({[sortBy]: orderBy}).skip((page-1)*limit).limit(limit).toArray();
        let result = {
            total:count ? count.total : 0,
            page,
            limit,
            data
        };

        return result;
    } catch (error) {
        logger.error('Could not read documents!');
        logger.error(error);

        return null;
    }
};

exports.create = async (collection, data)=>{
    const db = client.db(DB_NAME);

    try {
        let result = await db.collection(collection).insertOne(data);

        return result.ops[0];
    } catch (error) {
        logger.error('Could not create new document!');
        logger.error(error);

        return null;
    }
};

exports.update = async (collection, condition, data, options = {}) => {
    const db = client.db(DB_NAME);

    try {
        const result = await db.collection(collection)
            .findOneAndUpdate(condition, data, {
                upsert: false, 
                returnOriginal: false,
                ...options
            });

        return result.value;
    } catch (error) {
        logger.error('Could not update document!');
        logger.error(error);

        return null;
    }
};

exports.updateMany = async (collection, condition, data, options = {}) => {
    const db = client.db(DB_NAME);

    try {
        const result = await db.collection(collection)
            .updateMany(condition, data, {
                upsert: false, 
                returnOriginal: false,
                ...options
            });

        return result.value;
    } catch (error) {
        logger.error('Could not update document!');
        logger.error(error);

        return null;
    }
};

exports.upsert = async (collection, condition, data) => {
    const db = client.db(DB_NAME);

    try {
        const result = await db.collection(collection).findOneAndUpdate(condition, data,{upsert: true, returnOriginal: false});

        return result.value;
    } catch (error) {
        logger.error('Could not upsert document!');
        logger.error(error);

        return null;
    }
};

exports.deleteMany = async (collection, condition) => {
    const db = client.db(DB_NAME);

    try {
        const result = await db.collection(collection).deleteMany(condition);

        return result;
    } catch (error) {
        logger.error('Could not delete document!');
        logger.error(error);

        return null;
    }
};

exports.findAndDelete = async (collection, condition) => {
    const db = client.db(DB_NAME);

    try {
        const result = await db.collection(collection).findOneAndDelete(condition);
        
        return result;
    } catch (error) {
        logger.error('Could not delete document!');
        logger.error(error);

        return null;
    }
};