import * as mongoose from 'mongoose'

const { ObjectId } = mongoose.Types;
const { Schema } = mongoose;


export const FileSchema = new Schema({
    _id: ObjectId,
    filename: String,
    chunkSize: Number,
    length: Number,
    uploadDate: Date,
    contentType: String,
    metadata: {
        originalName: String,
        encoding: String,
        mimetype: String,
        md5: String,

        owner: String,
        ownersGroup: [String],
        privacyStatus: Number,
        shareLink: String,
    }
})
