const mongoose = require('mongoose');
const UserModel = new mongoose.Schema({
    user_id: Number,
    nama: String,
    email: String,
    username: String,
    password: String,
    profile: [
        {
            alamat: String,
            phone: {type: String, max: 6},
            tgl_lahir: Date,
        }
    ]
});

module.exports = mongoose.model('user', UserModel, 'user');