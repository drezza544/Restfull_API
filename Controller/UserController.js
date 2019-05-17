const UserModel = require('../Model/UserModel');

exports.show = async (req, res) => {
    const getAllData = await UserModel.find();
    res.status(200).json({
        status: true,
        code: 200,
        data: getAllData,
    });
}

exports.getById = async (req, res) => {
    try {
        const { user_id } = req.params
        const getById = await UserModel.find({user_id: user_id});
        res.status(200).json({
            status: true,
            code: 200,
            data: getById,
        });
    }catch(err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    const { user_id } = req.params;
    const { nama, email, username, password, alamat, phone, tgl_lahir } = req.body;
    const checkIdUser = await UserModel.find({ user_id: user_id });

    if(checkIdUser.length > 0) {
        const update = await UserModel.updateOne({ user_id: user_id}, { nama: nama, email: email, username: username, password: password, alamat: alamat, phone: phone, tgl_lahir: tgl_lahir});
        if(update) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Data Berhasil Diubah",
                data: {
                    user_id,
                }
            });
        }
        res.status(400).json({
            status: false,
            code: 400,
            message: "Gagal Ubah Data"
        });
    }else {
        res.status(400).json({
            status: false,
            code: 400,
            message: 'User Id ' + user_id + ' Tidak Di Temukan'
        });
    }
}

exports.delete = async (req, res) => {
    const { user_id } = req.params;
    if(user_id) {
        const checkIdUser = await UserModel.find({ user_id: user_id});
        if(checkIdUser.length > 0) {
            const deleteUser = await UserModel.remove({ user_id: user_id });
            if(deleteUser) {
                return res.status(200).json({
                    status: true,
                    code: 200,
                    message: "Berhasil Hapus Data",
                });
            }

            res.status(400).json({
                status: false,
                code: 400,
                message: "Gagal Hapus Data",
            });
        }else {
            res.status(400).json({
                status: false,
                code: 400,
                message: "Id User " + user_id + " Tidak Ditemukan",
            });
        }
    }else {
        res.status(400).json({
            status: false,
            code: 400,
            message: "Can't be null"
        });
    }
}