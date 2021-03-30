import Group from "./model";

function makeQueryObject(query) {
    let result = {};
    let groups = data;

    if (req.query.OwnerName) {
        groups = groups.filter(group => group.OwnerName === req.query.OwnerName)
    }

    if (req.query.CarNumber) {
        groups = groups.filter(group => group.CarNumber.split(' ')[0] === req.query.CarNumber)
    }
    
    res.send(groups)
    return result;
};

const groupControler = {
 
    get: async (req, res) =>{
        try {
            const groups = await Group.find(makeQueryObject(req.query));
            setTimeout( ()=> res.send(groups), 2000);
            console.log("hghg");
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    getById: async (req, res) =>{
        try {
            const group = await Group.findById(req.params.id);
            if (group) 
                res.send(group);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) =>{
        try {
            const newGroup = new Group(req.body);
            const group = await newGroup.save();            
            res.send(group);             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) =>{
        try {
            const group = await Group.findByIdAndDelete(req.params.id);
            if (group) 
                res.send(group);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) =>{
        try {
            const group = await Group.findOneAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            } );
            if (group) 
                res.send(group);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    put: async (req,res)=>{
        try{
            let arr = req.body;
            if (arr && arr.length)
            {
                const groups = await Group.insertMany(arr);
                res.send(groups);
            }
        } catch (e){
            res.status(500).send(e);
        }
    }
}


export default groupControler;