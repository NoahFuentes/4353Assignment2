const fuelModel = require('../Data Base/fuelModel')
const userInfoModel = require('../Data Base/userInfoModel')

module.exports.fuelRateCalculator = async function fuelRateCalculator(req, res) {
    try {
        let fuelRate = 0, baseRate = 4, companyProfit = 15, success = false;
        let specificStates = ['FL', 'TX', 'CA']
        let data = req.body
        let id = req.header('token');
        if (data) {
            const DB_user = await userInfoModel.findOne({ user_id: id })
            if (DB_user) {
                let flag = false;
                for (const index in specificStates) {
                    if (specificStates[index] === DB_user.state) {
                        flag = true
                    }
                }
                fuelRate += baseRate;
                if (flag) {
                    fuelRate += 0.02;   //location factor
                } else {
                    fuelRate += 0.04;   //location factor
                }
                const previousRecord = await fuelModel.find({ user_id: DB_user.id })
                if (previousRecord) {
                    fuelRate += 0.01    //history factor
                }
                let gallons = data.gallons;
                gallons *= 1;
                if (gallons < 1000) {   //gallons factor
                    fuelRate += 0.03;
                } else if (gallons >= 1000 && gallons <= 2000) {
                    fuelRate += 0.02
                } else {
                    fuelRate += 0.01
                }
                if (companyProfit <= 10) {  //profit factor
                    fuelRate += 0.03
                } else if (companyProfit > 10 && companyProfit <= 20) {
                    fuelRate += 0.02
                } else {
                    fuelRate += 0.01
                }
                success = !success;
                fuelRate = Math.round(fuelRate * 100) / 100;
                let dataToBeStored = { user_id: id };
                for (const key in data) {
                    dataToBeStored[key] = data[key]
                }
                let DB_data = await fuelModel.create(dataToBeStored)
                if (DB_data) {
                    res.status(200).json({ success: success, fuel_rate: fuelRate })
                } else {
                    res.status(400).json({ error: "something went wrong" })
                }
            } else {
                res.status(400).json({ success: success, error: "please register/login first" })
            }
        } else {
            res.status(400).json({ error: "something went wrong" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.viewPurchaseHistory = async function viewPurchaseHistory(req, res) {
    try {
        let id = req.header('token'), success = false;
        if (id) {
            let history = await fuelModel.find({ user_id: id })
            if (history.length) {
                success = !success
                res.status(200).json({ success: success, data: history, message: "you have purchased fuel." })
            } else {
                res.status(404).json({ success: success, message: "you have'nt purchased any fuel so far." })
            }
        } else {
            res.status(404).json({ success: success, message: "please login/register first" })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}