module.exports.getClientRegister = async function getClientRegister(req, res) {
    try {
        let user = req.body;
        if (user) {
            console.log(user);
            res.status(200).json({ message: "client has successfully registered" })
        } else {
            res.status(400).json({ error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.getClientLogin = async function getClientLogin(req, res) {
    try {
        let user = req.body;
        if (user) {
            console.log(user);
            res.status(200).json({ message: "client has successfully registered" })
        } else {
            res.status(400).json({ error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.setClientInformation = async function setClientInformation(req, res) {
    try {
        let id = req.params.id;
        console.log(id)
        let user_info = req.body;
        if (user_info) {
            console.log(user_info)
            res.status(200).json({ success: true })
        } else {
            res.status(400).json({ error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}