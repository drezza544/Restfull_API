const UserModel = require('../Model/UserModel');

exports.store = async (req, res) => {
    const { nama, email, username, password, confirm_password, alamat, phone, tgl_lahir} = req.body;
    const checkEmail = await UserModel.find({ email: email });
    const checkPhone = await UserModel.find({ phone: phone });
    const generated_Id = Math.floor((Math.random() * 99999) + 0);

    if(!nama || !email || !username || !password || !confirm_password || !alamat || !phone || !tgl_lahir) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Invalid Request"
        });
    }

    if(checkEmail > 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Email Telah Terdaftar"
        });
    }else if(checkPhone > 0) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Phone Telah Terdaftar"
        });
    }else if (password != confirm_password) {
        return res.status(400).json({
            status: false,
            code: 400,
            message: "Password Tidak Sama"
        });
    }else {
        const createUser = await UserModel.create([
            {
                user_id: generated_Id,
                nama: nama,
                email: email,
                username: username,
                password: password,
                profile: [
                    {
                        alamat: alamat,
                        phone: phone,
                        tgl_lahir: tgl_lahir,
                    }
                ]
            }
    ]);
        if(createUser) {
            return res.status(200).json({
                status: true,
                code: 200,
                message: "Berhasil Register",
                data: createUser,
            });
        }

        res.status(400).json({
            status: false,
            code: 400,
            message: "Gagal Register",
        });
    }
}