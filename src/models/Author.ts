import mongoose, { Schema } from "mongoose";

interface AuthorType extends Document{
    name:string,
    email:string,
    password:string,
    sessionToken?:string
}

const authorSchema:Schema<AuthorType> = new Schema({
    name: {type: String, required:true, unique: true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    sessionToken: {type: String}
}, {timestamps: true});

export default mongoose.models.Author || mongoose.model<AuthorType>("Author", authorSchema);