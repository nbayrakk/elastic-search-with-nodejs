const esClient = require('./elasticClient')

const addmappingToIndex = async function(indexName,mappingType,mapping ) {
    console.log(mapping,mappingType)
    let type = true
    return await esClient.indices.putMapping({
        index:indexName,
        type:mappingType,
        body:mapping,
        include_type_name:type
    });
}
module.exports = addmappingToIndex;