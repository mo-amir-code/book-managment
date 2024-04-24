import mongoose, { Schema } from "mongoose";

interface BookType extends Document{
    author:Schema.Types.ObjectId,
    title:string,
    publicationYear: number
}

const bookSchema: Schema<BookType> = new Schema({
    author: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
    title: { type: String, required: true },
    publicationYear: { type: Number, required: true }
}, {timestamps: true});

export default mongoose.models.Book || mongoose.model<BookType>("Book", bookSchema)