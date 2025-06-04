const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birthday: { type: Date, required: false },
    marital_status: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);
