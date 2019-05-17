const BukuModel = require('../Model/BukuModel')

exports.store = async (req, res) => {
    const { judul, sinopsis, penerbit, tahun_terbit, url } = req.body;
    const generated_id = Math.floor((Math.random() * 99999) + 0);

    if(!judul || !sinopsis || !penerbit || !tahun_terbit || !url) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Invalid Request"
        });
    }

    const createBuku = await BukuModel.create({
        buku_id: generated_id,
        judul: judul,
        sinopsis: sinopsis,
        penerbit: penerbit,
        tahun_terbit: tahun_terbit,
        url: url
    });

    if(!createBuku) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Gagal Membuat Buku"
        });
    }
    res.status(200).json({
        status: true,
        code: 200,
        message: "Berhasil Membuat Buku Baru",
        data: {
            createBuku
        }
    });
}

exports.show = async (req, res) => {
    const getAllDataBuku = await BukuModel.find();
    res.status(200).json({
        status: true,
        code: 200,
        data: {
            getAllDataBuku,
        }
    });
}

exports.getById = async (req, res) => {
    try {
        const { buku_id } = req.params;
        const getBukuById = await BukuModel.find({ buku_id: buku_id });
        return res.status(200).json({
            status: true,
            code: 200,
            data: {
                getBukuById,
            }
        });
    
    }catch(err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    const { buku_id } = req.params;
    const { judul, sinopsis, penerbit, tahun_terbit, url } = req.body;
    const checkIdBuku = await BukuModel.find({ buku_id: buku_id });

    if(checkIdBuku.length > 0) {
        const updateBuku = await BukuModel.updateOne({ buku_id: buku_id }, { judul: judul, sinopsis: sinopsis, penerbit: penerbit, tahun_terbit: tahun_terbit, url: url});
        if(updateBuku) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Data Berhasil Diubah",
                data: {
                    buku_id,
                }
            });
        }
        res.status(400).json({
            status: false,
            code: 400,
            message: "Data Gagal Diubah"
        });
    }else {
        res.status(400).json({
            status: false,
            code: 400,
            message: 'Buku Id ' + buku_id + ' Tidak Dapat Ditemukan'
        });
    }
}

exports.delete = async (req, res) => {
    const { buku_id } = req.params;

        const checkIdBuku = await BukuModel.find({ buku_id: buku_id });
        if(checkIdBuku.length > 0) {
            const deleteBuku = await BukuModel.remove({ buku_id: buku_id });
            if(deleteBuku) {
                return res.status(200).json({
                    status: true,
                    code: 200,
                    message: "Berhasil Hapus Data",
                    data: {
                        buku_id,
                    }
                });
            }
            res.status(400).json({
                status: false,
                code: 400,
                message: "Gagal Hapus Data"
            });
        }else {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Buku ID " + buku_id + " Tidak Dapat Ditemukan",
            });
        }
}