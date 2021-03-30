import {
    MongoClient,
    ObjectID
} from 'mongodb';

const url = 'mongodb+srv://student:i295Anz59j94lTIE@cluster0.n9t74.gcp.mongodb.net/GroupMongooseDB?retryWrites=true&w=majority'; 

const dbName = 'groupDB'; 

const collectiionName = "groups"; 

function makeQueryObject(query) {
    let result = {};
    console.log(query);
    let groups = data;

    if (req.query.OwnerName) {
        groups = groups.filter(group => group.OwnerName === req.query.OwnerName)
    }

    if (req.query.CarNumber) {
        groups = groups.filter(group => group.CarNumber.split(' ')[0] === req.query.CarNumber)
    }
    
    res.send(groups)
    console.log(result);
    return result;
};


const groupControler = {
    get_async: async (req, res) => { 
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            }); 
            const connection = await client.connect();
            const groups = connection.db(dbName).collection(collectiionName);         
            const result = await groups
                .find(
                    
                    makeQueryObject(req.query)
                )
                .toArray();           
            res.send(result);
            client.close(); 
        } catch (error) { 
            console.log(error);
            res.status(500).send(error);
        }
    },
    get_promise: (req, res) => {    
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        });
        client.connect() 
            .then(connection => {
                const groups = connection.db(dbName).collection(collectiionName); 
                groups.find(makeQueryObject(req.query)).toArray()
                    .then(result => {
                        client.close();
                        res.send(result);
                    })
                    .catch(error => { 
                        throw error;
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
    },
    get_callback: (req, res) => {  
        function logError(error){ 
            console.log(error);
            res.status(500).send(error);
        }   

        const client = new MongoClient(url, {
            useUnifiedTopology: true
        }); 
        client.connect(
            (error, connection) => { 
                if (error) { 
                    logError(error);
                } else {
                    const groups = connection.db(dbName).collection(collectiionName);
                     
                    groups.find(makeQueryObject(req.query),
                        (error, result) => {
                            if (error) {
                                logError(error);
                            } else {
                                result.toArray(
                                    (error, result) => {
                                        if (error) {
                                            logError(error);
                                        } else {
                                            connection.close();
                                            res.send(result);
                                        }
                                    }
                                );
                            }
                        }
                    );

                }
            }
        );
    },
    getById: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const groups = connection.db(dbName).collection(collectiionName);
            const result = await groups.findOne({
                _id: ObjectID(req.params.id)
            }); 
            if (result)
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const groups = connection.db(dbName).collection(collectiionName);
            const result = await groups.insertOne(req.body);
            res.send(result.ops);
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const groups = connection.db(dbName).collection(collectiionName);
            const result = await groups.findOneAndDelete({
                _id: ObjectID(req.params.id)
            }, req.body);
            if (result)
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const groups = connection.db(dbName).collection(collectiionName);
            const result = await groups.findOneAndUpdate({
                    _id: ObjectID(req.params.id)
                },
                {
                    $set: req.body
                }, );
            if (result.value)
                res.send(result.value);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}

export default groupControler;