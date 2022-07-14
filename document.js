const esClient = require('./elasticClient')

const insertDoc = async function(indexName,_id,mappintType,data) {
    console.log('Document')
    return await esClient.index({
        index:indexName,
        type:mappintType,
        id:_id,
        body:data
    });
}
module.exports = insertDoc; 