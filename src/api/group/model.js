import {Schema, model } from 'mongoose';

const groupSchema = new Schema({
    OwnerName: String,
       CarBrand: String,
       CarNumber: String,
       CarColor: String,
       Cover: String,
 
});

const Groups = model("Groups", groupSchema);

export default Groups;
