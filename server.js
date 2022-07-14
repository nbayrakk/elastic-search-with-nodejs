const elasticClient = require('./elasticClient');
const elasticIndex = require('./index');
const elasticMap = require('./mapping');
const elasticDocument = require('./document')
const elasticSearch = require('./search')
elasticClient.ping({
    requestTimeout: 1000
}, async function (error) {
    if (error) {
        console.trace('Elasticsearch\'e erişilmiyor!');
    } else {
        console.log('Elasticsearch ayakta :)');

        try {
            //Create Index 
            const resp = await elasticIndex('games');
            console.log('Index: ' + resp)

            //Create GameMap
            /*
                const mapping = {
                    properties: {
                        title: {
                            type: "text"
                        },
                        tags: {
                            type: "keyword"
                        },
                        body: {
                            type: "text"
                        },
                        age: {
                            type: "integer"
                        }
                    }
                }
                const resmap = await elasticMap('games', 'categorystore', mapping);
                var data = [
                    {
                        title: "Mario",
                        tags: ['Retro', 'Ateri'],
                        body: "Mario is old game",
                        age: 20
                    },
                    {
                        title: "Fifa",
                        tags: ['Football', 'Sport'],
                        body: "Football is most popular game all around the world",
                        age: 999
                    },
                    {
                        title: "Basketball",
                        tags: ['Basketboll', 'Sport'],
                        body: "Basketball most populer game in USA",
                        age: 100
                    }
                ]
                for (let i = 0; i < data.length; i++) {
                    const resdocument = await elasticDocument('games', i + 1, 'categorystore', data[i])
    
                }
                */
            const body = {
                query: {
                    match_phrase_prefix: {
                        "body": "game"
                    }
                }
            }
            const resSearch = await elasticSearch('games', 'categorystore', body)
            console.log(resSearch)
            const body2 = {
                query: {
                    match: {
                        "body": "game"
                    },
                },
                aggs: {
                    tags: {
                        terms: {
                            field: "tags"
                        }
                    }
                }
            }
            const resSearch2 = await elasticSearch('games', 'categorystore', body2)
            console.log(resSearch2.aggregations.tags.buckets)
        } catch (e) {
            console.log(e)
        }
    }
});

