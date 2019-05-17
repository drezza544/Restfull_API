const mongoose = require('mongoose');
const BukuModel = new mongoose.Schema({
    buku_id: Number,
    judul: String,
    sinopsis: String,
    tahun_terbit: Date,
    url: String
});

module.exports = mongoose.model('buku', BukuModel, 'buku');
