const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    text: {type: String, required: true},
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;