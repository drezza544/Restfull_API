const UserModel = require('../Model/UserModel');

exports.login = (req, res) => {
    const { username, password } = req.body;

    UserModel.findOne({
        username: username,
        password: password
    }).then(result => {
        if(!result) {
            return res.status(400).json({
                status: false,
                code: 400,
                message: "Login Gagal"
            });
        }
        res.status(200).json({
            status: true,
            code: 200,
            message: "Berhasil Login"
        });
    }).catch(err => {
        console.log(err);
    });
}