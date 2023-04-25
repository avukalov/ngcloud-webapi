import * as mongoose from 'mongoose'

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;


export const ChunkSchema = new Schema({
    _id: ObjectId,
    files_id: ObjectId,
    n: Number,
    data: Buffer,
})

export const Chunk = mongoose.model('Chunk', ChunkSchema, 'fs.chunks' )